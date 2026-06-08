<?php
// backend/api/dashboard.php
// Public entry-point endpoint for dashboard data fetching.

require_once __DIR__ . '/../bootstrap.php';

use Controllers\DashboardController;

$controller = new DashboardController();
$controller->index();
