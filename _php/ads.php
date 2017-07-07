<?php
/**
 * Ads class. All things ads will be handled here.
 * id, limit, query as params for get requests.
 */

class Ads{
  public static function getAds(){
    $limit = 0;
    $rows = 15;
    $limit = (isset($_GET['page'])) ? (($_GET['page'] - 1) * $rows) : $limit;
    if (isset($_GET['id'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT advert.title, advert.price, advert.description, users.name, '.
      'users.id, users.number, users.whatsapp FROM advert JOIN users ON advert.user_id=users.id '.
      'WHERE advert.id=?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('i', $_GET['id']);
      $stmt->execute();
      $stmt->bind_result($title, $price, $desc, $name, $uid, $num ,$w);
      if ($stmt->fetch()){
        $a = new Ads();
        $a->id = $_GET['id'];
        $a->title = $title;
        $a->price = $price;
        $a->description = $desc;
        $a->name = $name;
        $a->uid = $uid;
        $a->number = $num;
        $a->whatsapp = $w;
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
        $stmt->close();
        $query = "INSERT INTO advert_log SET advert_id=?, event='VIEW'";
        $stmt = $con->prepare($query);
        $stmt->bind_param('i', $_GET['id']);
        $stmt->execute();
      }
    } else if (isset($_GET['uid'])){
      $uid = intval($_GET['uid']);
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT advert.id, advert.title, advert.price, '.
      'advert.date_created FROM users JOIN advert ON users.id=advert.user_id '.
      'WHERE advert.user_id=?';
      $query = $query.' LIMIT ?, ?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('iii', $_GET['uid'], $limit, $rows);
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
    } else if (isset($_GET['cid'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT advert.id, advert.title, advert.price, '.
      'advert.date_created FROM users JOIN advert ON users.id=advert.user_id '.
      'WHERE users.campus_id=? ';
      if (isset($_GET['c'])){
        $key = array_search($_GET['c'], CAT);
        $query = ($key) ? $query . 'AND advert.category=' . CAT[$key] . ' ' : $query;
      }
      if (isset($_GET['q'])){
        $query = $query . "AND advert.title LIKE '%".$_GET['q']."%' ";
        if (!(isset($_GET['a']) && $_GET['a'] == 'n')){
          $query = $query . "OR advert.description LIKE '%".$_GET['q']."%' ";
        }
      }
      $s = 0;
      if (isset($_GET['s'])){
        $s = intval($_GET['s']);
        $s = ($s < 0) ? - $s : $s;
        switch ($s) {
          case 2:
          $query = 'SELECT advert.id, advert.title, advert.price,  '.
          'advert.date_created, COUNT(advert_log.id) FROM advert JOIN users JOIN advert_log '.
          'ON advert.user_id=users.id AND advert.id=advert_log.advert_id '.
          "WHERE users.campus_id=? ";
          if (isset($_GET['c'])){
            $key = array_search($_GET['c'], CAT);
            $query = ($key) ? $query . 'AND advert.category=' . CAT[$key] . ' ' : $query;
          }
          if (isset($_GET['q'])){
            $query = $query . "AND advert.title LIKE '%".$_GET['q']."%' ";
            if (!(isset($_GET['a']) && $_GET['a'] == 'n')){
              $query = $query . "OR advert.description LIKE '%".$_GET['q']."%' ";
            }
          }
          $query = $query . 'GROUP BY advert.id ';
            break;
          case 3:
            $query = $query . 'ORDER BY advert.price ASC ';
            break;
          case 4:
            $query = $query . 'ORDER BY advert.price DESC ';
            break;

          default:
            $query = $query . 'ORDER BY advert.id DESC ';
            break;
        }
      }
      $query = $query.'LIMIT ?, ?';
      $stmt = $con->prepare($query);
      // print_r($con);
      $stmt->bind_param('iii', $_GET['cid'], $limit, $rows);
      $stmt->execute();
      // print_r($stmt);
      if ($s == 2){
        $stmt->bind_result($id, $title, $price, $date, $cnt);
        $arr = array();
        $carr = array();
        while ($stmt->fetch()) {
          $a = new Ads();
          $a->id = $id;
          $a->title = $title;
          $a->price = $price;
          $d = new DateTime($date);
          $a->date_created = $d->format('d M');
          array_push($arr, $a);
          array_push($carr, $cnt);
        }
        array_multisort($carr, SORT_DESC, $arr);
        echo json_encode($arr);
        // echo json_encode($arr) . "\n";
      } else {
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
        $query = 'SELECT advert.id, advert.user_id, advert.price, advert.title, '.
        'advert.description, advert.category, advert.date_created, COUNT(advert_log.id) '.
        'FROM advert LEFT JOIN advert_log ON advert.id=advert_log.advert_id '.
        'WHERE advert.user_id=? GROUP BY advert.id ORDER BY id DESC';
        $stmt = $con->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $stmt->bind_result($id, $uid, $price, $title, $desc, $cat, $date, $cnt);
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
          $a->count = $cnt;
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
      $query = 'SELECT id FROM login WHERE token=?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('s', $_SERVER['HTTP_TOKEN']);
      $stmt->execute();
      $stmt->bind_result($id);
      if ($stmt->fetch()) {
        if ($id != $_POST['userId']) {
          header('HTTP/1.0 401 Unauthorized');
          return false;
        }
      }
      $stmt->close();
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
      if ($aid > 0){
        $query = 'INSERT INTO images (advert_id, src) VALUES (?, ?)';
        $stmt = $con->prepare($query);
        foreach ($imgs as $img) {
          $stmt->bind_param('is', $aid, $img);
          $stmt->execute();
        }
        if ($stmt->affected_rows > 0){
          $con->query('COMMIT');
          header('HTTP/1.0 201 Created');
        } else {
          print_r($stmt);
          header('HTTP/1.0 500 Internal server Error');
          $con->query('ROLLBACK');
        }
      } else {
        header('HTTP/1.0 500 Internal server Error');
      }
    } else {
      header('HTTP/1.0 400 Bad request');
    }
    return true;
  }
  public static function deleteAds(){
    if (isset($_REQUEST['id'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT id FROM login WHERE token=?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('s', $_SERVER['HTTP_TOKEN']);
      $stmt->execute();
      $stmt->bind_result($id);
      if ($stmt->fetch()){
        $stmt->close();
        // $con->query('START TRANSACTION');
        $query = 'DELETE FROM advert, advert_log, images '.
        'USING advert JOIN advert_log JOIN images WHERE advert.user_id=? AND '.
        'advert.id=images.advert_id AND advert.id=advert_log.advert_id AND advert.id=?';
        $stmt = $con->prepare($query);
        $stmt->bind_param('ii',$id, $_REQUEST['id']);
        $stmt->execute();
        print_r($stmt);
      }
    }
  }
}
?>
