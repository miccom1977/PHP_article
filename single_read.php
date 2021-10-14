<?php
    
    include_once './config/connect.php';
    include_once './classes/Article.php';
    $data = [];
    $connect = new Connect();
    $db = $connect->getConnection();

    $article = new Article($db);

    $article->id = isset($_GET['id']) ? $_GET['id'] : die();
  
    $article->getSingleArticle();

    if( $article->title != null){
        $data = $article;
    }else{
        $data['error'] = 'Article about id= '. $article->id.' not found.';
    }

    echo json_encode($data);
?>