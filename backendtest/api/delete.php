<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: DELETE');
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


  // // Delete post
  // if($product->delete()) {
  //   echo json_encode(
  //     array('message' => 'Product Deleted')
  //   );
  // } else {
  //   echo json_encode(
  //     array('message' => 'Product Not Deleted')
  //   );
  // }

  // Delete products
// Check if ids array is present in the data
if (!isset($data->ids)) {
  echo json_encode(array('message' => 'No products specified for deletion'));
  exit;
}

// Set ids to delete
$ids = $data->ids;

// Delete products
if($product->deleteMultiple($ids)) {
  echo json_encode(
    array('message' => 'Products Deleted')
  );
} else {
  echo json_encode(
    array('message' => 'Products Not Deleted')
  );
}
