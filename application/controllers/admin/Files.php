<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH.'core/AdminController.php');

class Files extends AdminController {
	
	public function __contruct(){
		parent::__construct();
	}

	public function index()
	{
		$data["page_title"] = "Files";
		$this->render("admin/files", $data);
	}

	public function save(){
		
		$data = $this->input->post();
		$data["position"] = json_decode($data["position"]);
		if($data["id"]){
			$this->file_model->updateData($data);
			$pair_id = $data["id"];
		}else{
			$pair_id = $this->file_model->setData($data);
		}
		if(isset($_FILES["file1"]))
			if ( 0 < $_FILES['file1']['error'] ) {
				echo 'Error: ' . $_FILES['file']['error'] . '<br>';
			}
			else {
				move_uploaded_file($_FILES['file1']['tmp_name'], 'uploads/' . $pair_id.".jpg");
				$data["img_1"] = $pair_id.".jpg";
			}
		if(isset($_FILES["file2"]))
			if ( 0 < $_FILES['file2']['error'] ) {
				echo 'Error: ' . $_FILES['file']['error'] . '<br>';
			}
			else {
				move_uploaded_file($_FILES['file2']['tmp_name'], 'uploads/' . $pair_id."_1.jpg");
				$data["img_2"] = $pair_id."_1.jpg";
			}
		$data["id"] = $pair_id;
		$this->file_model->updateData($data);
		$this->json(array("success"=>true, "msg"=>"Success!", "data" => $data));
		
	}
	public function delete($id){
		$this->recipe->unsetDataById($id);
		$this->json(array("success"=>true, "msg"=>"Deleted!"));
	}

	public function api(){
		$filter = $this->input->post();
		$user = $this->user_data();
		$data["meta"] = $filter;
		$data["data"] = $this->recipe->getDataByParam(array("user_id"=>$user["id"]));
		$this->json($data);
	}
}
