<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Astarte_model extends CI_Model {

    function __construct(){
        parent::__construct();
    }

    public function get_all_sources(){

        $sql = "SELECT u.sender_mac, u.tempo_geracao, u.tempo_rececao, u.latitude, u.longitude, d.tipo, d.valor
				FROM unit_info as u, unit_data as d 
				WHERE u.sender_mac = d.sender_mac 
				AND u.tempo_geracao = d.tempo_geracao
				ORDER BY u.sender_mac, u.tempo_geracao";

        $result = $this->db->query($sql);

        $finalArray = [];

        foreach($result->result() as $r){
            $array = ['id' => $r->sender_mac, 'gen_time' => $r->tempo_geracao, 'rec_time' => $r->tempo_rececao, 'lat' => $r->latitude, 'lng' => $r->longitude, 'type' => $r->tipo, 'value' => $r->valor];
            array_push($finalArray, $array);
        }

        return $finalArray;

    }
	
	public function get_sources_in_area($latMin, $latMax, $lngMin, $lngMax){
		$sql = 
			"SELECT *
			FROM
			(SELECT * FROM unit_info
			WHERE latitude BETWEEN CAST(? AS DECIMAL(8,5)) AND CAST(? AS DECIMAL(8,5))
			AND longitude BETWEEN CAST(? AS DECIMAL(8,5)) AND CAST(? AS DECIMAL(8,5))) AS u
			LEFT JOIN unit_data AS d
			ON u.sender_mac = d.sender_mac
			AND u.tempo_geracao = d.tempo_geracao";
		$result = $this->db->query($sql, array($latMin, $latMax, $lngMin, $lngMax));

        $finalArray = [];

        foreach($result->result() as $r){
            $array = ['id' => $r->sender_mac, 'gen_time' => $r->tempo_geracao, 'rec_time' => $r->tempo_rececao, 'lat' => $r->latitude, 'lng' => $r->longitude, 'type' => $r->tipo, 'value' => $r->valor];
            array_push($finalArray, $array);
        }

        return $finalArray;
	}


}
