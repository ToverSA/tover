<?php
/**
 * Users class. from authentication to creation of users in
 * the platform.
 */
class Users{
  //TODO Send email verification
  public static function topupAccount(&$stmt, $uid, $amt){
    $stmt->prepare('INSERT INTO account (user_id, balance) VALUES (?, ?) ON DUPLICATE KEY UPDATE balance=balance+?');
    $stmt->bind_param('iii', $uid, $amt, $amt);
    $stmt->execute();
    if ($stmt->errno == 0){
      return $stmt->affected_rows;
    } else {
      header('500 Internal server Error.');
    }
  }
  public static function deleteUser(){
    if (isset($_SERVER['HTTP_TOKEN'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT id, password FROM login WHERE token=?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('s', $_SERVER['HTTP_TOKEN']);
      $stmt->execute();
      $stmt->bind_result($uid, $hash);
      if ($stmt->fetch() && password_verify($_REQUEST['password'], $hash)){
        $con->autocommit(false);
        $con->query('START TRANSACTION');
        Ads::clearAds($stmt, $uid);
        $stmt->prepare('DELETE users, login FROM users JOIN login WHERE login.id=users.id AND users.id=?');
        $stmt->bind_param('i', $uid);
        $stmt->execute();
        if ($stmt->errno == 0){
          $con->query('COMMIT');
        }else{
          $con->query('ROLLBACK');
        }
      } else {
        header('HTTP/1.0 400 Bad request');
        echo 'The password does not match!';
      }
    }
  }
  public static function postNewUser(){
    $con = new mysqli(HOST, USER, PWD, DB);
    $con->autocommit(false);
    $con->query('START TRANSACTION');
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
    $con->query('COMMIT');
  }
  public static function postAuthUser(){
    $con = new mysqli(HOST, USER, PWD, DB);
    $query = 'SELECT id, email, password, token FROM login WHERE email=?';
    $stmt = $con->prepare($query);
    $stmt->bind_param('s', $_POST['email']);
    $stmt->execute();
    $stmt->bind_result($id, $email, $hash, $token);
    if ($stmt->fetch()){
      if (password_verify($_POST['password'], $hash)){
        echo json_encode(array('id' => $id, 'token' => $token));
      } else {
        header('HTTP/1.0 400 Bad request');
        echo "The password does not match for " . $_POST['email'] . "'s account";
      }
    } else {
      header('HTTP/1.0 400 Bad request');
      echo "The email ''" . $_POST['email'] . "' does not exists in our systems. New here? create a new account.";
    }
  }
  public static function putAccount(){
    $_SERVER['REQUEST_METHOD']==="PUT" ? parse_str(file_get_contents('php://input', false , null, -1 , $_SERVER['CONTENT_LENGTH'] ), $_PUT): $_PUT=array();
    if (isset($_SERVER['HTTP_TOKEN'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT id FROM login WHERE token=?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('s', $_SERVER['HTTP_TOKEN']);
      $stmt->execute();
      $stmt->bind_result($uid);
      if ($stmt->fetch()){
        $stmt->prepare('UPDATE users SET users.name=?, users.number=?, users.whatsapp=? WHERE users.id=?');
        $_PUT['w'] = ($_PUT['w'] == 'true') ? 1 : 0;
        $stmt->bind_param('ssii', $_PUT['name'], $_PUT['number'], $_PUT['w'], $uid);
        $stmt->execute();
        echo $stmt->affected_rows;
      }
    }
  }
  public static function postCredits(){
    if (isset($_SERVER['HTTP_TOKEN'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT id FROM login WHERE token=?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('s', $_SERVER['HTTP_TOKEN']);
      $stmt->execute();
      $stmt->bind_result($uid);
      if ($stmt->fetch()){
        $stmt->prepare('SELECT balance FROM account WHERE user_id=?');
        $stmt->bind_param('i', $uid);
        $stmt->execute();
        $stmt->bind_result($bal);
        if ($stmt->fetch()){
          echo 0;
        } else {
          if ($_POST['pkg'] == '1'){
            echo self::topupAccount($stmt, $uid, RATES[0]);
          } else {
            echo 0;
          }
        }
      }
    }
  }
  public static function getAccount(){
    if (isset($_SERVER['HTTP_TOKEN'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT login.id, login.email, users.name, users.number, users.whatsapp,'.
      ' users.campus_id, campuses.name '.
      'FROM login JOIN users JOIN campuses ON login.id=users.id AND users.campus_id=campuses.id'.
      ' WHERE login.token=?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('s', $_SERVER['HTTP_TOKEN']);
      $stmt->execute();
      $stmt->bind_result($id, $email, $name, $num, $w, $cid, $cname);
      $u = new Users();
      if ($stmt->fetch()){
        $u->id = $id;
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
  public static function getCredits(){
    if (isset($_SERVER['HTTP_TOKEN'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT id FROM login WHERE token=?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('s', $_SERVER['HTTP_TOKEN']);
      $stmt->execute();
      $stmt->bind_result($uid);
      if ($stmt->fetch()){
        $stmt->prepare('SELECT balance FROM account WHERE user_id=?');
        $stmt->bind_param('i', $uid);
        $stmt->execute();
        $stmt->bind_result($bal);
        if ($stmt->fetch()){
          echo json_encode(array('balance' => $bal, 'rates' => Ads::getRates()));
        } else {
          echo json_encode(array('balance' => -1, 'rates' => Ads::getRates()));
        }
      }
    }
  }
  public static function getUsers(){
    if (isset($_GET['id'])){
      echo 'one user';
    } else if (isset($_GET['cid']) && isset($_GET['q'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $q = $con->real_escape_string($_GET['q']);
      $query = 'SELECT login.id, login.email, users.name, users.number, COUNT(advert.id) ';
      $query = $query . 'FROM login JOIN users JOIN advert ';
      $query = $query . 'ON login.id=users.id AND login.id=advert.user_id ';
      $query = $query . "WHERE users.campus_id=? AND users.name LIKE '%".$q."%' ";
      $query = $query . 'GROUP BY login.id, users.name, users.number';
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
