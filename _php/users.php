<?php
/**
 * Users class. from authentication to creation of users in
 * the platform.
 */
class Users{
  //TODO Send email verification
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
      }
    } else {
      header('HTTP/1.0 400 Bad request');
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
  public static function getUsers(){
    if (isset($_GET['id'])){
      echo 'one user';
    } else if (isset($_GET['cid']) && isset($_GET['q'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT login.id, login.email, users.name, users.number, COUNT(advert.id) ';
      $query = $query . 'FROM login JOIN users JOIN advert ';
      $query = $query . 'ON login.id=users.id AND login.id=advert.user_id ';
      $query = $query . "WHERE users.campus_id=? AND users.name LIKE '%".$_GET['q']."%' ";
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
