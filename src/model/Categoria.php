<?php

namespace src\model;

use estrutura\ConexaoBd;

class Categoria
{

    private $conexao;

    public function __construct()
    {
        $this->conexao =  ConexaoBd::conecta();
    }

    public function consultarTab()
    {
        $sql = 'SELECT * FROM categoria';


        if (isset($_GET['search'])) {
            $infor = $_GET['search'];
            $sql = $this->search($infor, $sql);
        }

        $totalRegistros = $this->totalDeRegistro($sql);

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


    public function totalDeRegistro($sql)
    {
        $sqlCount = str_replace('*', 'COUNT(*) as total', $sql);
        $statementCount = $this->conexao->query($sqlCount);
        $totalRegistros = $statementCount->fetch();

        return $totalRegistros;
    }

    public function search($infor, $sql)
    {
        return $sql .= " where nome ilike '%{$infor}%'";
    }

    public function paginacaoOfffset($offset, $sql)
    {
        return   $sql .= " offset " . $offset;
    }

    public function paginacaoLimit($limit, $sql)
    {
        return $sql .= " limit " . $limit;
    }

    public function cadastrarCategoria($dados)
    {
        $sql = 'INSERT INTO categoria(nome) VALUES(:nome)';

        $statement = $this->conexao->prepare($sql);

        $statement->execute([
            ':nome' => $dados
        ]);
    }

    public function alterarCategoria($dados)
    {
        $id = $dados['id'];
        $txtCampo = $dados['txtCampo'];

        $publisher = [
            'id_categoria' => $id,
            'nome' => $txtCampo,
        ];

        $sql = 'UPDATE categoria
        SET nome = :nome
        WHERE id_categoria = :id_categoria';

        $statement = $this->conexao->prepare($sql);



        $statement->bindParam(':publisher_id', $publisher['id_categoria']);
        $statement->bindParam(':nome', $publisher['nome']);

        $statement->execute();
    }
}
