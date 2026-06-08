<?php
// backend/api/migrate.php
require_once __DIR__ . '/../bootstrap.php';
use Database\Connection;

header('Content-Type: text/plain');

try {
    $db = Connection::getInstance()->getConnection();

    // 1. Add location column if not exists
    $stmt = $db->query("SHOW COLUMNS FROM images LIKE 'location'");
    if ($stmt->rowCount() === 0) {
        $db->exec("ALTER TABLE images ADD COLUMN location VARCHAR(255) DEFAULT NULL COMMENT 'Page section location'");
        echo "Column 'location' added to 'images' table.\n";
    } else {
        echo "Column 'location' already exists.\n";
    }

    // 2. Seed/Update images list
    $seedImages = [
        [
            'id' => 1,
            'filename' => 'blog-img1.avif',
            'filepath' => '/uploads/blogs/',
            'url' => '/blog-img1.avif',
            'alt_text' => 'Steps to Register a Private Limited Company in India',
            'title' => 'Private Limited Company Registration',
            'location' => 'Blog 1 Card Thumbnail'
        ],
        [
            'id' => 2,
            'filename' => 'image.jpg',
            'filepath' => '/uploads/blogs/',
            'url' => '/image.jpg',
            'alt_text' => 'Annual ROC Filing Requirements Explained',
            'title' => 'Annual ROC Filings',
            'location' => 'Blog 2 Card Thumbnail'
        ],
        [
            'id' => 3,
            'filename' => 'blog-img3.avif',
            'filepath' => '/uploads/blogs/',
            'url' => '/blog-img3.avif',
            'alt_text' => 'Startup India Registration Benefits for New Businesses',
            'title' => 'Startup India Registration',
            'location' => 'Blog 3 Card Thumbnail'
        ],
        [
            'id' => 4,
            'filename' => 'blog_cooperation.jpg',
            'filepath' => '/uploads/blogs/',
            'url' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
            'alt_text' => 'Our advisory team collaborating on structural corporate compliance and filings.',
            'title' => 'Blog Cooperation Detail Image',
            'location' => 'Blog Detail Content Image 1 (Cooperation)'
        ],
        [
            'id' => 5,
            'filename' => 'blog_analytics.jpg',
            'filepath' => '/uploads/blogs/',
            'url' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
            'alt_text' => 'Dynamic digital auditing tools for tracking business filing requirements.',
            'title' => 'Blog Analytics Detail Image',
            'location' => 'Blog Detail Content Image 2 (Analytics)'
        ],
        [
            'id' => 6,
            'filename' => 'contact_hero.jpg',
            'filepath' => '/uploads/images/',
            'url' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
            'alt_text' => 'Corporate Skyscraper Workspace representing stability and trust',
            'title' => 'Contact Page Hero',
            'location' => 'Contact Page Hero Background'
        ],
        [
            'id' => 7,
            'filename' => 'contact_callback.jpg',
            'filepath' => '/uploads/images/',
            'url' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
            'alt_text' => 'Corporate auditing illustration',
            'title' => 'Contact Callback Illustration',
            'location' => 'Contact Page Callback Section'
        ],
        [
            'id' => 8,
            'filename' => 'expertise.avif',
            'filepath' => '/uploads/images/',
            'url' => '/expertise.avif',
            'alt_text' => 'Our Core Expertise',
            'title' => 'Corporate Expertise Illustration',
            'location' => 'Home Page Core Expertise Section'
        ],
        [
            'id' => 9,
            'filename' => 'blogs-hero.avif',
            'filepath' => '/uploads/images/',
            'url' => '/blogs-hero.avif',
            'alt_text' => 'Knowledge Center Hero Background',
            'title' => 'Blogs Listing Hero Background',
            'location' => 'Blogs Listing Hero Background'
        ],
        [
            'id' => 10,
            'filename' => 'about-hero.avif',
            'filepath' => '/uploads/images/',
            'url' => '/about-hero.avif',
            'alt_text' => 'About Hero Background',
            'title' => 'About Page Hero Background',
            'location' => 'About Page Hero Background'
        ],
        [
            'id' => 11,
            'filename' => 'overview.avif',
            'filepath' => '/uploads/images/',
            'url' => '/overview.avif',
            'alt_text' => 'Corporate Overview Section',
            'title' => 'About Page Corporate Overview Section',
            'location' => 'About Page Corporate Overview Section'
        ],
        [
            'id' => 12,
            'filename' => 'advantage.avif',
            'filepath' => '/uploads/images/',
            'url' => '/advantage.avif',
            'alt_text' => 'Corporate Advantage Section',
            'title' => 'About Page Company Advantage Section',
            'location' => 'About Page Company Advantage Section'
        ],
        [
            'id' => 13,
            'filename' => 'hero.avif',
            'filepath' => '/uploads/images/',
            'url' => '/hero.avif',
            'alt_text' => 'Home Hero slide 1 background',
            'title' => 'Home Page Hero Slide 1 Background',
            'location' => 'Home Page Hero Slide 1 Background'
        ],
        [
            'id' => 14,
            'filename' => 'hero1.avif',
            'filepath' => '/uploads/images/',
            'url' => '/hero1.avif',
            'alt_text' => 'Home Hero slide 2 background',
            'title' => 'Home Page Hero Slide 2 Background',
            'location' => 'Home Page Hero Slide 2 Background'
        ],
        [
            'id' => 15,
            'filename' => 'hero2.avif',
            'filepath' => '/uploads/images/',
            'url' => '/hero2.avif',
            'alt_text' => 'Home Hero slide 3 background',
            'title' => 'Home Page Hero Slide 3 Background',
            'location' => 'Home Page Hero Slide 3 Background'
        ]
    ];

    $sqlInsert = "INSERT INTO images (id, filename, filepath, url, alt_text, title, location) 
                  VALUES (:id, :filename, :filepath, :url, :alt_text, :title, :location)
                  ON DUPLICATE KEY UPDATE 
                    filename = VALUES(filename), 
                    filepath = VALUES(filepath), 
                    url = VALUES(url), 
                    alt_text = VALUES(alt_text), 
                    title = VALUES(title),
                    location = VALUES(location)";

    $stmtInsert = $db->prepare($sqlInsert);

    foreach ($seedImages as $img) {
        $stmtInsert->execute([
            ':id' => $img['id'],
            ':filename' => $img['filename'],
            ':filepath' => $img['filepath'],
            ':url' => $img['url'],
            ':alt_text' => $img['alt_text'],
            ':title' => $img['title'],
            ':location' => $img['location']
        ]);
    }

    echo "Seeded/Updated " . count($seedImages) . " images in media library table successfully.\n";

} catch (Exception $e) {
    echo "Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}
