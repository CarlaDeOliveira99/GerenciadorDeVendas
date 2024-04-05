<?php

namespace estrutura;

class session
{

    public function criaSession($dadosUsuario)
    {
        $this->sessionStart();
        $_SESSION["cpf"] = $dadosUsuario["cpf"];
        $_SESSION["nome"] = $dadosUsuario["nome"];
        $_SESSION["email"] = $dadosUsuario["email"];
        $_SESSION["gestor"] = $dadosUsuario["gestor"];
    }

    private function sessionStart()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }


    public function userLogado()
    {
        $this->sessionStart();

        # requisição sem dados na session
        if (!isset($_SESSION["cpf"])) {
            # adicionar validação da data se ela expirou
            # adicionar validação da data se ela expirou
            # adicionar validação da data se ela expirou
            # adicionar validação da data se ela expirou
            # adicionar validação da data se ela expirou

            session_destroy();
            $respostaTex = ["login.html"];
            //    echo json_encode(['erro' => 'login']);  
            $respostaJson = json_encode($respostaTex);
            echo $respostaJson;
            die();
        }
    }


    public function encerrarSession()
    {
        $this->sessionStart();
        session_destroy();
    }
}
