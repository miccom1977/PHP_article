<?php
    include_once './config/connect.php';
    include_once './classes/Article.php';
    include_once './classes/Helper.php';
    $data = [];
   
    $connect = new Connect();
    $helper = new Helper();

    $db = $connect->getConnection();

    $article = new Article($db);
    $article->id = $helper->checkInput($_POST['id']);

    if($article->deleteArticle()){
        $data['info'] = "Article deleted.";
    } else{
        $data['error'] = "Article could not be deleted";
    }

    echo json_encode($data);
?>