<?php

namespace src\model;

use src\model\User;
use estrutura\ConexaoBd;

class UserDao
{
     private $conexao;

    public function __construct() {
        $this->conexao = ConexaoBd::conecta();
    }

    function validarCadastro($email, $senha)
    {
        $sql = "SELECT email, gestor FROM usuario WHERE email = :nome AND senha = :senha";
        $stmt = $this->conexao->prepare($sql);
        $stmt->bindValue(":nome", $email);
        $stmt->bindValue(":senha", $senha);
        $stmt->execute();


        $dados = $stmt->fetchAll();
        return $dados;
    }




    function cadastrar(): void
    {
    }

    function alterar(): void
    {
    }

    function deletar(): void
    {
    }
}
