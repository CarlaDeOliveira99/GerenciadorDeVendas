<?php

namespace src\controller;

use src\model\Categoria;
use src\model\CategoriaDao;

class ControllerCategoria
{

    private $Categoria;
    private $CategoriaDao;

    public function __construct()
    {
        $this->Categoria =  new Categoria();
        $this->CategoriaDao =  new CategoriaDao();
    }


    public function get_consultar()
    {
        $dados = $this->CategoriaDao->consultarTab();
        return $dados;
    }
}
