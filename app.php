<?php
    require_once('estrutura/autoload.php');
    require_once('estrutura/rotas.php');

   

    $verboHttp = strtolower($_SERVER['REQUEST_METHOD']);
    $metodo = $_GET['acao'] ;
    $classe = $ROTAS[$_GET['rota']];
    
    $metodoAjustado = $verboHttp.'_'.$metodo;
    $controller = new $classe();
    $controller->$metodoAjustado();




?>

