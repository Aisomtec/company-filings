<?php
namespace Controllers;

use Models\UserModel;
use Helpers\Response;

class UserController {
    private $model;

    public function __construct() {
        $this->model = new UserModel();
    }

    public function index() {
        Response::json($this->model->getAll());
    }

    public function show($id) {
        $user = $this->model->getById($id);
        if ($user) {
            Response::json($user);
        } else {
            Response::json(['error' => 'User not found'], 404);
        }
    }

    public function store() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data['name']) || empty($data['email']) || empty($data['password']) || empty($data['role']) || empty($data['status'])) {
            Response::json(['error' => 'Missing required fields'], 400);
        }

        try {
            $userId = $this->model->create($data);
            Response::json(['id' => $userId, 'message' => 'User created successfully']);
        } catch (\PDOException $e) {
            if ($e->getCode() == 23000) { // Integrity constraint violation (duplicate email)
                Response::json(['error' => 'Email address already registered'], 409);
            } else {
                Response::json(['error' => $e->getMessage()], 500);
            }
        }
    }

    public function update($id) {
        $data = json_decode(file_get_contents("php://input"), true);
        if (empty($data['name']) || empty($data['email']) || empty($data['role']) || empty($data['status'])) {
            Response::json(['error' => 'Missing required fields'], 400);
        }

        try {
            $this->model->update($id, $data);
            Response::json(['message' => 'User updated successfully']);
        } catch (\PDOException $e) {
            if ($e->getCode() == 23000) {
                Response::json(['error' => 'Email address already registered'], 409);
            } else {
                Response::json(['error' => $e->getMessage()], 500);
            }
        }
    }

    public function destroy($id) {
        try {
            $this->model->delete($id);
            Response::json(['message' => 'User deleted successfully']);
        } catch (\Exception $e) {
            Response::json(['error' => $e->getMessage()], 500);
        }
    }
}
