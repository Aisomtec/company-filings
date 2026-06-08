<?php
// backend/api/users.php
// Dispatcher router endpoint for CRUD operations on admin users.

require_once __DIR__ . '/../bootstrap.php';

use Controllers\UserController;

$controller = new UserController();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $controller->show((int)$_GET['id']);
        } else {
            $controller->index();
        }
        break;
    case 'POST':
        $controller->store();
        break;
    case 'PUT':
        if (isset($_GET['id'])) {
            $controller->update((int)$_GET['id']);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Missing user ID parameter"]);
        }
        break;
    case 'DELETE':
        if (isset($_GET['id'])) {
            $controller->destroy((int)$_GET['id']);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Missing user ID parameter"]);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Method Not Allowed"]);
        break;
}
