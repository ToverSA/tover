<?php
/**
 *
 */
class Admin{
  private $con;
  private $id;
  function __construct($username = -1, $password = ''){
    session_start();
    if ($username != -1){
      session_unset();
    }
    if (isset($_SESSION['id'])){
      $this->id = $_SESSION['id'];
    } else {
      $this->con = new mysqli(HOST, USER, PWD, DB);
      $stmt = $this->con->prepare("SELECT id, hash FROM admin_users WHERE username=?");
      $stmt->bind_param('s', $username);
      $stmt->execute();
      $stmt->bind_result($id, $h);
      if ($stmt->fetch()){
        if (password_verify($password, $h)){
          $_SESSION['id'] = $id;
          $_SESSION['username'] = $username;
        } else {
          header('HTTP/1.0 403 Forbidden');
        }
      } else if (strcmp($username, "superuser") == 0){
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt->prepare("INSERT INTO admin_users (username, hash) VALUES (?, ?)");
        $stmt->bind_param('ss', $username, $hash);
        $stmt->execute();
        if ($stmt->affected_rows > 0){
          $_SESSION['id'] = $stmt->insert_id;
          $_SESSION['username'] = $username;
          header('HTTP/1.0 201 Created');
        } else {
          header('HTTP/1.0 500 Internal Server Error');
        }
      } else {
        header('HTTP/1.0 404 Not Found');
      }
      $stmt->close();
    }
  }
  public function addCampus(){
    if (isset($_SESSION['id'])){
      if (isset($_REQUEST['institution']) && isset($_REQUEST['campus'])){
        $c = new Campus($_REQUEST['institution'], $_REQUEST['campus']);
        if ($c->status == 0){
          echo $c->jsonEncoded();
        } else {
          header('HTTP/1.0 500 Internal Server Error');
        }
      }
    }
  }
  public function getCampuses(){
    $c = new Insties();
    echo json_encode($c->insties);
  }
  public function isAuth(){
    if (isset($_SESSION['id'])){
      echo json_encode($_SESSION);
    }
  }
}

?>
