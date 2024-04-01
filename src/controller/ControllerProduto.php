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

        print_r( $validadcao );

        echo $validadcao;
    }

    public function get_consultar()
    {
        $dados = $this->produto->consultarTabela();
        $json = json_encode($dados);
        header('Content-Type: application/json');
        echo $json;
    }

    // preencher os campos para alterar as informações
    public function get_campoAlterarIndormacoes()
    {
        $id = $_GET['id'];
        $informacoesCampo = $this->produto->informacaoDoCampoAlterar($id);
        $json = json_encode($informacoesCampo);
        header('Content-Type: application/json');
        echo $json;
    }

    public function post_aletarDados()
    {
        $dadosColetados = json_decode(file_get_contents('php://input'), true);

        $dados = $this->produto->alterarProduto($dadosColetados);

        echo $dados;
    }

    public function get_excluir()
    {
        $id = $_GET['idDeletar'];
        $this->produto->excluirDados($id);
    }

    
    public function post_cadastrarImg()
    {

        #$nomeArquivo1 = $_FILES["1"]['files'];
        #$teste = $_POST['1'];

        var_dump($_FILES);
        

        #echo "resultado\n";
        #var_dump($nomeArquivo1);
        #var_dump($teste);
    }
}
