<?php
namespace Controllers;

use Models\BlogModel;
use Models\UserModel;
use Helpers\Response;

class BlogController {
    private $model;
    private $userModel;

    public function __construct() {
        $this->model = new BlogModel();
        $this->userModel = new UserModel();
    }

    public function index() {
        Response::json($this->model->getAll());
    }

    public function show($id) {
        $blog = $this->model->getById($id);
        if ($blog) {
            Response::json($blog);
        } else {
            Response::json(['error' => 'Blog not found'], 404);
        }
    }

    public function showBySlug($slug) {
        $blog = $this->model->getBySlug($slug);
        if ($blog) {
            Response::json($blog);
        } else {
            Response::json(['error' => 'Blog not found'], 404);
        }
    }

    public function store() {
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (empty($data['title']) || empty($data['category_id'])) {
            Response::json(['error' => 'Missing required fields: title and category_id are required'], 400);
        }

        try {
            $blogId = $this->model->create($data);
            Response::json([
                'id' => $blogId, 
                'message' => 'Blog post created successfully'
            ], 201);
        } catch (\Exception $e) {
            Response::json(['error' => 'Failed to create blog post', 'details' => $e->getMessage()], 500);
        }
    }

    public function update($id) {
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (empty($data['title']) || empty($data['category_id'])) {
            Response::json(['error' => 'Missing required fields: title and category_id are required'], 400);
        }

        // Verify blog exists
        $existing = $this->model->getById($id);
        if (!$existing) {
            Response::json(['error' => 'Blog post not found'], 404);
        }

        try {
            $this->model->update($id, $data);
            Response::json(['message' => 'Blog post updated successfully']);
        } catch (\Exception $e) {
            Response::json(['error' => 'Failed to update blog post', 'details' => $e->getMessage()], 500);
        }
    }

    public function destroy($id) {
        // Verify blog exists
        $existing = $this->model->getById($id);
        if (!$existing) {
            Response::json(['error' => 'Blog post not found'], 404);
        }

        try {
            $this->model->delete($id);
            Response::json(['message' => 'Blog post deleted successfully']);
        } catch (\Exception $e) {
            Response::json(['error' => 'Failed to delete blog post', 'details' => $e->getMessage()], 500);
        }
    }

    /**
     * Helper to return all categories and authors for blog forms.
     */
    public function getFormContext() {
        try {
            $categories = $this->model->getCategories();
            $authors = $this->userModel->getAll();
            Response::json([
                'categories' => $categories,
                'authors' => $authors
            ]);
        } catch (\Exception $e) {
            Response::json(['error' => 'Failed to load form context data', 'details' => $e->getMessage()], 500);
        }
    }
}
