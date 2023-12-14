<?php

namespace src\model;

use src\model\User;
use estrutura\ConexaoBd;

class UserDao
{

    function validarCadastro($nome, $senha)
    {
        $conexao = ConexaoBd::conecta();

        $sql = "SELECT nome, gestor FROM usuario WHERE nome = :nome AND senha = :senha";
        $stmt = $conexao->prepare($sql);
        $stmt->bindValue(":nome", $nome);
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
