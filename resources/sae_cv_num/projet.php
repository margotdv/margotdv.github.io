<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
    header("Content-type: text/html; charset=utf-8");
?>
<!DOCTYPE html>
<html lang="fr">

    <head>
        <meta charset="UTF-8">
        <meta name="description"
            content="Galerie des différents projets réalisés par Margot de Villiers, réalisée dans le cadre des ses études en première année de BUT MMI à Laval">
        <link rel="shortcut icon" href="./images/favicon.png" type="image/x-icon" />
        <link rel="stylesheet" href="./css/style_galerie.css" type="text/css" />
        <link rel="stylesheet" href="./css/all.min.css" type="text/css" />
        <link href="https://fonts.googleapis.com/css2?family=Advent+Pro:wght@200&display=swap" rel="stylesheet">
        <title>Galerie des projets réalisés par Margot de Villiers</title>
    </head>

    <body>
        <header>
            <h1><a href="./index.html#accueil">CV Margot de Villiers</a></h1>
            <nav>
                <div>
                    <div><a href="./index.html#presentation">Présentation</a> | <a href="./index.html#competences">Compétences</a> | <a
                            href="./index.html#parcours">Parcours</a> | <a href="./index.html#galerie">Galerie</a> | <a href="./index.html#contact">Contact</a>
                    </div>
                </div>
            </nav>
        </header>

        <main>
            <a href="./index.html#galerie"><div class="boite-retour">
                <i class="fas fa-angle-double-left"></i>
                <span>Retour</span>
            </div></a>
            <div class="content">
<?php
        if (isset($_GET["name"])) {
            $lecteur = new SplFileObject("./private/galerie.txt",'r') ;
            while($lecteur->eof()==false) {
                $ligne = $lecteur->fgets() ;
                if ($ligne != "") {
                    $tab = explode(";",$ligne);
                    if ($tab[0]==$_GET["name"]) {
?>
            <div class="title">   
                <h2><?php echo($tab[1]); ?></h2>
            </div>
            <img src="<?php echo($tab[2]); ?>" alt="<?php echo($tab[3]); ?>"/>
            <p>
                <?php echo($tab[4]); ?>
            </p>
<?php
                        if ($tab[5] != "") {
                            if ($tab[0]==3) {
?>
            <a href="./images/galerie/charte_graphique.pdf"><img src="<?php echo($tab[5]); ?>" alt="<?php echo($tab[6]); ?>" class="charte"/></a>
<?php
                            } else {
?>
            <img src="<?php echo($tab[5]); ?>" alt="<?php echo($tab[6]); ?>" class="note-intention"/> 
<?php
                            }
                        }
?>
            <p>
                <?php echo("Pour la réalisation de ce projet datant du ".$tab[7].", j'ai utilisé ".$tab[8]); ?>
            </p>
<?php
                    }
                }
            }
        } else {
            header("Location: ./page1.html#galerie");
        }
        $lecteur = null;
?>
            </div>
        </main>
    </body>

</html>