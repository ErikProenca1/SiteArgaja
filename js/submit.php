<?php

if(isset($_POST['email']) && !empty($_POST['email']))

$nome = addslashes($_POST['name']);
$email = addslashes($_POST['email']);
$telefone = addslashes($_POST['company']);
$tipo = addslashes($_POST['website']);
$message = addslashes($_POST['message']);

    $destino = "holivaneto@gmail.com";
    $assunto = "Contato Argajá";

    $body= "Nome: ".$nome. "\r\n".
            "Email: ".$email. "\r\n".
            "Telefone: ".$telefone. "\r\n".
            "Tipo: ".$tipo. "\r\n".
            "Mensagem: ".$message. "\r\n".
            "\r\n".
            "Olá, obrigado pelo seu contato. Nossa equipe irá retornar o mais breve possível";


    $header = "From:holivaneto@gmail.com"."\r\n"."Reply-To:".$email."\r\n"
    ."X=Mailer:PHP/".phpversion();

    if (mail($destino, $assunto, $body, $header)){

    echo("Email enviado!");

}else {
    echo("Ops! Algo deu errado...");
}


?>