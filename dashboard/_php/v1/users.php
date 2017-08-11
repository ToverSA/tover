<?php
/**
 *
 */
class Users{
  private $con;
  private $access;
  private $request;
  private $recovery;
  function __construct(){
    $this->con = new mysqli(HOST, USER, PWD, DB);
  }
  public static function newUser(){
    $self = new self();
    if (count($_REQUEST) != 5 && !isset($_REQUEST['name']) && !isset($_REQUEST['email']) && !isset($_REQUEST['number']) && !isset($_REQUEST['campusId']) && !isset($_REQUEST['password'])){
      header('HTTP/1.0 400 Bad Request');
      echo json_encode($_REQUEST);
    }else{
      $stmt = $self->con->prepare('SELECT * FROM campuses WHERE id=?');
      $stmt->bind_param('i', $_REQUEST['campusId']);
      $stmt->execute();
      $stmt->bind_result($id, $instid, $name, $date);
      if ($stmt->fetch()){
        $hash = password_hash($_REQUEST['password'], PASSWORD_DEFAULT);
        $stmt->prepare('INSERT INTO users SET name=?, email=?, number=?, hash=?, campuses_id=?');
        $stmt->bind_param('ssssi', $_REQUEST['name'], $_REQUEST['email'], $_REQUEST['number'], $hash, $id);
        $stmt->execute();
        if ($stmt->affected_rows > 0){
          header('HTTP/1.0 201 Created');
          echo json_encode($_REQUEST);
        }else if ($stmt->errno == 1062){
          header('HTTP/1.0 409 Conflict');
          echo "Email '" . $_REQUEST['email'] . "' already in use";
        }else{
          header('HTTP/1.0 500 Internal Server Error');
          echo $stmt->error;
        }
      }
    }
  }
  public static function authUser(){
    $self = new self();
    if (count($_REQUEST) != 2 && !isset($_REQUEST['email'])){
      header('HTTP/1.0 400 Bad Request');
      echo json_encode($_REQUEST);
    }else{
      $stmt = $self->con->prepare('SELECT id, hash FROM users WHERE email=?');
      $stmt->bind_param('s', $_REQUEST['email']);
      $stmt->execute();
      $stmt->bind_result($id, $hash);
      if ($stmt->fetch() && password_verify($_REQUEST['password'], $hash)){
        $stmt->prepare('SELECT token FROM access_tokens WHERE users_id=?');
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $stmt->bind_result($token);
        if ($stmt->fetch()){
          $u = new stdClass;
          $u->id = $id;
          $u->token = $token;
          echo json_encode($u);
        }else if ($stmt->errno == 0){
          header('HTTP/1.0 401 Unauthorized');
          echo "User access token not found";
        }else{
          header('HTTP/1.0 500 Internal Server Error');
          print_r($stmt);
        }
      }else{
        header('HTTP/1.0 403 Forbidden');
        echo "Email or password incorrect. Consider creating a new account or click on 'forgot password'";
      }
    }
  }
  public static function verifyUser(){
    $self = new self();
    $stmt = $self->con->prepare('SELECT users.id, request_tokens.token FROM request_tokens JOIN users ON users.email=request_tokens.users_email WHERE request_tokens.users_email=?');
    // print_r($self->con);
    $stmt->bind_param('s', $_REQUEST['email']);
    $stmt->execute();
    $stmt->bind_result($id, $result);
    if ($stmt->fetch()){
      $token = base64_decode($_REQUEST['v_token']);
      if (strcmp($token, $result) == 0){
        $stmt->prepare('INSERT INTO access_tokens SET users_id=?, token=?');
        $stmt->bind_param('is', $id, $token);
        $stmt->execute();
        $stmt->close();
        header("Location: /account");
        die();
      }
    }
  }
  public static function sendVerificationUser(){
    $self = new self();
    $d = new DateTime();
    $token = hash('sha256', $d->format('Y-m-d h:i:s'));
    $stmt = $self->con->prepare('INSERT INTO request_tokens SET token=?, users_email=? ON DUPLICATE KEY UPDATE token=?');
    $stmt->bind_param('sss', $token, $_REQUEST['email'], $token);
    $stmt->execute();
    if ($stmt->affected_rows > 0){
      echo SITE_NAME . "/api.php/v1/users/verify/?" . http_build_query(array('email' => $_REQUEST['email'], 'v_token' => base64_encode($token)));
    }else{
      header('HTTP/1.0 500 Internal Server Error');
    }
  }
}

?>
