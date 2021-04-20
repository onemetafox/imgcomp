<?php
	defined('BASEPATH') or die('No direct access script allowed!');

	class BaseController extends CI_Controller
	{
        var $layout = "";
		var $data = array();
		public function __construct() {
			parent::__construct();
		}

		public function render($content, $data = array()){

			$this->data = array_merge($data, $this->data);
			$this->template['header']  = $this->load->view('layout/'.$this->layout.'/header', $this->data, TRUE);
            $this->template['content'] = $this->load->view($content, $this->data, TRUE);
            $this->template['footer']  = $this->load->view('layout/'.$this->layout.'/footer', $this->data, TRUE);

            return $this->load->view('layout/'.$this->layout.'/template', $this->template);
			
        }
        public function user_data(){
			return $this->session->userdata("user");
		}
        public function json($data){
			echo json_encode($data);
        }
		public function all(){
			$filter = $this->input->post();
			return $this->model->getDataByParam($filter);
		}
		public function save(){
			$data = $this->input-post();
			if($data["id"]){
				$this->model->updateData($data);
			}else{
				$this->model->setData($data);
			}
		}
	}