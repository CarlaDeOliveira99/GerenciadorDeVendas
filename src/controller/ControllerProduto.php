<?php

namespace src\controller;

use src\model\Produto;

class ControllerProduto
{

    private $produto;

    public function __construct()
    {
        $this->produto =  new Produto();
    }

    public function post_validadarDados()
    {
        $dadosColetados = json_decode(file_get_contents('php://input'), true);

          $validadcao =  $this->produto->validarCampo($dadosColetados);
         
         echo $validadcao;
    }
}
