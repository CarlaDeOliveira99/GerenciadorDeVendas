<?php

namespace src\controller;

use src\model\User;
use estrutura\session;

class ControllerUser
{

    private $user;
    private $Session;

    public function __construct()
    {
        $this->user =  new User();
        $this->Session =  new session();
    }

    public function post_validarUser()
    {
        $dados = json_decode(file_get_contents('php://input'), true);
        $email = $dados['email'];
        $senha = $dados['senha'];
        $resultado =  $this->user->validarLogin($email, $senha);


        if ($resultado) {
            $dadosUsuario = $resultado[0];
            $this->Session->criaSession($dadosUsuario);
            //valida o redirecionamento da pagina
            if ($dadosUsuario['gestor'] == User::GESTOR_SIM) {
                $respostaTex = ["gerenciadorDeVendas.html"];
            } else {
                $respostaTex = ["homePage.html"];
            }
        } else {
            $respostaTex = ["erro"];
        }
        $respostaJson = json_encode($respostaTex);
        echo $respostaJson;
    }


    public function get_userLogado()
    {
        $this->Session->userLogado();

        if ($_SESSION['gestor'] == User::GESTOR_SIM) {
            $respostaTex = "gerenciadorDeVendas.html";
        } else {
            $respostaTex = "homePage.html";
        }

        $respostaJson = json_encode(['pagina' => $respostaTex]);
        echo $respostaJson;
    }


    public function get_sairSession()
    {
        $this->Session->encerrarSession();

        $respostaTex = ["login.html"];
       
        $respostaJson = json_encode($respostaTex);
        echo $respostaJson;

    }
}
