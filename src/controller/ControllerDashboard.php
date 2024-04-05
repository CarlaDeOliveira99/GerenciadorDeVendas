<?php 
namespace src\controller;
Use src\model\Dashboard;

class ControllerDashboard{

    private $dashboard;

    public function __construct() {
        $this->dashboard = new Dashboard();
    }

    public function get_estoqueGeral(){
        $resposta = $this->dashboard->consultarEstoqueGeral();
        $return  = json_encode( $resposta);
        
    }
}

?>