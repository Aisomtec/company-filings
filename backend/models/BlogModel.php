<?php
namespace Models;

use Database\Connection;
use PDO;

class BlogModel {
    private $db;

    public function __construct() {
        $this->db = Connection::getInstance()->getConnection();
    }

    /**
     * Retrieve all blogs with joined category and featured image information.
     */
    public function getAll() {
        $sql = "SELECT b.*, 
                       c.name AS category_name, 
                       c.slug AS category_slug,
                       u.name AS author_name,
                       img.url AS featured_image_url,
                       (SELECT COALESCE(
                           (SELECT i.url FROM images i WHERE i.id = cb.image_id),
                           JSON_UNQUOTE(JSON_EXTRACT(cb.block_data, '$.src'))
                        ) 
                        FROM blog_content_blocks cb 
                        WHERE cb.blog_id = b.id AND cb.block_type = 'image' 
                        ORDER BY cb.sort_order ASC 
                        LIMIT 1) AS fallback_image_url
                FROM blogs b
                LEFT JOIN categories c ON b.category_id = c.id
                LEFT JOIN admin_users u ON b.author_id = u.id
                LEFT JOIN images img ON b.featured_image_id = img.id
                ORDER BY b.publish_date DESC, b.id DESC";
        
        $rows = $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        
        $result = [];
        foreach ($rows as $row) {
            $result[] = $this->mapBlogRow($row);
        }
        return $result;
    }

    /**
     * Retrieve a specific blog by ID.
     */
    public function getById($id) {
        $sql = "SELECT b.*, 
                       c.name AS category_name, 
                       c.slug AS category_slug,
                       u.name AS author_name,
                       img.url AS featured_image_url,
                       (SELECT COALESCE(
                           (SELECT i.url FROM images i WHERE i.id = cb.image_id),
                           JSON_UNQUOTE(JSON_EXTRACT(cb.block_data, '$.src'))
                        ) 
                        FROM blog_content_blocks cb 
                        WHERE cb.blog_id = b.id AND cb.block_type = 'image' 
                        ORDER BY cb.sort_order ASC 
                        LIMIT 1) AS fallback_image_url
                FROM blogs b
                LEFT JOIN categories c ON b.category_id = c.id
                LEFT JOIN admin_users u ON b.author_id = u.id
                LEFT JOIN images img ON b.featured_image_id = img.id
                WHERE b.id = :id";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$row) return null;
        
        $blog = $this->mapBlogRow($row);
        $blog['content'] = $this->getBlocksForBlog($id);
        return $blog;
    }

    /**
     * Retrieve a specific blog by Slug.
     */
    public function getBySlug($slug) {
        $sql = "SELECT b.*, 
                       c.name AS category_name, 
                       c.slug AS category_slug,
                       u.name AS author_name,
                       img.url AS featured_image_url,
                       (SELECT COALESCE(
                           (SELECT i.url FROM images i WHERE i.id = cb.image_id),
                           JSON_UNQUOTE(JSON_EXTRACT(cb.block_data, '$.src'))
                        ) 
                        FROM blog_content_blocks cb 
                        WHERE cb.blog_id = b.id AND cb.block_type = 'image' 
                        ORDER BY cb.sort_order ASC 
                        LIMIT 1) AS fallback_image_url
                FROM blogs b
                LEFT JOIN categories c ON b.category_id = c.id
                LEFT JOIN admin_users u ON b.author_id = u.id
                LEFT JOIN images img ON b.featured_image_id = img.id
                WHERE b.slug = :slug";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':slug' => $slug]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$row) return null;
        
        $blog = $this->mapBlogRow($row);
        $blog['content'] = $this->getBlocksForBlog($row['id']);
        return $blog;
    }

    /**
     * Helper to load blocks for a blog.
     */
    private function getBlocksForBlog($blogId) {
        $sql = "SELECT cb.*, img.url AS image_url, img.caption AS image_caption
                FROM blog_content_blocks cb
                LEFT JOIN images img ON cb.image_id = img.id
                WHERE cb.blog_id = :blog_id
                ORDER BY cb.sort_order ASC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':blog_id' => $blogId]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $blocks = [];
        foreach ($rows as $row) {
            $block = [
                'type' => $row['block_type']
            ];
            
            // Map text content
            if ($row['text_content'] !== null) {
                $block['text'] = $row['text_content'];
            }
            
            // Map image content
            if ($row['block_type'] === 'image') {
                $block['image_id'] = $row['image_id'] ? (int)$row['image_id'] : null;
                $block['src'] = $row['image_url'] ?? '';
                $block['caption'] = $row['image_caption'] ?? '';
            }
            
            // Map structured JSON data (lists, tables)
            if ($row['block_data'] !== null) {
                $data = json_decode($row['block_data'], true);
                if (is_array($data)) {
                    foreach ($data as $key => $val) {
                        $block[$key] = $val;
                    }
                }
            }
            
            $blocks[] = $block;
        }
        
