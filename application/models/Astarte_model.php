<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Astarte_model extends CI_Model {

    function __construct(){
        parent::__construct();
    }

    public function get_all_sources(){

        $sql = "SELECT u.sender_mac, u.tempo_geracao, u.latitude, u.longitude, d.tipo, d.valor
                FROM unit_info as u, unit_data as d
                WHERE u.sender_mac = d.sender_mac
                ORDER BY u.sender_mac, u.tempo_geracao";

        $result = $this->db->query($sql);

        $finalArray = [];

        foreach($result->result() as $r){
            $array = ['id' => $r->sender_mac, 'gen_time' => $r->tempo_geracao, 'lat' => $r->latitude, 'lng' => $r->longitude, 'type' => $r->tipo, 'value' => $r->valor];
            array_push($finalArray, $array);
        }

        return $finalArray;

    }


}
