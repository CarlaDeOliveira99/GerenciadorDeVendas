<?php 

namespace src\model;

class User{

    private $nome;
    private $cpf;
    private $senha;
    private $cliente;

    public function __constructor($nome, $cpf, $senha, $cliente) {

		$this->nome = $nome;
		$this->cpf = $cpf;
		$this->senha = $senha;
		$this->cliente = $cliente;
	}


	public function getNome() {
		return $this->nome;
	}

	public function setNome($value) {
		$this->nome = $value;
	}

	public function getCpf() {
		return $this->cpf;
	}

	public function setCpf($value) {
		$this->cpf = $value;
	}

	public function getSenha() {
		return $this->senha;
	}

	public function setSenha($value) {
		$this->senha = $value;
	}

	public function getCliente() {
		return $this->cliente;
	}

	public function setCliente($value) {
		$this->cliente = $value;
	}

}