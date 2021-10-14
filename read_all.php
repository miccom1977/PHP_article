<?php

include_once './config/connect.php';
include_once './classes/Article.php';
    $data = [];
    $connect = new Connect();
    $db = $connect->getConnection();

    $article = new Article($db);

    $stmt = $article->getArticles();
    $itemCount = $stmt->rowCount();
    $data['data'] = '
        <table  class="table table-dark table-striped text-center">
            <tr>
                <th scope="col">id</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
            </tr>';
    if($itemCount > 0){
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $data['data'] .= '<tr><th scope="row">'. $row['id'] .'</th><td>'. $row['title'] .'</td><td>'. $row['description'] .'</td><td><button class="editArticle btn btn-primary" var="'. $row['id'] .'">edit</button><button class="deleteArticle btn btn-danger ms-1" var="'. $row['id'] .'">delete</button></td></tr>';
        }
    }else{
        $data['data'] .= 'We dont have any articles.';
    }
    $data['data'] .='</table>';
    echo json_encode($data);