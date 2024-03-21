<?php

namespace src\model;

use estrutura\ConexaoBd;
use PDO;

class Produto
{

    private $conexao;

    public function __construct()
    {
        $this->conexao =  ConexaoBd::conecta();
    }

 
    
}
