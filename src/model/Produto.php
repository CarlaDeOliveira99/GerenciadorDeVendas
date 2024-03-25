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
            $this->cadastrar($dados);
            echo "ok";
        }
    }

    public function cadastrar($dados){
        $cod_barra = $dados['codigoDeBarraProduto'];
        $descricao = $dados['descricaoCompleta'];
        $nome = $dados['nomeDoPorduto'];
        $valor = $dados['precoProduto'];
        $desconto = $dados['valorDesconto'];
        $frete = $dados['frete'];
        $id_categoria = $dados['selectCategoria'];
        $previaDescricao =$dados['previaDescricao'];


        $sql= 'INSERT INTO produto(cod_barra,nome,descricao,valor,desconto,frete,id_categoria,descricaoPrevia) VALUES(:cod_barra,:nome,:descricao,:valor,:desconto,:frete,:id_categoria,:descricaoPrevia)';

        $statement = $this->conexao->prepare($sql);

        $statement->execute([
            ':cod_barra' => $cod_barra,
            ':nome' => $nome,
            ':descricao' => $descricao,
            ':valor' => $valor,
            ':desconto' => $desconto,
            ':frete' => $frete,
            ':id_categoria' => $id_categoria,
            ':descricaoPrevia' => $previaDescricao,
        ]);
    }
}


/*
$sql = 'INSERT INTO categoria(nome) VALUES(:nome)';

$statement = $this->conexao->prepare($sql);

$statement->execute([
    ':nome' => $dados
]);

*/