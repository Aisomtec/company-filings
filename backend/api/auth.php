<?php
// backend/api/auth.php
// Placeholder API endpoint for future Admin Authentication logic.

require_once __DIR__ . '/../bootstrap.php';

use Helpers\Response;

Response::json([
    'status' => 'placeholder',
    'message' => 'Admin Authentication (login/logout/token) APIs are configured and ready for implementation.'
], 501);
