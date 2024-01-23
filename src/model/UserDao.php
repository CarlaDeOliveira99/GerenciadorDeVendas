<?php

namespace src\model;

use src\model\User;
use estrutura\ConexaoBd;

class UserDao
{
    private $conexao;

    public function __construct()
    {
        $this->conexao = ConexaoBd::conecta();
    }

    function validarCadastro($email, $senha)
    {
        $sql = "SELECT email,nome,cpf, gestor FROM usuario WHERE email = :email AND senha = :senha";
        $stmt = $this->conexao->prepare($sql);
        $stmt->bindValue(":email", $email);
        $stmt->bindValue(":senha", $senha);
        $stmt->execute();


        $dados = $stmt->fetchAll();
        return $dados;
    }

    function verificarUser($cpf)
    {
        $sql = "SELECT  gestor FROM usuario WHERE cpf = :cpf";
        $stmt = $this->conexao->prepare($sql);
        $stmt->bindValue(":cpf", $cpf);
        $stmt->execute();

        $dados = $stmt->fetchAll();
        return $dados;
    }
}
