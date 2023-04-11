<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type');

  include_once '../../config/Database.php';
  include_once '../../models/Product.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog post object
  $product = new Product($db);

  // Get raw posted data
  $data = json_decode(file_get_contents("php://input"));

  $product->sku = $data->sku;
  $product->name = $data->name;
  $product->price = $data->price;
  $product->attribute = $data->attribute;
  $product->type = $data->type;

  // Create post
  if($product->create()) {
    echo json_encode(
      array('message' => 'Post Created')
    );
  } else {
    echo json_encode(
      array('message' => 'Post Not Created')
    );
  }