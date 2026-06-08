<?php
namespace Models;

use Database\Connection;
use PDO;

class DashboardModel {
    private $db;

    public function __construct() {
        $this->db = Connection::getInstance()->getConnection();
    }

    /**
     * Retrieve statistics counts for blogs and images.
     *
     * @return array
     */
    public function getCounts() {
        $totalBlogs = $this->db->query("SELECT COUNT(*) FROM blogs")->fetchColumn();
        $publishedBlogs = $this->db->query("SELECT COUNT(*) FROM blogs WHERE status = 'published'")->fetchColumn();
        $draftBlogs = $this->db->query("SELECT COUNT(*) FROM blogs WHERE status = 'draft'")->fetchColumn();

        return [
            'total_blogs' => (int)$totalBlogs,
            'published_blogs' => (int)$publishedBlogs,
            'draft_blogs' => (int)$draftBlogs
        ];
    }

    /**
     * Retrieve recent blogs metadata.
     *
     * @param int $limit Max items.
     * @return array
     */
    public function getRecentBlogs($limit = 5) {
        $stmt = $this->db->prepare("
            SELECT b.title, c.name as category, b.status, b.publish_date
            FROM blogs b
            LEFT JOIN categories c ON b.category_id = c.id
            ORDER BY b.created_at DESC
            LIMIT :limit
        ");
        $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


}
