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


        if (count($resultado) > 0) {
            $this->Session->sessionStart();
            $this->Session->valoresSession($resultado[0]['cpf']);
            //valida o redirecionamento da pagina
            if ($resultado[0]['gestor'] == 1) {
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
        $cpf =  $this->Session->userLogado();
        if ($cpf != "") {
            $resultado =  $this->user->userLogado($cpf);

            if ($resultado[0]['gestor'] == 1) {
                $respostaTex = ["gerenciadorDeVendas.html"];
            } else {
                $respostaTex = ["homePage.html"];
            }
        } else {
            $respostaTex = ["login"];
        }

        $respostaJson = json_encode($respostaTex);
        echo $respostaJson;
    }
}
