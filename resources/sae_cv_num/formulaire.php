<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
    header("Content-type: text/plain; charset=utf-8");

    if (isset($_GET["nom"]) && isset($_GET["adresseMail"]) && isset($_GET["prenom"]) && isset($_GET["message"])) {
        if ($_GET["nom"]!="" && $_GET["adresseMail"]!="" && $_GET["prenom"]!="" && $_GET["message"]) {
            echo ($_GET["nom"]."\n");
            echo ($_GET["prenom"]."\n");
            echo ($_GET["adresseMail"]."\n");
            echo ($_GET["message"]."\n");
        } else {
            header("Location:page1.html");
        }
    } else {
        header("Location:page1.html");
    }
?>
<?php
    require("vendor/autoload.php");                         // Ajoute et exécute le fichier
    $mail = new PHPMailer\PHPMailer\PHPMailer();

    // Configuration du serveur SMTP
    $mail->SMTPDebug = 1;                                   // Active/désactive les messages de mise au point
    $mail->isSMTP();                                        // Utilise le protocole SMTP
    $mail->Host = "smtp.gmail.com";                         // Configure le nom du serveur serveur SMTP
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS; // Active le cryptage sécurisé TLS
    $mail->Port = 465;                                      // Configure le numéro de port
    $mail->SMTPAuth = true;                                 // Active le mode authentification
    $mail->Username = "i2102191.iut@gmail.com";                 // Identifiant du compte SMTP
    $mail->Password = "Gmail.53";                           // Mot de passe du compte SMTP

    // Destinataires
    $mail->setFrom("i2102191.iut@gmail.com", $_GET["prenom"]." ".$_GET["nom"]." <".$_GET["adresseMail"].">");
    $mail->addAddress("i2102191.iut@gmail.com", "Margot de Villiers");

    // Contenu du mail
    $mail->isHTML(true);
    $mail->Subject = "Contact par CV numérique";
    $mail->Body = $_GET["message"];
    $mail->CharSet = PHPMailer\PHPMailer\PHPMailer::CHARSET_UTF8 ;
    if($mail->send() != false) {
        echo("Le message électronique a été transmis.\n");
    } else {
        echo("Le message électronique n'a pas été transmis.\n");
        echo("Mailer Error: " . $mail->ErrorInfo);
    }
?>