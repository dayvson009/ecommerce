<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Caminho do arquivo JSON
$jsonFile = 'clientes.json';

// Carrega o JSON existente
$jsonData = file_get_contents($jsonFile);
$clientes = json_decode($jsonData, true);

// Obtém os dados enviados pelo JavaScript
$data = json_decode(file_get_contents("php://input"), true);
$clienteNome = $data['cliente'];
$activity = $data['activity'];

$exist = 0;

// Encontra o cliente e adiciona a mensagem
foreach ($clientes as &$cliente) {
    if ($cliente['cliente'] === $clienteNome AND strlen($clienteNome) > 0) {
        $cliente['activity'][] = $activity;
        $exist = 1;
        break;
    }
}
echo json_encode(strlen($clienteNome));
echo json_encode($exist);
if($exist == 0 AND strlen($clienteNome) > 0){
    $data['activity'] = [$activity];
    $clientes[] = $data;
}


// Salva o JSON atualizado de volta no arquivo
file_put_contents($jsonFile, json_encode($clientes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

echo json_encode(["status" => "success"]);
?>
