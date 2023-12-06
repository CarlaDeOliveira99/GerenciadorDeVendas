<?php 
namespace estrutura\autoload;

spl_autoload_register(function ($class) {
    $diretorioBase = __DIR__.'/../';
    $caminhoArquivo = $diretorioBase .  $class . '.php';
    $caminhoArquivo =  str_replace('\\', '/', $caminhoArquivo);
    
    if (file_exists($caminhoArquivo)) {
      require $caminhoArquivo;
    }
  });
