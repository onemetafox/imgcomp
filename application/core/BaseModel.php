<?php
	defined('BASEPATH') or die('No direct access script allowed!');

	class BaseModel extends CI_Model
	{
		public $table = "";

		public function __construct() {
			$this->load->database();
		}
		public function where($filter){
			foreach($filter as $key => $value){
				$this->db->where($key, $value);
			}
		}
		public function setData($data) {
			$query = $this->db->insert($this->table, $data);
			return $this->db->insert_id();
		}

		public function getAll() {
			$query = $this->db->get($this->table)
							  ->result();
			return $query;
		}

		public function getDataById($id) {
			$query = $this->db->where('id', $id)
							  ->get($this->table)
							  ->row_array();
			return $query;
		}

		public function getDataByParam($param = null){
			if($param){
				$this->where($param);
			}
			$result = $this->db->get($this->table)->result_array();
			return $result;
		}

		public function getOneByParam($param){
			if($param){
				$this->where($param);
			}
			$result = $this->db->get($this->table)->result_array();
			if($result)
				return $result[0];
		}

		public function unsetDataById($id) {
			$query = $this->db->where('id', $id)
							  ->delete($this->table);

			return $query;
		}

		public function updateData($data) {
			$query = $this->db->set($data)
							  ->where('id', $data['id'])
							  ->update($this->table);
		}
		public function counts($filter){
			if($filter)
				$this->where($filter);
			return $this->db->count_all_results($this->table);
		}
		public function deleteByParam($filter = null){
			if($filter)
				$this->where($filter);
			$query = $this->db->delete($this->table);
			return $query;
		}

		public function updateDataByParam($data, $filter){
			$this->where($filter);
			$query = $this->db->set($data)->update($this->table);
			return $query;
		}
	}