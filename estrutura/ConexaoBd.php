<?php 
namespace estrutura;

use PDO;

class ConexaoBd {

    const HOST= 'localhost';
    const DATABASE = 'teste';
    const USER = 'postgres';
    const PASSWORD = '1234';
    const PORT = '5432';

    public static function conecta() {
        $host = self::HOST;
        $port = self::PORT;
        $db = self::DATABASE;
        $dsn = "pgsql:host=$host;port=$port;dbname=$db;";
        
        $pdo = new PDO($dsn, self::USER, self::PASSWORD, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        return $pdo;
    }

}


?>