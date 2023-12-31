<?php

namespace src\model;

use src\model\Categoria;
use estrutura\ConexaoBd;

class CategoriaDao
{

    private $conexao;

    public function __construct()
    {
        $this->conexao =  ConexaoBd::conecta();
    }

    public function consultarTab()
    {

        $sql = 'SELECT * FROM categoria';
        $totalRegistros = $this->totalDeRegistro($sql);

        if (isset($_GET['search'])) {
            $infor = $_GET['search'];
            $sql = $this->search($infor, $sql);
        }
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
        $json = json_encode(['dados' => $dados, 'totalRegistros' => $totalRegistros['total']]);
        header('Content-Type: application/json');
        echo $json;
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
}
