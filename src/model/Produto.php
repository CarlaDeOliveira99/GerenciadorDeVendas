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

    public function validarCampo($dados)
    {
        if ($dados['nomeDoPorduto'] == "" || $dados['codigoDeBarraProduto'] == "" || $dados['precoProduto'] == "" || $dados['selectCategoria'] == 0 || $dados['previaDescricao'] == "" || $dados['descricaoCompleta'] == "") {
            echo "erro";
        } else {
            echo "ok";
        }
    }

    public function cadastrar(){
        
    }
}
