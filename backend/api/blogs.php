<?php
// backend/api/blogs.php
// Dispatcher router endpoint for CRUD operations on blog posts.

require_once __DIR__ . '/../bootstrap.php';

use Controllers\BlogController;

$controller = new BlogController();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['action']) && $_GET['action'] === 'form-context') {
            $controller->getFormContext();
        } elseif (isset($_GET['slug'])) {
            $controller->showBySlug($_GET['slug']);
        } elseif (isset($_GET['id'])) {
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
            echo json_encode(["error" => "Missing blog ID parameter"]);
        }
        break;
    case 'DELETE':
        if (isset($_GET['id'])) {
            $controller->destroy((int)$_GET['id']);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Missing blog ID parameter"]);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Method Not Allowed"]);
        break;
}
