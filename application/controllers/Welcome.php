<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH.'core/AdminController.php');

class Welcome extends AdminController {
	
	var $layout = "admin";

	public function __contruct(){
		parent::__construct();
	}

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$data["page_title"] = "Events";
		$this->render("admin/events", $data);		
	}

	// funtion to return event view for the public user
	public function event($id, $index = null){
		if($index){
			$files = $this->file_model->getDataByParam(array("event_id"=>$id));
			$data["file"] = $files[$index-1];
			$data["index"] = $index;
		}else{
			$data["event"]=$this->event_model->getDataById($id);
		}
		$this->load->view("public/index", $data);
	}

	// return badge image to public user who have done game of 5 pairs
	public function bage($id, $sessionId){
		$data["event"] = $this->event_model->getDataById($id);
		$data["sessionId"] = $sessionId;
		$this->load->view("public/bage", $data);
	}
	
}
