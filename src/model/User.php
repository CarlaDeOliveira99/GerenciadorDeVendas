<?php

namespace src\model;

use src\model\UserDao;

class User
{

	private $nome;
	private $cpf;
	private $senha;
	private $cliente;
	private $dao;

	public function __constructor()
	{

		$this->dao = new UserDao();
	}


	public function validarLogin($nomeUser, $senhaUser)
	{
		$this->nome = strtolower($nomeUser);
		$this->senha = strtolower($senhaUser);

		#$userDao = new UserDao();
		$result = $this->dao->validarCadastro($this->nome, $this->senha);

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

	public function getCliente()
	{
		return $this->cliente;
	}

	public function setCliente($value)
	{
		$this->cliente = $value;
	}
}
