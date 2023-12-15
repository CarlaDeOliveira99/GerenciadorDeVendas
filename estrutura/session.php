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
            return$_SESSION["cpf"];
        }
        
    }

    public function  encerrarSession(){
        
        if (session_status() == PHP_SESSION_ACTIVE) {
            session_destroy();
        }
    }
}





class teste
{
    // Método para iniciar a sessão
    public function start()
    {
        // Verifica se a sessão já foi iniciada
        if (session_status() == PHP_SESSION_NONE) {
            // Inicia a sessão
            session_start();
        }
    }

    // Método para encerrar a sessão
    public function end()
    {
        // Verifica se a sessão foi iniciada
        if (session_status() == PHP_SESSION_ACTIVE) {
            // Encerra a sessão
            session_destroy();
        }
    }

    // Método para definir uma variável de sessão
    public function set($name, $value)
    {
        // Verifica se a sessão foi iniciada
        if (session_status() == PHP_SESSION_ACTIVE) {
            // Define a variável de sessão com o nome e o valor dados
            $_SESSION[$name] = $value;
        }
    }

    // Método para obter uma variável de sessão
    public function get($name)
    {
        // Verifica se a sessão foi iniciada
        if (session_status() == PHP_SESSION_ACTIVE) {
            // Verifica se a variável de sessão existe
            if (isset($_SESSION[$name])) {
                // Retorna o valor da variável de sessão
                return $_SESSION[$name];
            }
        }
        // Retorna null se a sessão não foi iniciada ou a variável de sessão não existe
        return null;
    }

    // Método para remover uma variável de sessão
    public function remove($name)
    {
        // Verifica se a sessão foi iniciada
        if (session_status() == PHP_SESSION_ACTIVE) {
            // Verifica se a variável de sessão existe
            if (isset($_SESSION[$name])) {
                // Remove a variável de sessão
                unset($_SESSION[$name]);
            }
        }
    }

    // Método para redirecionar o usuário para uma URL específica
    public function redirect($url)
    {
        // Verifica se a URL é válida
        if (filter_var($url, FILTER_VALIDATE_URL)) {
            // Envia o cabeçalho HTTP para redirecionar o usuário
            header("Location: $url");
            // Encerra a execução do script
            exit();
        }
    }
}
