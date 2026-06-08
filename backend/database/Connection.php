<?php
namespace Database;

use PDO;
use PDOException;

/**
 * Singleton database connection manager utilizing PDO.
 * Safely handles connection configurations and blocks duplicate handlers.
 */
class Connection {
    private static $instance = null;
    private $conn;

    private function __construct() {
        $config = require __DIR__ . '/../config/db.php';
        $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset={$config['charset']}";
        
        try {
            $this->conn = new PDO($dsn, $config['user'], $config['pass'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } catch (PDOException $e) {
            // Do not output sensitive raw database details to users in production API outputs.
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode([
                'error' => 'Database connection failed.',
                'message' => 'Ensure MySQL is running on localhost and database "company_filings_cms" exists.'
            ]);
            exit();
        }
    }

    // Retrieve active instance.
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    // Retrieve active PDO instance.
    public function getConnection() {
        return $this->conn;
    }
}
