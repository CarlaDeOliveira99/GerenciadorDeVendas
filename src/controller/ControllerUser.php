<?php

namespace src\controller;

use src\model\User;

class ControllerUser
{
    public function post_validarUser()
    {
        $dados = json_decode(file_get_contents('php://input'), true);
        $email = $dados['email'];
        $senha = $dados['senha'];

        $user = new User();

        $resultado =  $user->validarLogin($email, $senha);

        if ($resultado) {
            session_start();
            $_SESSION['data_expirar'] = '14/12/2023';
        }


        // if (isset($_SESSION['data']) {
        //     if $_SESSION['data'] > 
        // }
        echo json_encode($resultado);
    }
}

