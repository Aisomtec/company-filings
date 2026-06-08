<?php
namespace Controllers;

use Database\Connection;
use Helpers\Response;
use PDO;

class ImageController {
    private $db;
    private $uploadDir;

    public function __construct() {
        $this->db = Connection::getInstance()->getConnection();
        $this->uploadDir = __DIR__ . '/../uploads/';
    }

    /**
     * List all images from the database.
     */
    public function index() {
        try {
            $stmt = $this->db->query("SELECT * FROM images ORDER BY id DESC");
            $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Map types if needed
            foreach ($images as &$img) {
                $img['id'] = (int)$img['id'];
                $img['file_size'] = $img['file_size'] ? (int)$img['file_size'] : null;
                $img['width'] = $img['width'] ? (int)$img['width'] : null;
                $img['height'] = $img['height'] ? (int)$img['height'] : null;
                $img['uploaded_by'] = $img['uploaded_by'] ? (int)$img['uploaded_by'] : null;
            }
            
            Response::json($images);
        } catch (\Exception $e) {
            Response::json(['error' => 'Failed to load media assets', 'details' => $e->getMessage()], 500);
        }
    }

    /**
     * Upload an image to server and register in database.
     */
    public function upload() {
        if (!isset($_FILES['image'])) {
            Response::json(['error' => 'No image file uploaded'], 400);
        }

        $file = $_FILES['image'];
        
        // Basic error check
        if ($file['error'] !== UPLOAD_ERR_OK) {
            Response::json(['error' => 'File upload error code: ' . $file['error']], 400);
        }

        // Validate file type (allow common images)
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        if (!in_array($mimeType, $allowedTypes)) {
            Response::json(['error' => 'Invalid file format. Only JPEG, PNG, GIF, WebP, and SVG are allowed.'], 400);
        }

        // Create uploads directory if it doesn't exist
        if (!is_dir($this->uploadDir)) {
            mkdir($this->uploadDir, 0755, true);
        }

        // Generate a unique filename on disk
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $cleanName = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($file['name'], PATHINFO_FILENAME));
        $filename = time() . '_' . $cleanName . '.' . ($extension ?: 'jpg');
        $targetPath = $this->uploadDir . $filename;

        // Move the file
        if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
            Response::json(['error' => 'Failed to save uploaded file on the server.'], 500);
        }

        // Determine width and height if possible
        $width = null;
        $height = null;
        $imageSize = @getimagesize($targetPath);
        if ($imageSize) {
            $width = $imageSize[0];
            $height = $imageSize[1];
        }

        // Construct fully-qualified server URL dynamically
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost:8000';
        $url = $protocol . $host . '/backend/uploads/' . $filename;
        $filepath = '/backend/uploads/';

        // Metadata parameters
        $altText = $_POST['alt_text'] ?? ucwords(str_replace('_', ' ', $cleanName));
        $title = $_POST['title'] ?? ucwords(str_replace('_', ' ', $cleanName));
        $caption = $_POST['caption'] ?? null;
        $uploadedBy = !empty($_POST['uploaded_by']) ? (int)$_POST['uploaded_by'] : null;

        try {
            $sql = "INSERT INTO images (filename, filepath, url, alt_text, title, caption, mime_type, file_size, width, height, uploaded_by)
                    VALUES (:filename, :filepath, :url, :alt_text, :title, :caption, :mime_type, :file_size, :width, :height, :uploaded_by)";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':filename' => $filename,
                ':filepath' => $filepath,
                ':url' => $url,
                ':alt_text' => $altText,
                ':title' => $title,
                ':caption' => $caption,
                ':mime_type' => $mimeType,
                ':file_size' => $file['size'],
                ':width' => $width,
                ':height' => $height,
                ':uploaded_by' => $uploadedBy
            ]);

            $imageId = $this->db->lastInsertId();

            Response::json([
                'id' => (int)$imageId,
                'filename' => $filename,
                'url' => $url,
                'alt_text' => $altText,
                'title' => $title,
                'message' => 'Image uploaded and registered successfully.'
            ], 201);

        } catch (\Exception $e) {
            // Cleanup file if DB insert fails
            if (file_exists($targetPath)) {
                unlink($targetPath);
            }
            Response::json(['error' => 'Failed to save image metadata to database', 'details' => $e->getMessage()], 500);
        }
    }

}
