<?php

namespace src\controller;

use src\model\Categoria;

class ControllerCategoria
{

    private $categoria;

    public function __construct()
    {
        $this->categoria =  new Categoria();
    }

    public function get_consultar()
    {
        $dados = $this->categoria->consultarTab();
        $json = json_encode($dados);
        header('Content-Type: application/json');
        echo $json;
    }

    public function post_cadastrarCategoria()
    {
        $dados = json_decode(file_get_contents('php://input'), true);
        $this->categoria->cadastrarCategoria($dados);
    }

    
    public function post_alterarCategoria()
    {
        $dados = json_decode(file_get_contents('php://input'), true);
        $this->categoria->alterarCategoria($dados);
    }

    public function get_campoAlterarIndormacoes()
    {
        $id = $_GET['id'];

        $informacoesCampo = $this->categoria->informacaoDoCampoAlterar($id);

        $json = json_encode($informacoesCampo);
        header('Content-Type: application/json');
        echo $json;
    }

    public function get_excluir()
    {
        $id = $_GET['idDeletar'];
        $this->categoria->excluirDados($id);
    }

    public function get_verificarTabela() {
        $this->categoria->verificarTabela();
      }
}
