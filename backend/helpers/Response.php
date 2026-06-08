<?php
namespace Helpers;

class Response {
    /**
     * Standardize JSON endpoint outputs and add default CORS headers.
     *
     * @param mixed $data Data payload.
     * @param int $status HTTP status code.
     */
    public static function json($data, $status = 200) {
        // Enforce basic CORS permissions.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");
        
        http_response_code($status);
        echo json_encode($data);
        exit();
    }
}
