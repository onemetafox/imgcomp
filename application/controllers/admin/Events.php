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
			$event_id = $data["id"];
		}else{
			$data["created_at"] = date("Y-m-d h:s:i");
			$event_id = $this->event_model->setData($data);
		}
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
				$this->json(array("success"=>true, "msg"=>"Success"));
		}
		$this->json(array("success" => true, "msg"=>"Success!"));
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
