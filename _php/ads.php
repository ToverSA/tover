<?php
/**
 * Ads class. All things ads will be handled here.
 * id, limit, query as params for get requests.
 */
class Ads{
  public static function getAds(){
    $limit = 0;
    $rows = 20;
    if (isset($_GET['id'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT advert.title, advert.price, advert.description, users.name, '.
      'users.id, users.number FROM advert JOIN users ON advert.user_id=users.id '.
      'WHERE advert.id=?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('i', $_GET['id']);
      $stmt->execute();
      $stmt->bind_result($title, $price, $desc, $name, $uid, $num);
      if ($stmt->fetch()){
        $a = new Ads();
        $a->title = $title;
        $a->price = $price;
        $a->description = $desc;
        $a->name = $name;
        $a->uid = $uid;
        $a->number = $num;
        $a->src_id = array();
        $stmt->close();
        $query = 'SELECT id FROM images WHERE advert_id=?';
        $stmt = $con->prepare($query);
        $stmt->bind_param('i', $_GET['id']);
        $stmt->execute();
        $stmt->bind_result($id);
        while ($stmt->fetch()) {
          array_push($a->src_id, $id);
        }
        echo json_encode($a);
      }
    } else if (isset($_GET['cid']) && count($_GET) == 1){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT advert.id, advert.title, advert.price, '.
      'advert.date_created FROM users JOIN advert ON users.id=advert.user_id '.
      'WHERE users.campus_id=?';
      $query = $query.' LIMIT ?, ?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('iii', $_GET['cid'], $limit, $rows);
      $stmt->execute();
      $stmt->bind_result($id, $title, $price, $date);
      $arr = array();
      while ($stmt->fetch()) {
        $a = new Ads();
        $a->id = $id;
        $a->title = $title;
        $a->price = $price;
        $d = new DateTime($date);
        $a->date_created = $d->format('d M');
        array_push($arr, $a);
      }
      echo json_encode($arr);
    } else if (isset($_GET['cid']) && isset($_GET['uid'])){
    } else if (isset($_GET['cid']) && isset($_GET['q'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT advert.id, advert.title, advert.price, '.
      'advert.date_created FROM users JOIN advert ON users.id=advert.user_id '.
      "WHERE users.campus_id=? AND advert.title LIKE '%".$_GET['q']."%'";
      $query = $query.' LIMIT ?, ?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('iii', $_GET['cid'], $limit, $rows);
      $stmt->execute();
      $stmt->bind_result($id, $title, $price, $date);
      $arr = array();
      while ($stmt->fetch()) {
        $a = new Ads();
        $a->id = $id;
        $a->title = $title;
        $a->price = $price;
        $d = new DateTime($date);
        $a->date_created = $d->format('d M');
        array_push($arr, $a);
      }
      echo json_encode($arr);
    }
  }
  public static function getAccountAds(){
    if (isset($_SERVER['HTTP_TOKEN'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT id FROM login WHERE token=?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('s', $_SERVER['HTTP_TOKEN']);
      $stmt->execute();
      $stmt->bind_result($id);
      if ($stmt->fetch()){
        $stmt->close();
        $query = 'SELECT * FROM advert WHERE user_id=? ORDER BY id DESC';
        $stmt = $con->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $stmt->bind_result($id, $uid, $price, $title, $desc, $cat, $date);
        $arr = array();
        while ($stmt->fetch()){
          $a = new Ads();
          $a->id = $id;
          $a->price = $price;
          $a->title = $title;
          $a->description = $desc;
          $a->category = CAT[$cat];
          $d = new DateTime($date);
          $a->date_created = $d->format('d M Y');
          array_push($arr, $a);
        }
        echo json_encode($arr);
      } else {
        header('HTTP/1.0 400 Bad request');
      }
    } else {
      header('HTTP/1.0 403 Forbidden');
    }
  }
  public static function post(){
    if (isset($_SERVER['HTTP_TOKEN'])){
      $imgs = array();
      foreach($_POST['images'] as $src){
        array_push($imgs, Image::optimise($src));
      }
      $con = new mysqli(HOST, USER, PWD, DB);
      $con->autocommit(false);
      $con->query('START TRANSACTION');
      $query = 'INSERT INTO advert SET user_id=?, price=?, title=?, description=?,'.
      'category=?, date_created=?';
      $stmt = $con->prepare($query);
      $d = new DateTime();
      $date = $d->format('Y-m-d h:i:s');
      $stmt->bind_param('isssis', $_POST['userId'], $_POST['price'], $_POST['title'],
      $_POST['description'], $_POST['category'], $date);
      $stmt->execute();
      $aid = $stmt->insert_id;
      $stmt->close();
      if ($aid > 0){
        $query = 'INSERT INTO images (advert_id, src) VALUES (?, ?)';
        $stmt = $con->prepare($query);
        $stmt->bind_param('is', $aid, $img);
        foreach ($imgs as $img) {
          $stmt->execute();
        }
        if ($stmt->affected_rows > 0){
          $con->query('COMMIT');
          header('HTTP/1.0 201 Created');
        } else {
          header('HTTP/1.0 500 Internal server Error');
          $con->query('ROLLBACK');
        }
      } else {
        header('HTTP/1.0 401 Unauthorized');
      }
    } else {
      header('HTTP/1.0 403 Forbidden');
    }
  }
}

?>
