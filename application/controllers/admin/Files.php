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

	/** function to save one image pair */
	public function save(){
		
		$data = $this->input->post();

		//get position array from the api without the start and end quaots mark
		$data["position"] = json_decode($data["position"]);
		// check insert or update
		if($data["id"]){
			$this->file_model->updateData($data);
			$pair_id = $data["id"];
		}else{
			$pair_id = $this->file_model->setData($data);
		}
		// upload file pairs
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

		// update file pair information
		$this->file_model->updateData($data);
		$this->json(array("success"=>true, "msg"=>"Success!", "data" => $data));
		
	}

	// delete image pair
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
