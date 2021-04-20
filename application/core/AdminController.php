<?php
	defined('BASEPATH') or die('No direct access script allowed!');

	require_once(APPPATH.'core/BaseController.php');

	class AdminController extends BaseController
	{
        var $layout = "admin";
		public function __construct() {
			parent::__construct();
			$menus = $this->config->item("menus");
			$this->data["menus"] = $menus['admin'];
		}
	}