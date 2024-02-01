<?php

namespace src\model;

use src\model\UserDao;

class User
{

	const GESTOR_SIM = 1;
	const GESTOR_NAO = 0;

	private $nome;
	private $email;
	private $cpf;
	private $senha;
	private $gestor;


	public function validarLogin($emailUser, $senhaUser)
	{
		$this->email = $emailUser;
		$this->senha = $senhaUser;

		$dao = new UserDao();

		$result = $dao->validarCadastro($this->email, $this->senha);

		return $result;
	}

	public function userLogado($cpf)
	{
		$this->cpf = $cpf;
		$dao = new UserDao();
		$result = $dao->verificarUser($this->cpf);
		return $result;
	}

}
