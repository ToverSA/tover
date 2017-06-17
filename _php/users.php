<?php
/**
 * Users class. from authentication to creation of users in
 * the platform.
 */
class Users{
  //TODO Send email verification
  public static function postNewUser(){
    $con = new mysqli(HOST, USER, PWD, DB);
    $query = 'INSERT INTO login (email, password, token) VALUES (?, ?, ?)';
    $stmt = $con->prepare($query);
    $token = hash('sha256', $_POST['email']);
    $pwd = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $stmt->bind_param('sss', $_POST['email'], $pwd, $token);
    $stmt->execute();
    $id = $stmt->insert_id;
    $stmt->close();
    if ($id > 0){
      $query = 'INSERT INTO users (id, campus_id, name, number, date_created)' .
      'VALUES (?, ?, ?, ?, ?)';
      $stmt = $con->prepare($query);
      $d = new DateTime();
      $date = $d->format('Y-m-d h:i:s');
      $stmt->bind_param('iisss', $id, $_POST['campusId'], $_POST['dName'],
      $_POST['number'], $date);
      $stmt->execute();
      if ($stmt->insert_id > 0){
        header('HTTP/1.0 201 Created');
      }
    } else {
      header('HTTP/1.0 400 Bad request');
    }
  }
  public static function postAuthUser(){
    $con = new mysqli(HOST, USER, PWD, DB);
    $query = 'SELECT * FROM login WHERE email=?';
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $_POST['email']);
    $stmt->execute();
    $stmt->bind_result($id, $email, $hash, $token);
    if ($stmt->fetch()){
      if (password_verify($_POST['password'], $hash)){
        echo json_encode(array('id' => $id, 'token' => $token));
      } else {
        header('HTTP/1.0 400 Bad request');
      }
    } else {
      header('HTTP/1.0 400 Bad request');
    }
  }
}

?>
