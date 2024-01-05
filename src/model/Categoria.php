<?php

namespace src\model;

use src\model\CategoriaDao;

class Categoria
{

	private $nome;
	private $id;
	private $categoriaDao;



	public function __construct()
	{
		$this->categoriaDao = new CategoriaDao();
	}

	

	public function getNome()
	{
		return $this->nome;
	}

	public function setNome($value)
	{
		$this->nome = $value;
	}

	public function getId()
	{
		return $this->id;
	}

	public function setId($value)
	{
		$this->id = $value;
	}
}
