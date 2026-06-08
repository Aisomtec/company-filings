<?php
// backend/api/images.php
// Dispatcher router endpoint for Image Library assets management.

require_once __DIR__ . '/../bootstrap.php';

use Controllers\ImageController;

$controller = new ImageController();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $controller->index();
        break;
    case 'POST':
        $controller->upload();
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Method Not Allowed"]);
        break;
}