        return $blocks;
    }

    /**
     * Map database columns to match front-end JS naming convention.
     */
    private function mapBlogRow($row) {
        return [
            'id' => (int)$row['id'],
            'slug' => $row['slug'],
            'title' => $row['title'],
            'category_id' => (int)$row['category_id'],
            'category' => $row['category_name'] ?? 'Uncategorized',
            'category_slug' => $row['category_slug'] ?? 'uncategorized',
            'excerpt' => $row['excerpt'],
            'author_id' => $row['author_id'] ? (int)$row['author_id'] : null,
            'author' => $row['guest_author_name'] ?: ($row['author_name'] ?: 'Guest Author'),
            'guest_author_name' => $row['guest_author_name'],
            'readingTime' => $row['reading_time'],
            'publishDate' => date('M d, Y', strtotime($row['publish_date'])),
            'publishDateRaw' => $row['publish_date'],
            'seoTitle' => $row['seo_title'] ?: $row['title'],
            'seoDescription' => $row['seo_description'] ?: $row['excerpt'],
            'featuredImageId' => $row['featured_image_id'] ? (int)$row['featured_image_id'] : null,
            'featuredImage' => $row['featured_image_url'] ?: ($row['fallback_image_url'] ?? 'image.jpg'),
            'status' => $row['status']
        ];
    }

    /**
     * Create a new blog post.
     */
    public function create($data) {
        $this->db->beginTransaction();
        try {
            // Generate slug if not provided
            $slug = !empty($data['slug']) ? $data['slug'] : $this->slugify($data['title']);
            
            // Check for uniqueness of slug
            $slug = $this->makeUniqueSlug($slug);

            // Automatically set featured_image_id to the first image block that has a database image_id
            $featuredImageId = null;
            if (!empty($data['content']) && is_array($data['content'])) {
                foreach ($data['content'] as $block) {
                    if (($block['type'] ?? '') === 'image' && !empty($block['image_id'])) {
                        $featuredImageId = $block['image_id'];
                        break;
                    }
                }
            }

            $sql = "INSERT INTO blogs (slug, title, category_id, excerpt, author_id, guest_author_name, reading_time, publish_date, seo_title, seo_description, featured_image_id, status)
                    VALUES (:slug, :title, :category_id, :excerpt, :author_id, :guest_author_name, :reading_time, :publish_date, :seo_title, :seo_description, :featured_image_id, :status)";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':slug' => $slug,
                ':title' => $data['title'],
                ':category_id' => $data['category_id'],
                ':excerpt' => $data['excerpt'] ?? '',
                ':author_id' => !empty($data['author_id']) ? $data['author_id'] : null,
                ':guest_author_name' => !empty($data['guest_author_name']) ? $data['guest_author_name'] : null,
                ':reading_time' => $data['readingTime'] ?? '5 min read',
                ':publish_date' => $data['publishDateRaw'] ?? date('Y-m-d'),
                ':seo_title' => $data['seoTitle'] ?? null,
                ':seo_description' => $data['seoDescription'] ?? null,
                ':featured_image_id' => $featuredImageId,
                ':status' => $data['status'] ?? 'draft'
            ]);
            
            $blogId = $this->db->lastInsertId();

            // Insert Content Blocks
            if (!empty($data['content']) && is_array($data['content'])) {
                $this->insertContentBlocks($blogId, $data['content']);
            }

            $this->db->commit();
            return $blogId;
        } catch (\Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }

    /**
     * Update an existing blog post.
     */
    public function update($id, $data) {
        $this->db->beginTransaction();
        try {
            $slug = !empty($data['slug']) ? $data['slug'] : $this->slugify($data['title']);
            $slug = $this->makeUniqueSlug($slug, $id);

            // Automatically set featured_image_id to the first image block that has a database image_id
            $featuredImageId = null;
            if (!empty($data['content']) && is_array($data['content'])) {
                foreach ($data['content'] as $block) {
                    if (($block['type'] ?? '') === 'image' && !empty($block['image_id'])) {
                        $featuredImageId = $block['image_id'];
                        break;
                    }
                }
            }

            $sql = "UPDATE blogs SET 
                        slug = :slug,
                        title = :title,
                        category_id = :category_id,
                        excerpt = :excerpt,
                        author_id = :author_id,
                        guest_author_name = :guest_author_name,
                        reading_time = :reading_time,
                        publish_date = :publish_date,
                        seo_title = :seo_title,
                        seo_description = :seo_description,
                        featured_image_id = :featured_image_id,
                        status = :status
                    WHERE id = :id";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':id' => $id,
                ':slug' => $slug,
                ':title' => $data['title'],
                ':category_id' => $data['category_id'],
                ':excerpt' => $data['excerpt'] ?? '',
                ':author_id' => !empty($data['author_id']) ? $data['author_id'] : null,
                ':guest_author_name' => !empty($data['guest_author_name']) ? $data['guest_author_name'] : null,
                ':reading_time' => $data['readingTime'] ?? '5 min read',
                ':publish_date' => $data['publishDateRaw'] ?? date('Y-m-d'),
                ':seo_title' => $data['seoTitle'] ?? null,
                ':seo_description' => $data['seoDescription'] ?? null,
                ':featured_image_id' => $featuredImageId,
                ':status' => $data['status'] ?? 'draft'
            ]);

            // Clear old blocks and insert new blocks
            $stmtDel = $this->db->prepare("DELETE FROM blog_content_blocks WHERE blog_id = :blog_id");
            $stmtDel->execute([':blog_id' => $id]);

            if (!empty($data['content']) && is_array($data['content'])) {
                $this->insertContentBlocks($id, $data['content']);
            }

            $this->db->commit();
            return true;
        } catch (\Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }

    /**
     * Delete a blog post.
     */
    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM blogs WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return true;
    }

    /**
     * Get all categories.
     */
    public function getCategories() {
        return $this->db->query("SELECT id, name, slug, description FROM categories ORDER BY name ASC")->fetchAll(PDO::FETCH_ASSOC);
    }

    private function insertContentBlocks($blogId, $blocks) {
        $sql = "INSERT INTO blog_content_blocks (blog_id, block_type, sort_order, text_content, image_id, block_data)
                VALUES (:blog_id, :block_type, :sort_order, :text_content, :image_id, :block_data)";
        
        $stmt = $this->db->prepare($sql);
        
        $sortOrder = 1;
        foreach ($blocks as $block) {
            $blockType = $block['type'] ?? 'paragraph';
            $textContent = $block['text'] ?? null;
            $imageId = null;
            $blockData = null;

            if ($blockType === 'image') {
                $imageId = !empty($block['image_id']) ? $block['image_id'] : null;
            }

            // Capture other keys (items for list, headers/rows for table, author for quote, image src/caption)
            $structuredKeys = [];
            if ($blockType === 'bullet-list' || $blockType === 'numbered-list') {
                $structuredKeys['items'] = $block['items'] ?? [];
            } elseif ($blockType === 'table') {
                $structuredKeys['headers'] = $block['headers'] ?? [];
                $structuredKeys['rows'] = $block['rows'] ?? [];
            } elseif ($blockType === 'quote' && !empty($block['author'])) {
                $structuredKeys['author'] = $block['author'];
            } elseif ($blockType === 'image') {
                if (!$imageId && !empty($block['src'])) {
                    $structuredKeys['src'] = $block['src'];
                }
                if (!empty($block['caption'])) {
                    $structuredKeys['caption'] = $block['caption'];
                }
            }

            if (!empty($structuredKeys)) {
                $blockData = json_encode($structuredKeys);
            }

            $stmt->execute([
                ':blog_id' => $blogId,
                ':block_type' => $blockType,
                ':sort_order' => $sortOrder++,
                ':text_content' => $textContent,
                ':image_id' => $imageId,
                ':block_data' => $blockData
            ]);
        }
    }

    /**
     * Helper to slugify a text.
     */
    private function slugify($text) {
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
        $text = preg_replace('~[^-\w]+~', '', $text);
        $text = trim($text, '-');
        $text = preg_replace('~-+~', '-', $text);
        $text = strtolower($text);
        return empty($text) ? 'n-a' : $text;
    }

    /**
     * Ensure unique slug in DB.
     */
    private function makeUniqueSlug($slug, $excludeId = null) {
        $originalSlug = $slug;
        $counter = 1;

        while (true) {
            $sql = "SELECT COUNT(*) FROM blogs WHERE slug = :slug";
            if ($excludeId !== null) {
                $sql .= " AND id != :exclude_id";
            }
            
            $stmt = $this->db->prepare($sql);
            $params = [':slug' => $slug];
            if ($excludeId !== null) {
                $params[':exclude_id'] = $excludeId;
            }
            
            $stmt->execute($params);
            $count = $stmt->fetchColumn();
            
            if ($count == 0) {
                return $slug;
            }
            $slug = $originalSlug . '-' . $counter++;
        }
    }
}
