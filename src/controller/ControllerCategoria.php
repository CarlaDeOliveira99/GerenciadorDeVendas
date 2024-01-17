<?php

namespace src\controller;

use src\model\CategoriaDao;

class ControllerCategoria
{

    private $CategoriaDao;

    public function __construct()
    {
        $this->CategoriaDao =  new CategoriaDao();
    }

    public function get_consultar()
    {
        $dados = $this->CategoriaDao->consultarTab();
        $json = json_encode($dados);
        header('Content-Type: application/json');
        echo $json;
    }


    public function post_cadastrarCategoria()
    {
        $dados = json_decode(file_get_contents('php://input'), true);
        $this->CategoriaDao->cadastrarCategoria($dados);
    }

    public function post_alterarCategoria()
    {
        $dados = json_decode(file_get_contents('php://input'), true);
        var_dump($dados);
    }
}
