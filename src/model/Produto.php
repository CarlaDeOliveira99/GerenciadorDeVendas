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

    public function cadastrar($dados)
    {
        $cod_barra = $dados['codigoDeBarraProduto'];
        $descricao = $dados['descricaoCompleta'];
        $nome = $dados['nomeDoPorduto'];
        $valor = $dados['precoProduto'];
        $desconto = $dados['desconto'];
        $frete = $dados['frete'];
        $id_categoria = $dados['selectCategoria'];
        $previaDescricao = $dados['previaDescricao'];


        $sql = 'INSERT INTO produto(cod_barra,nome,descricao,valor,desconto,frete,id_categoria,descricaoPrevia) VALUES(:cod_barra,:nome,:descricao,:valor,:desconto,:frete,:id_categoria,:descricaoPrevia)';

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


    public function consultarTabela()
    {
        $sql = 'SELECT * FROM produto';

        if (isset($_GET['search'])) {
            $infor = $_GET['search'];
            $sql = $this->search($infor, $sql);
        }

        $totalRegistros = $this->totalDeRegistro($sql);

        $sql .= ' ORDER BY id_produto ASC';

        if (isset($_GET['offset'])) {
            $offset = $_GET['offset'];
            $sql = $this->paginacaoOfffset($offset, $sql);
        }

        if (isset($_GET['limit'])) {
            $limit = $_GET['limit'];
            $sql = $this->paginacaoLimit($limit, $sql);
        }


        $stmt = $this->conexao->prepare($sql);
        $stmt->execute();
        $dados = $stmt->fetchAll();
        $json = ['dados' => $dados, 'totalRegistros' => $totalRegistros['total']];
        return $json;
    }

    public function search($infor, $sql)
    {
        return $sql .= " where nome ilike '%{$infor}%'";
    }

    public function totalDeRegistro($sql)
    {
        $sqlCount = str_replace('*', 'COUNT(*) as total', $sql);
        $statementCount = $this->conexao->query($sqlCount);
        $totalRegistros = $statementCount->fetch();

        return $totalRegistros;
    }

    public function paginacaoOfffset($offset, $sql)
    {
        return   $sql .= " offset " . $offset;
    }

    public function paginacaoLimit($limit, $sql)
    {
        return $sql .= " limit " . $limit;
    }



    public function alterarProduto($informacoes)
    {
        $dadosDosCampos = $informacoes['dados'];
        $id_produtoString = $informacoes['id_produto'];

        $publisher = [
            'id_produto' =>  $id_produtoString,
            'codigoDeBarraProduto' => $dadosDosCampos['codigoDeBarraProduto'],
            'nomeDoPorduto' =>  $dadosDosCampos['nomeDoPorduto'],
            'descricaoCompleta' =>  $dadosDosCampos['descricaoCompleta'],
            'precoProduto' => $dadosDosCampos['precoProduto'],
            'desconto' => $dadosDosCampos['desconto'],
            'frete' =>  $dadosDosCampos['frete'],
            'selectCategoria' => $dadosDosCampos['selectCategoria'],
            'previaDescricao' =>  $dadosDosCampos['previaDescricao'],
        ];

        $sql = 'UPDATE produto
        SET cod_barra = :cod_barra,
        nome = :nome, 
        descricao = :descricao, 
        valor = :valor,
        desconto = :desconto,
        frete =:frete,
        id_categoria =:id_categoria,
        descricaoPrevia = :descricaoPrevia
        WHERE id_produto = :id';

        $statement = $this->conexao->prepare($sql);

        $statement->bindParam(':id', $publisher['id_produto'], PDO::PARAM_INT);
        $statement->bindParam(':cod_barra', $publisher['codigoDeBarraProduto'], PDO::PARAM_INT);
        $statement->bindParam(':nome', $publisher['nomeDoPorduto']);
        $statement->bindParam(':descricao', $publisher['descricaoCompleta']);
        $statement->bindParam(':valor', $publisher['precoProduto'], PDO::PARAM_INT);
        $statement->bindParam(':desconto', $publisher['desconto'], PDO::PARAM_INT);
        $statement->bindParam(':frete', $publisher['frete'], PDO::PARAM_INT);
        $statement->bindParam(':id_categoria', $publisher['selectCategoria'], PDO::PARAM_INT);
        $statement->bindParam(':descricaoPrevia', $publisher['previaDescricao']);

        $statement->execute();
    }

    public function informacaoDoCampoAlterar($id)
    {
        $sql = "SELECT * FROM produto WHERE id_produto = :id ";
        $stmt = $this->conexao->prepare(($sql));
        $stmt->bindValue(":id", $id);
        $stmt->execute();
        $dados = $stmt->fetchAll();
        return $dados;
    }

    public function excluirDados($id)
    {
        $sql = 'DELETE FROM produto WHERE id_produto = :id';
        $statement = $this->conexao->prepare($sql);
        $statement->bindParam(':id', $id, PDO::PARAM_INT);

        $statement->execute();
    }
}
