<?php

namespace src\model;

use estrutura\ConexaoBd;
use PDO;

class Produto
{
    private $conexao;

    public function __construct()
    {
        $this->conexao =  ConexaoBd::conecta();
    }

    public function validarCampo($dados)
    {
        if ($dados['nomeDoPorduto'] == "" || $dados['codigoDeBarraProduto'] == "" || $dados['precoProduto'] == "" || $dados['selectCategoria'] == 0 ) {
            echo "erro dados";
        } else {
            $resposta =  $this->cadastrar($dados);
            echo $resposta;
        }
    }

    public function cadastrar($dados)
    {
        $cod_barra = intval($dados['codigoDeBarraProduto']);
        $nome = $dados['nomeDoPorduto'];
        $descricao = $dados['descricaoCompleta'];
        $previaDescricao = $dados['previaDescricao'];
        $valor = floatval($dados['precoProduto']);
        $desconto = floatval($dados['desconto']);
        $frete = $dados['frete'];
        $id_categoria = intval($dados['selectCategoria']);


        $sql = 'INSERT INTO produto(cod_barra,nome, descricaoCompleta, previaDescricao, valor,desconto, frete, id_categoria) 
                VALUES(:cod_barra,:nome,:descricaoCompleta,:previaDescricao,:valor,:desconto,:frete,:id_categoria)';

        //id_produto, cod_barra, nome, descricaoCompleta, previadescricao, valor, desconto, frete, id_categoria
        $statement = $this->conexao->prepare($sql);

        $oExcutadoSucesso = false;

        if ($statement->execute([
            ':cod_barra' => $cod_barra,
            ':nome' => $nome,
            ':descricaoCompleta' => $descricao,
            ':previaDescricao' => $previaDescricao,
            ':valor' => $valor,
            ':desconto' => $desconto,
            ':frete' => $frete,
            ':id_categoria' => $id_categoria,
        ])) {
            echo $oExcutadoSucesso = true;
        } else {
            echo $oExcutadoSucesso;
        };
    }

    public function consultarTabela()
    {
        $sql = 'SELECT produto.id_produto,  produto.nome, produto.cod_barra, produto.descricaoCompleta, produto.previaDescricao, produto.valor, produto.desconto, produto.frete, categoria.nome AS nome_categoria 
        FROM produto
        LEFT JOIN categoria 
        ON produto.id_categoria = categoria.id_categoria';

        if (isset($_GET['search'])) {
            $infor = $_GET['search'];
            $sql = $this->search($infor, $sql);
        }

        $totalRegistros = $this->totalDeRegistro();

        $sql .= ' ORDER BY id_produto ASC';

        if (isset($_GET['offset'])) {
            $offset = $_GET['offset'];
            $sql = $this->paginacaoOfffset($offset, $sql);
        }

        if (isset($_GET['limit'])) {
            $limit = $_GET['limit'];
            $sql = $this->paginacaoLimit($limit, $sql);
        }


        $stmt = $this->conexao->prepare($sql);
        $stmt->execute();
        $dados = $stmt->fetchAll();
        $json = ['dados' => $dados, 'totalRegistros' => $totalRegistros['total']];
        return $json;
    }

    public function search($infor, $sql)
    {
        return $sql .= " where nome ilike '%{$infor}%'";
    }

    public function totalDeRegistro()
    {
        $sql = 'SELECT * FROM produto';
        $sqlCount = str_replace('*', 'COUNT(*) as total', $sql);
        $statementCount = $this->conexao->query($sqlCount);
        $totalRegistros = $statementCount->fetch();

        return $totalRegistros;
    }

    public function paginacaoOfffset($offset, $sql)
    {
        return   $sql .= " offset " . $offset;
    }

    public function paginacaoLimit($limit, $sql)
    {
        return $sql .= " limit " . $limit;
    }



    public function alterarProduto($informacoes)
    {
        $dadosDosCampos = $informacoes['dados'];
        $id_produtoString = $informacoes['id_produto'];

        $publisher = [
            'id_produto' => intval($id_produtoString),
            'codigoDeBarraProduto' =>intval($dadosDosCampos['codigoDeBarraProduto']),
            'nomeDoPorduto' =>  $dadosDosCampos['nomeDoPorduto'],
            'descricaoCompleta' =>  $dadosDosCampos['descricaoCompleta'],
            'precoProduto' => floatval($dadosDosCampos['precoProduto']),
            'desconto' => floatval($dadosDosCampos['desconto']),
            'frete' =>  $dadosDosCampos['frete'],
            'selectCategoria' => intval($dadosDosCampos['selectCategoria']),
            'previaDescricao' =>  $dadosDosCampos['previaDescricao'],
        ];

        $sql = 'UPDATE produto
        SET cod_barra = :cod_barra,
        nome = :nome, 
        descricaoCompleta = :descricaoCompleta, 
        valor = :valor,
        desconto = :desconto,
        frete =:frete,
        id_categoria =:id_categoria,
        previaDescricao = :previaDescricao
        WHERE id_produto = :id';

        $statement = $this->conexao->prepare($sql);

        $statement->bindParam(':id', $publisher['id_produto']);
        $statement->bindParam(':cod_barra', $publisher['codigoDeBarraProduto']);
        $statement->bindParam(':nome', $publisher['nomeDoPorduto']);
        $statement->bindParam(':descricaoCompleta', $publisher['descricaoCompleta']);
        $statement->bindParam(':valor', $publisher['precoProduto']);
        $statement->bindParam(':desconto', $publisher['desconto']);
        $statement->bindParam(':frete', $publisher['frete']);
        $statement->bindParam(':id_categoria', $publisher['selectCategoria']);
        $statement->bindParam(':previaDescricao', $publisher['previaDescricao']);

        $statement->execute();
    }

