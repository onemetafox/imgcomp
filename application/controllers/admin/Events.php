<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH.'core/AdminController.php');

class Events extends AdminController {
	
	var $layout = "admin";

	public function __contruct(){
		parent::__construct();
	}
	// save event function
	public function save(){
		$data = $this->input->post();
		if($data["id"]){
			$this->event_model->updateData($data);
			$event_id = $data["id"];
		}else{
			$data["created_at"] = date("Y-m-d h:s:i");
			$event_id = $this->event_model->setData($data);
		}

		/* setting to upload the bage file to the upload path */
		$config['upload_path']          = './uploads/bage';
		$config['allowed_types']        = 'gif|jpg|png';
		$config['max_size']             = 100;
		$config['max_width']            = 1024;
		$config['max_height']           = 768;
		$config['file_name']			= $event_id;

		$this->load->library('upload', $config);

		if ( ! $this->upload->do_upload('bage'))
		{
				$error = array('error' => $this->upload->display_errors());
				print_r($error);
		}
		else
		{
				$file =$this->upload->data();
				$this->event_model->updateData(array("bage"=>$file["file_name"], "id"=>$event_id));
		}

		$this->json(array("success" => true, "msg"=>"Success!"));
	}

	/* return event files pairs which is saved into database with event ID*/

	public function view($id){
		$data["page_title"] = "Files";
		//  get event data from event table with id
		$data["event"] = $this->event_model->getDataById($id);

		// get files which is saved in database with event_id
		$data["files"] = $this->file_model->getDataByParam(array("event_id"=>$id));
		$this->render("admin/files", $data);
	}

	/***  delete event function with id */
	public function delete(){
		$id = $this->input->post("id");
		$this->event_model->unsetDataById($id);
		$this->json(array("success" => true, "msg"=>"Success"));
	}

	/**  get all events fromm database. If the query[id] exist then get only one event to update */
	public function api(){
		$id = $this->input->post("query[id]");
		if($id){
			$data["data"] = $this->event_model->getDataById($id);
		}else{
			$data["data"] = $this->event_model->getAll();
		}	
		
		$this->json($data);
	}
	

	/** generate qr code image by using the id and the url. Qr code image upload path is uploads/qr */
	public function qrGen(){
		$id = $this->input->post("id");
		$this->load->library('ciqrcode');
		$params['data'] = "http://$_SERVER[HTTP_HOST]" . base_url()."welcome/event/".$id;
		$params['level'] = 'H';
		$params['size'] = 10;
		$params['savename'] = 'uploads/qr/' . $id .'.png';
		$this->ciqrcode->generate($params);
		$this->event_model->updateData(array("qr_code"=>$id.".png", "id"=>$id));
		$this->json(array("success"=>true, "msg"=> "Success!"));
	}
}
