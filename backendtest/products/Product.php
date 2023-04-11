<?php 
  class Product {
    // DB stuff
    private $conn;
    private $table = 'products';

    // Product Properties
    public $id;
    public $sku;
    public $name;
    public $price;
    public $attribute;
    public $type;
    public $created_at;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get Products
    public function read() {
      // Create query
      $query = 'SELECT  
                    p.id, 
                    p.sku,
                    p.name, 
                    p.price, 
                    p.attribute,
                    p.type
                FROM ' . $this->table . ' p
                ORDER BY
                    p.id DESC';
      
      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }

    // Create Product
    public function create() {
          // Create query
          $query = 'INSERT INTO ' . $this->table . ' SET sku = :sku, name = :name, price = :price, attribute = :attribute, type = :type';

          // Prepare statement
          $stmt = $this->conn->prepare($query);

          // Clean data
          $this->sku = htmlspecialchars(strip_tags($this->sku));
          $this->name = htmlspecialchars(strip_tags($this->name));
          $this->price = htmlspecialchars(strip_tags($this->price));
          $this->attribute = htmlspecialchars(strip_tags($this->attribute));
          $this->type = htmlspecialchars(strip_tags($this->type));

          // Bind data
          $stmt->bindParam(':sku', $this->sku);
          $stmt->bindParam(':name', $this->name);
          $stmt->bindParam(':price', $this->price);
          $stmt->bindParam(':attribute', $this->attribute);
          $stmt->bindParam(':type', $this->type);

          // Execute query
          if($stmt->execute()) {
            return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);

      return false;
    }


    // // Delete Post
    // public function delete() {
    //       // Create query
    //       $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';

    //       // Prepare statement
    //       $stmt = $this->conn->prepare($query);

    //       // Clean data
    //       $this->id = htmlspecialchars(strip_tags($this->id));

    //       // Bind data
    //       $stmt->bindParam(':id', $this->id);

    //       // Execute query
    //       if($stmt->execute()) {
    //         return true;
    //       }

    //       // Print error if something goes wrong
    //       printf("Error: %s.\n", $stmt->error);

    //       return false;
    // }
    
     // Delete multiple products
  public function deleteMultiple($ids) {
    // Create query
    $placeholders = rtrim(str_repeat('?, ', count($ids)), ', ');
    $query = 'DELETE FROM ' . $this->table . ' WHERE id IN (' . $placeholders . ')';

    // Prepare statement
    $stmt = $this->conn->prepare($query);

    // Bind data
    foreach ($ids as $i => $id) {
      $stmt->bindValue(($i + 1), $id);
    }

    // Execute query
    if($stmt->execute()) {
      return true;
    }

    // Print error if something goes wrong
    printf("Error: %s.\n", $stmt->error);

    return false;
  }
  }