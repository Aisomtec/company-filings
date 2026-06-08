<?php
// backend/bootstrap.php
// Pre-execution environment configurations, lazy-loading classes, and global CORS preflight.

// Register Autoloader for namespaces mapping directly to folders.
spl_autoload_register(function ($class) {
    // Convert namespace backslashes to system directory separators
    $classPath = str_replace('\\', DIRECTORY_SEPARATOR, $class);
    
    // Split the path and lowercase all directory names (keeping class name capitalized) to match lowercase folder names on case-sensitive OS
    $parts = explode(DIRECTORY_SEPARATOR, $classPath);
    if (count($parts) > 1) {
        for ($i = 0; $i < count($parts) - 1; $i++) {
            $parts[$i] = strtolower($parts[$i]);
        }
        $classPath = implode(DIRECTORY_SEPARATOR, $parts);
    }
    
    $file = __DIR__ . DIRECTORY_SEPARATOR . $classPath . '.php';
    if (file_exists($file)) {
        require_once $file;
    }
});

// Configure base CORS headers to support React client fetch requests.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle HTTP preflight requests.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
