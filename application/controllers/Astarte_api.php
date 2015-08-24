<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Astarte_api extends CI_Controller {

	function __construct(){
        parent::__construct();

        $this->output->set_content_type('application/json');
        $this->load->model('astarte_model');

    }

	public function get_all_sources(){

	   $sources = $this->astarte_model->get_all_sources();

	   $finalArray = [];
	   $cur_id = null;
	   $cur_id_i = -1;
	   $cur_gen_time = null;
	   $cur_gen_time_i = -1;

	   foreach($sources as $source){

		   if($cur_id != $source['id']){

			   $cur_id_i += 1;
			   $cur_gen_time = null;
			   $cur_gen_time_i = -1;
			   $cur_id = $source['id'];
			   array_push($finalArray, ['id' => $cur_id, 'positions' => []]);

		   }

		   if($cur_id == $source['id'] && $cur_gen_time != $source['gen_time']){

			   $cur_gen_time_i += 1;
			   $cur_gen_time = $source['gen_time'];
			   array_push($finalArray[$cur_id_i]['positions'], ['gen_time' => $source['gen_time'], 'lat' => $source['lat'], 'lng' => $source['lng'], 'data' => []]);

		   }

		   if($cur_id == $source['id'] && $cur_gen_time == $source['gen_time']){

			   array_push($finalArray[$cur_id_i]['positions'][$cur_gen_time_i]['data'], ['type' => strtolower($source['type']), 'value' => $source['value']]);

		   }

	   }

	   echo json_encode($finalArray);

   }

}
