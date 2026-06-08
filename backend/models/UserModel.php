<?php
namespace Models;

use Database\Connection;
use PDO;

class UserModel {
    private $db;

    public function __construct() {
        $this->db = Connection::getInstance()->getConnection();
    }

    public function getAll() {
        return $this->db->query("SELECT id, name, email, role, status, last_login, created_at FROM admin_users ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->db->prepare("SELECT id, name, email, role, status, last_login, created_at FROM admin_users WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->db->prepare("INSERT INTO admin_users (name, email, password_hash, role, status) VALUES (:name, :email, :password_hash, :role, :status)");
        $stmt->execute([
            ':name' => $data['name'],
            ':email' => $data['email'],
            ':password_hash' => password_hash($data['password'], PASSWORD_BCRYPT),
            ':role' => $data['role'],
            ':status' => $data['status']
        ]);
        return $this->db->lastInsertId();
    }

    public function update($id, $data) {
        if (!empty($data['password'])) {
            $stmt = $this->db->prepare("UPDATE admin_users SET name = :name, email = :email, password_hash = :password_hash, role = :role, status = :status WHERE id = :id");
            $stmt->execute([
                ':id' => $id,
                ':name' => $data['name'],
                ':email' => $data['email'],
                ':password_hash' => password_hash($data['password'], PASSWORD_BCRYPT),
                ':role' => $data['role'],
                ':status' => $data['status']
            ]);
        } else {
            $stmt = $this->db->prepare("UPDATE admin_users SET name = :name, email = :email, role = :role, status = :status WHERE id = :id");
            $stmt->execute([
                ':id' => $id,
                ':name' => $data['name'],
                ':email' => $data['email'],
                ':role' => $data['role'],
                ':status' => $data['status']
            ]);
        }
        return true;
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM admin_users WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return true;
    }
}
