-- Company Filings Database Schema
-- DBMS: MySQL 5.7+ / 8.0+
-- Description: Tailored schema matching current React frontend requirements for CMS integration.

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `blog_content_blocks`;
DROP TABLE IF EXISTS `blogs`;
DROP TABLE IF EXISTS `images`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `admin_users`;
SET FOREIGN_KEY_CHECKS = 1;

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. ADMIN USERS TABLE
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE `admin_users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('super_admin', 'administrator', 'editor', 'author') NOT NULL DEFAULT 'author',
  `status` ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
  `last_login` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `idx_admin_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. CATEGORIES TABLE
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE `categories` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `idx_categories_name` (`name`),
  UNIQUE KEY `idx_categories_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. IMAGES TABLE (Centralized Image Management)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE `images` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `filename` VARCHAR(255) DEFAULT NULL COMMENT 'Physical filename stored on disk (e.g. filename.webp)',
  `filepath` VARCHAR(255) DEFAULT NULL COMMENT 'Path prefix on the server (e.g. /uploads/images/)',
  `url` VARCHAR(2048) NOT NULL COMMENT 'Fully qualified CDN/Unsplash or fallback URL',
  `alt_text` VARCHAR(255) DEFAULT NULL COMMENT 'Crucial for dynamic SEO and accessibility',
  `title` VARCHAR(255) DEFAULT NULL COMMENT 'Title/Tooltip info for admin panel and frontend hover',
  `caption` VARCHAR(255) DEFAULT NULL COMMENT 'Optional image caption rendered in blogs',
  `location` VARCHAR(255) DEFAULT NULL COMMENT 'Page section location',
  `mime_type` VARCHAR(100) DEFAULT NULL COMMENT 'Mime type (e.g. image/webp, image/jpeg)',
  `file_size` INT UNSIGNED DEFAULT NULL COMMENT 'File size in bytes for audit/admin display',
  `width` INT UNSIGNED DEFAULT NULL COMMENT 'Pixel width',
  `height` INT UNSIGNED DEFAULT NULL COMMENT 'Pixel height',
  `uploaded_by` INT UNSIGNED DEFAULT NULL COMMENT 'Tracks which admin user uploaded this asset',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_images_uploaded_by` FOREIGN KEY (`uploaded_by`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. BLOGS TABLE (Core Article Metadata)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE `blogs` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(191) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  `excerpt` TEXT NOT NULL COMMENT 'Short description displayed on blog list cards',
  `author_id` INT UNSIGNED DEFAULT NULL COMMENT 'References admin user (author name, avatar, bio)',
  `guest_author_name` VARCHAR(100) DEFAULT NULL COMMENT 'Fallback name if author is external/guest and lacks user profile',
  `reading_time` VARCHAR(50) NOT NULL COMMENT 'Estimated read duration (e.g. \"8 min read\")',
  `publish_date` DATE NOT NULL COMMENT 'Stable publishing date displayed on frontend',
  `seo_title` VARCHAR(255) DEFAULT NULL COMMENT 'Optimized Title tag for SEO',
  `seo_description` TEXT DEFAULT NULL COMMENT 'Meta description for search engine listings',
  `featured_image_id` INT UNSIGNED DEFAULT NULL COMMENT 'FK to images table (replaces raw image URLs)',
  `status` ENUM('draft', 'published', 'scheduled') NOT NULL DEFAULT 'draft',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `idx_blogs_slug` (`slug`),
  KEY `idx_blogs_status_publish_date` (`status`, `publish_date`),
  CONSTRAINT `fk_blogs_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_blogs_author` FOREIGN KEY (`author_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_blogs_featured_image` FOREIGN KEY (`featured_image_id`) REFERENCES `images` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. BLOG CONTENT BLOCKS TABLE (Flexible rendering engine)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE `blog_content_blocks` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `blog_id` INT UNSIGNED NOT NULL,
  `block_type` VARCHAR(50) NOT NULL COMMENT 'Matches React Block Types: paragraph, heading2, heading3, quote, bullet-list, numbered-list, table, highlight-box, image',
  `sort_order` INT UNSIGNED NOT NULL COMMENT '1-based index ordering blocks within the article',
  `text_content` TEXT DEFAULT NULL COMMENT 'Stores text elements for paragraphs, headings, quotes, highlight-boxes',
  `image_id` INT UNSIGNED DEFAULT NULL COMMENT 'References centralized image asset if block_type is \"image\"',
  `block_data` JSON DEFAULT NULL COMMENT 'Stores structured metadata such as list items, table arrays, or quote authors',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uq_blog_block_order` (`blog_id`, `sort_order`),
  KEY `idx_blocks_blog_id` (`blog_id`),
  CONSTRAINT `fk_content_blocks_blog` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_content_blocks_image` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
