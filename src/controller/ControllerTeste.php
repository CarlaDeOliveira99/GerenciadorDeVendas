<?php 
namespace src\controller;

class ControllerTeste {

    public function get_outroTeste() {
        echo 'chama no dinamismo MDFK';
    }

    public function post_xTeste() {
        $json_convertido = json_decode(file_get_contents('php://input'), true);

       


        header('Content-Type: application/json');
        echo json_encode( $json_convertido);
        
    }

}



?>