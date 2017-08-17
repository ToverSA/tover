<?php
/**
 *
 */
class Users{
  private $con;
  private $id = 0;
  private $access;
  private $request;
  private $recovery;
  function __construct(){
    $this->con = new mysqli(HOST, USER, PWD, DB);
  }
  public function auth(){
    if (isset($_SERVER['HTTP_TOKEN'])){
      $query = 'SELECT users_id FROM access_tokens WHERE token=?';
      $stmt = $this->con->prepare($query);
      $stmt->bind_param('s', $_SERVER['HTTP_TOKEN']);
      $stmt->execute();
      $stmt->bind_result($uid);
      if ($stmt->fetch()){
        $this->id = $uid;
      } else {
        header('HTTP/1.0 403 Forbidden');
        echo "You are not authorized to make this request";
      }
    } else {
      header('HTTP/1.0 400 Bad Request');
      echo "Something isn't right...and I won't tell you what";
    }
  }
  public function getMessages(){
    if ($this->id != 0){
      Messages::getMessages($this->con, $this->id);
    }
  }
  public function postMessage(){
    if ($this->id != 0){
      Messages::postMessage($this->con, $this->id);
    }
  }
  public function putMessages(){
    if ($this->id != 0){
      Messages::putMessages($this->con);
    }
  }
  public function getAds(){
    if ($this->id != 0){
      Ads::getAccountAds($this->con, $this->id);
    }
  }
  public function getCredits(){
    if ($this->id != 0){
      Credits::getCredits($this->con, $this->id);
    }
  }
  public function postAd(){
    if ($this->id != 0){
      Ads::post($this->con, $this->id);
    }
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
  public static function recoverUser(){
    $self = new self();
    $d = new DateTime();
    $token = hash('sha256', $d->format('Y-m-d h:i:s'));
    $stmt = $self->con->prepare('INSERT INTO recovery_tokens SET token=?, users_email=? ON DUPLICATE KEY UPDATE token=?');
    $stmt->bind_param('sss', $token, $_REQUEST['email'], $token);
    $stmt->execute();
    if ($stmt->affected_rows > 0){
      echo SITE_NAME . "/recover.php/?" . http_build_query(array('email' => $_REQUEST['email'], 'r_token' => base64_encode($token)));
    }else{
      header('HTTP/1.0 500 Internal Server Error');
    }
  }
  public static function changePassword($token, $password){
    $self = new self();
    $stmt = $self->con->prepare('SELECT users.id FROM users JOIN recovery_tokens ON users.email=recovery_tokens.users_email WHERE recovery_tokens.token=?');
    $stmt->bind_param('s', $token);
    $stmt->execute();
    $stmt->bind_result($id);
    if ($stmt->fetch()){
      $hash = password_hash($password, PASSWORD_DEFAULT);
      $stmt->prepare('UPDATE users SET hash=?');
      $stmt->bind_param('s', $hash);
      $stmt->execute();
    }
    header('Location: /account');
  }
  public function getAccount(){
    if ($this->id != 0){
      $query = 'SELECT users.email, users.name, users.number, users.whatsapp,'.
      ' users.campuses_id, campuses.name '.
      'FROM users JOIN campuses ON users.campuses_id=campuses.id'.
      ' WHERE users.id=?';
      $stmt = $this->con->prepare($query);
      $stmt->bind_param('i', $this->id);
      $stmt->execute();
      $stmt->bind_result($email, $name, $num, $w, $cid, $cname);
      $u = new stdClass;
      if ($stmt->fetch()){
        $u->id = $this->id;
        $u->name = $name;
        $u->email = $email;
        $u->number = $num;
        $u->whatsapp = $w;
        $u->campus = array('id' => $cid, 'name' => $cname);
        echo json_encode($u);
      } else {
        header('HTTP/1.0 401 Unauthorized');
      }
    } else {
      header('HTTP/1.0 403 Forbidden');
    }
  }
  public function postCredits(){
    $stmt = $this->con->prepare('SELECT balance FROM accounts WHERE id=?');
    $stmt->bind_param('i', $this->id);
    $stmt->execute();
    $stmt->bind_result($bal);
    if ($stmt->fetch()){
      echo 0;
    } else {
      if ($_POST['pkg'] == '1'){
        echo $this->topupAccount($stmt, RATES[0]);
      } else {
        echo 0;
      }
    }
  }
  public function topupAccount(&$stmt, $amt){
    $stmt->prepare('INSERT INTO accounts (id, balance) VALUES (?, ?) ON DUPLICATE KEY UPDATE balance=balance+?');
    $stmt->bind_param('iii', $this->id, $amt, $amt);
    $stmt->execute();
    if ($stmt->errno == 0){
      return $stmt->affected_rows;
    } else {
      header('500 Internal server Error.');
    }
  }
  public function putPromotion(){
    $_SERVER['REQUEST_METHOD']==="PUT" ? parse_str(file_get_contents('php://input', false , null, -1 , $_SERVER['CONTENT_LENGTH'] ), $_PUT): $_PUT=array();
    $_SERVER['REQUEST_METHOD']==="PUT" ? parse_str(file_get_contents('php://input', false , null, -1 , $_SERVER['CONTENT_LENGTH'] ), $_REQUEST): $_REQUEST=array();
    if (sizeof($_POST) > 0){
      $_REQUEST = $_POST;
    }

    if ($this->id != 0){
      Ads::putPromotion($this, $this->con, $this->id, $_REQUEST['aid'], $_REQUEST['deal']);
    }
  }
  public function putAccount(){
    $_SERVER['REQUEST_METHOD']==="PUT" ? parse_str(file_get_contents('php://input', false , null, -1 , $_SERVER['CONTENT_LENGTH'] ), $_PUT): $_PUT=array();
    $_SERVER['REQUEST_METHOD']==="PUT" ? parse_str(file_get_contents('php://input', false , null, -1 , $_SERVER['CONTENT_LENGTH'] ), $_REQUEST): $_REQUEST=array();
    if (sizeof($_POST) > 0){
      $_REQUEST = $_POST;
    }

    $stmt = $this->con->prepare('UPDATE users SET users.name=?, users.number=?, users.whatsapp=? WHERE users.id=?');
    $_REQUEST['w'] = ($_REQUEST['w'] == 'true') ? 1 : 0;
    $stmt->bind_param('ssii', $_REQUEST['name'], $_REQUEST['number'], $_REQUEST['w'], $this->id);
    $stmt->execute();
    echo $stmt->affected_rows;
  }
  public function deleteUser(){
    $query = 'SELECT hash FROM users WHERE id=?';
    $stmt = $this->con->prepare($query);
    $stmt->bind_param('i', $this->id);
    $stmt->execute();
    $stmt->bind_result($hash);
    if ($stmt->fetch() && password_verify($_REQUEST['password'], $hash)){
      $stmt->close();
      $this->con->autocommit(false);
      $this->con->query('START TRANSACTION');
      Ads::clearAds($this->con, $this->id);
      $this->con->query("DELETE FROM request_tokens WHERE users_email=(SELECT users.email FROM users WHERE id=$this->id)");
      $this->con->query("DELETE FROM recovery_tokens WHERE users_email=(SELECT users.email FROM users WHERE id=$this->id)");
      $this->con->query("DELETE FROM access_tokens WHERE users_id=$this->id");
      $this->con->query("DELETE FROM users WHERE users.id=$this->id");
      if ($this->con->errno == 0){
        $this->con->query('COMMIT');
      }else{
        $this->con->query('ROLLBACK');
      }
    } else {
      header('HTTP/1.0 400 Bad request');
      echo 'The password does not match!';
    }
  }
  public static function getUsers(){
    if (isset($_GET['id'])){
      echo 'one user';
    } else if (isset($_GET['cid']) && isset($_GET['q'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $q = $con->real_escape_string($_GET['q']);
      $query = 'SELECT users.id, users.email, users.name, users.number, COUNT(adverts.id) ';
      $query = $query . 'FROM users JOIN adverts ';
      $query = $query . 'ON users.id=adverts.users_id ';
      $query = $query . "WHERE users.campuses_id=? AND users.name LIKE '%".$q."%' ";
      $query = $query . 'GROUP BY users.id, users.name, users.number';
      $stmt = $con->prepare($query);
      $stmt->bind_param('i', $_GET['cid']);
      $stmt->execute();
      $stmt->bind_result($id, $email, $name, $num, $num_ads);
      $arr = array();
      while ($stmt->fetch()){
        $u = new Users();
        $u->id = $id;
        $u->name = $name;
        $u->email = $email;
        $u->number = $num;
        $u->num_ads = $num_ads;
        array_push($arr, $u);
      }
      echo json_encode($arr);
    } else {
      echo 'all users';
    }
  }
}
?>
