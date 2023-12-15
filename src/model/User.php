<?php

namespace src\model;

use src\model\UserDao;

class User
{

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

	public function getNome()
	{
		return $this->nome;
	}

	public function setNome($value)
	{
		$this->nome = $value;
	}

	public function getCpf()
	{
		return $this->cpf;
	}

	public function setCpf($value)
	{
		$this->cpf = $value;
	}

	public function getSenha()
	{
		return $this->senha;
	}

	public function setSenha($value)
	{
		$this->senha = $value;
	}

	public function getGestor()
	{
		return $this->gestor;
	}

	public function setGestor($value)
	{
		$this->gestor = $value;
	}

	public function getEmail()
	{
		return $this->email;
	}

	public function setEmail($value)
	{
		$this->email = $value;
	}
}
