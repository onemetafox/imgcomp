<?php
	defined('BASEPATH') or die('No direct access script allowed!');

    require_once(APPPATH.'core/BaseModel.php');

	class Event_model extends BaseModel
	{
		var $table = 'event';
	}