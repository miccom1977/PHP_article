<?php
    include_once './config/connect.php';
    include_once './classes/Article.php';
    include_once './classes/Helper.php';
    $connect = new Connect();
    $db = $connect->getConnection();
    $helper = new Helper();
    $article = new Article($db);

    $article->id          = $helper->checkInput($_POST['id']);    
    $article->title       = $helper->checkInput($_POST['title']);
    $article->description = $helper->checkInput($_POST['description']);
    $article->status      = $helper->checkInput($_POST['status']);
    $error = 0;
    $errorTXT = '';
    if(!is_numeric($article->status)){
        $error = 1;
        $errorTXT .= '<Strong>Status</Strong> must be number<br>';
    }
    if(empty($article->title)){
        $error = 1;
        $errorTXT .= 'You must enter a <Strong>title</Strong> for the article<br>';
    }
    if(empty($article->description)){
        $error = 1;
        $errorTXT .= 'You must enter a <strong>description</strong> for the article<br>';
    }

    if( $error == 0 ){
        if($article->updateArticle()){
            $data['info'] = 'Article saved.';
        } else{
            $data['error'] = 'Article not saved :(<br>'. $errorTXT;
        }
    }

    echo json_encode($data);
    
?>