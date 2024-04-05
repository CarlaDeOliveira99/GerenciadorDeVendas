<?php 
namespace src\model;
use estrutura\ConexaoBd;
use PDO;

class Dashboard{

    private $conexao;

    public function __construct() {
        $this->conexao =  ConexaoBd::conecta();
    }

    public function consultarEstoqueGeral(){
        // $sql = 'SELECT * FROM estoque'
    }

}
?>