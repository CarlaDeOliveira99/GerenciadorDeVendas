<?php

namespace estrutura;

class session
{


    public function sessionStart()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }

    public function valoresSession($cpf)
    {
        $this->sessionStart();
        $_SESSION["cpf"] = $cpf;
    }

    public function userLogado()
    {
        $this->sessionStart();

        if (session_status() == PHP_SESSION_ACTIVE) {
            return $_SESSION["cpf"];
        }
    }

    public function  encerrarSession()
    {
        $this->sessionStart();
        if (session_status() == PHP_SESSION_ACTIVE) {
            session_destroy();
        }
    }
}



 