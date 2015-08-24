<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Astarte_model extends CI_Model {

    function __construct(){
        parent::__construct();
    }

    public function get_all_sources(){

        $sql = "SELECT u.sender_id, u.tempo_geracao, u.latitude, u.longitude, d.tipo, d.valor
                FROM unidade_info as u, dados as d
                WHERE u.sender_id = d.sender_id
                ORDER BY u.sender_id, u.tempo_geracao";

        $result = $this->db->query($sql);

        $finalArray = [];

        foreach($result->result() as $r){
            $array = ['id' => $r->sender_id, 'gen_time' => $r->tempo_geracao, 'lat' => $r->latitude, 'lng' => $r->longitude, 'type' => $r->tipo, 'value' => $r->valor];
            array_push($finalArray, $array);
        }

        return $finalArray;

    }


}
