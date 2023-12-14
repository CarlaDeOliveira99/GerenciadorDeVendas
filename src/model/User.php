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
	private $dao;

	public function __constructor()
	{

		$this->dao = new UserDao();
	}


	public function validarLogin($emailUser, $senhaUser)
	{
		$this->email = strtolower($emailUser);
		$this->senha = strtolower($senhaUser);

		#$userDao = new UserDao();
		$result = $this->dao->validarCadastro($this->email, $this->senha);

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

	public function getEmail() {
		return $this->email;
	}

	public function setEmail($value) {
		$this->email = $value;
	}
}