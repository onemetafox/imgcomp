<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('asset_url()'))
{
    function asset_url()
    {
        return base_url().'assets/';
    }
    function upload_url(){
        return base_url().'uploads/';
    }
}