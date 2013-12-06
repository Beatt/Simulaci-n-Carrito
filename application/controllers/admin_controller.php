<?php
if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Admin_Controller extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this -> load -> model('admin_model');
		$this -> load -> helper('url');
	}

	public function index() {

		$this -> load -> view('template/header');
		$this -> load -> view('principal');
		$this -> load -> view('template/footer');
	}
	
}
