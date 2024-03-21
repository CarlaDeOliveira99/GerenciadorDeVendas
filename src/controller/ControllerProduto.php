<?php 
namespace src\controller;
use src\model\Produto;

class ControllerProduto{

    private $produto;

    public function __construct()
    {
        $this->produto =  new Produto();
    }

   

}


?>