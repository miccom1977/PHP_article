<?php

class Article {
    
    private $conn;
    private $db_table = 'article';

    public $id;
    public $title;
    public $description;
    public $status;

    public function __construct($db){
        $this->conn = $db;
    }

    // get all articles

    public function getArticles(){
        $query = "SELECT * FROM " . $this->db_table . "";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Create
    public function createArticle(){
        $query = "INSERT INTO ". $this->db_table ." SET title = :title, description = :description, status = :status";
    
        $stmt = $this->conn->prepare($query);
    
        // sanitize

        $this->title       = $this->title;
        $this->description = $this->description;
        $this->status      = $this->status;

        // bind
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":status", $this->status);
        if($stmt->execute()){
            return true;
        }
        return false;
    }

    // Read
    public function getSingleArticle(){
        $query = "SELECT * FROM ". $this->db_table ." WHERE id = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if($data){
            $this->title       = $data['title'];
            $this->description = $data['description'];
            $this->status      = $data['status'];
        }
        
    }        

    // Update
    public function updateArticle(){
        $query = "UPDATE ". $this->db_table ." SET title = :title, description = :description, status = :status WHERE id = :id";
    
        $stmt = $this->conn->prepare($query);
    
        $this->title       = $this->title;
        $this->description = $this->description;
        $this->status      = $this->status;
        $this->id          = $this->id;
    
        // bind
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":id", $this->id);
    
        if($stmt->execute()){
           return true;
        }
        return false;
    }

    // DELETE
    function deleteArticle(){
        $query = "DELETE FROM " . $this->db_table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
    
        $this->id = $this->id;
        $stmt->bindParam(1, $this->id);
    
        if($stmt->execute()){
            return true;
        }
        return false;
    }

    
}