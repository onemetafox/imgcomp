<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH.'core/AdminController.php');

class Events extends AdminController {
	
	var $layout = "admin";

	public function __contruct(){
		parent::__construct();
	}
	public function index($type)
	{
		$data["page_title"] = "Events";
		$this->render("admin/events");
			
	}

	public function save(){
		$data = $this->input->post();
		if($data["id"]){
			$this->event_model->updateData($data);
			$this->json(array("success" => true, "msg"=>"Success!"));
		}else{
			$data["created_at"] = date("Y-m-d h:s:i");
			$this->event_model->setData($data);
			$this->json(array("success" => true, "msg"=>"Success!"));
		}
	}
	public function view($id){
		$data["page_title"] = "Files";
		$data["event"] = $this->event_model->getDataById($id);
		$data["files"] = $this->file_model->getDataByParam(array("event_id"=>$id));
		$this->render("admin/files", $data);
	}
	public function delete(){
		$id = $this->input->post("id");
		$this->event_model->unsetDataById($id);
		$this->json(array("success" => true, "msg"=>"Success"));
	}

	public function api(){
		$data["data"] = $this->event_model->getAll();
		$this->json($data);
	}

	public function qrGenerate(){
		
	}
}
