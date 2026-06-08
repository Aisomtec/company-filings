<?php
namespace Controllers;

use Models\DashboardModel;
use Helpers\Response;

class DashboardController {
    private $model;

    public function __construct() {
        $this->model = new DashboardModel();
    }

    /**
     * Standard response for dashboard requests.
     */
    public function index() {
        try {
            $counts = $this->model->getCounts();
            $recentBlogs = $this->model->getRecentBlogs(5);

            $response = [
                'statistics' => [
                    'total_blogs' => $counts['total_blogs'],
                    'published_blogs' => $counts['published_blogs'],
                    'draft_blogs' => $counts['draft_blogs'],
                ],
                'recent_blogs' => $recentBlogs,
                'system_status' => [
                    'database' => 'connected',
                    'api' => 'operational',
                    'server' => 'healthy'
                ]
            ];

            Response::json($response);
        } catch (\Exception $e) {
            Response::json([
                'error' => 'An error occurred while loading dashboard statistics.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