    public function informacaoDoCampoAlterar($id)
    {
        $sql = "SELECT * FROM produto WHERE id_produto = :id ";
        $stmt = $this->conexao->prepare(($sql));
        $stmt->bindValue(":id", $id);
        $stmt->execute();
        $dados = $stmt->fetchAll();
        return $dados;
    }

    public function excluirDados($id)
    {
        $sql = 'DELETE FROM produto WHERE id_produto = :id';
        $statement = $this->conexao->prepare($sql);
        $statement->bindParam(':id', $id, PDO::PARAM_INT);

        if ($this->excluirImgBD($id)) {
            if ($statement->execute()) {
                $this->verificarTabela();
                echo "true";
            } else {
                echo "false";
            }
        } else {
            echo "false";
        }
    }

    public function excluirImgBD($id)
    {
        $this->excluirImgDaPasta($id);

        $sql = 'DELETE FROM imagemproduto WHERE id_produto = :id';
        $statement = $this->conexao->prepare($sql);
        $statement->bindParam(':id', $id, PDO::PARAM_INT);

        if ($statement->execute()) {
            return true;
        }
    }

    public function excluirImgDaPasta($id)
    {

        $sql = "SELECT caminho_imagem_prod, caminho_imagem_absoluto FROM imagemproduto WHERE id_produto = :id ";
        $stmt = $this->conexao->prepare(($sql));
        $stmt->bindValue(":id", $id);
        $stmt->execute();
        $dados = $stmt->fetchAll();

        if (sizeof($dados) > 0) {
            foreach ($dados as $key) {
                unlink($key["caminho_imagem_absoluto"]);
            }
        }
    }


    public function verificarTabela()
    {
        $sql = 'SELECT id_produto FROM produto';
        $stmt = $this->conexao->prepare($sql);
        $stmt->execute();
        $dados = $stmt->fetchAll();

        if (sizeof($dados) < 1) {
            $sql = 'ALTER SEQUENCE id_produto
            RESTART WITH 1';
            $stmt = $this->conexao->prepare($sql);
            $stmt->execute();

            $sql = 'ALTER SEQUENCE id_imagem
            RESTART WITH 1';
            $stmt = $this->conexao->prepare($sql);
            $stmt->execute();
        }
    }


    public function salvarImgNasPastas($arquivo, $idProduto)
    {

        $boolean = true;

        foreach ($arquivo as $item) {
            $nomeArquivo = $item["name"];
            $diretorio = "/var/www/html/upload/imagens_e_gifs/" . $idProduto . " " . $nomeArquivo;

            if (move_uploaded_file($item['tmp_name'], $diretorio)) {

                $diretorioRelativo = "../../../upload/imagens_e_gifs/". $idProduto . " " . $nomeArquivo;

                $sql = "INSERT INTO imagemproduto(id_produto,caminho_imagem_prod,caminho_imagem_absoluto) VALUES(:id_produto,:caminho_imagem_prod,:caminho_imagem_absoluto)";

                $statement = $this->conexao->prepare($sql);

               if($statement->execute([
                ':id_produto' => $idProduto,
                ':caminho_imagem_prod' => $diretorioRelativo,
                ':caminho_imagem_absoluto' => $diretorio

            ])) {
                $boolean = true;
            }
            } 
        }

        return $boolean;
    }


    public function consultarImg($id)
    {
        $sql = "SELECT caminho_imagem_prod FROM imagemproduto WHERE id_produto = :id ";
        $stmt = $this->conexao->prepare(($sql));
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
        $dadosImg = $stmt->fetchAll();

        return  $dadosImg;
    }


    public function statusImg(){
        $sql = "select distinct img.id_produto
        from imagemproduto img
        left join produto pro
        on img.id_produto = pro.id_produto";
        $stmt = $this->conexao->prepare(($sql));
        $stmt->execute();
        $dadosImg = $stmt->fetchAll();

        return  $dadosImg;
    }
}

