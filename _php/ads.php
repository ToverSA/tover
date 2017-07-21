<?php
/**
 * Ads class. All things ads will be handled here.
 * id, limit, query as params for get requests.
 */

class Ads{
  public static function clearAds(&$stmt, $uid){
    Messages::clearMessages($stmt, $uid);
    $stmt->prepare('DELETE advert, images, advert_log FROM advert JOIN images JOIN advert_log WHERE advert.id=images.advert_id AND advert.id=advert_log.advert_id AND advert.user_id=?');
    $stmt->bind_param('i', $uid);
    $stmt->execute();
  }
  public static function promo(&$stmt, $deal, $aid){
    $stmt->prepare('INSERT INTO promos (advert_id, deal, date_created) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE views=0, deal=?, date_created=?');
    $d = new DateTime();
    $date = $d->format('Y-m-d h:i:s');
    $stmt->bind_param('iisis', $aid, $deal, $date, $deal, $date);
    $stmt->execute();
    return $stmt->insert_id;
  }
  public static function getPromos(&$stmt, $id = 0){
    if ($id > 0){
      $d = new DateTime();
      $date = $d->format('Y-m-d h:i:s');
      $stmt->prepare("SELECT id, deal+0, ABS(DATEDIFF(date_created,'$date')) FROM promos WHERE (ABS(DATEDIFF(date_created,'$date')) < 8) AND advert_id=?");
      $stmt->bind_param('i', $id);
      $stmt->execute();
      $stmt->bind_result($id, $deal, $diff);
      if ($stmt->fetch()){
        if ($deal == 1 && $diff < 4){
          return 1;
        } else if ($deal == 2 && $diff < 6){
          return 1;
        } else if ($deal == 3 && $diff < 8){
          return 1;
        } else {
          return 0;
        }
      }else{
        return 0;
      }
    }
  }
  public static function getRates(){
    return 0.1;
  }
  public static function getAdsCount(){
    if (isset($_GET['cid'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT COUNT(advert.id) FROM advert JOIN users ON advert.user_id=users.id '.
      "WHERE users.campus_id=?";
      $stmt = $con->prepare($query);
      $stmt->bind_param('i', $_GET['cid']);
      $stmt->execute();
      $stmt->bind_result($num);
      if ($stmt->fetch()){
        echo $num;
      }
    }
  }
  public static function getPromoAds(){
    if (isset($_GET['cid'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $d = new DateTime();
      $date = $d->format('Y-m-d');
      $query = "SELECT advert.id, advert.title, advert.price, advert.date_created, promos.deal+0, ABS(DATEDIFF(promos.date_created,'$date')) FROM users JOIN advert JOIN promos ON users.id=advert.user_id AND advert.id=promos.advert_id WHERE ((promos.deal+0 = 1 AND ABS(DATEDIFF(promos.date_created,'$date')) < 4) OR (promos.deal+0 = 2 AND ABS(DATEDIFF(promos.date_created,'$date')) < 6) OR (promos.deal+0 = 3 AND ABS(DATEDIFF(promos.date_created,'$date')) < 8)) AND users.campus_id=? ORDER BY promos.views ASC LIMIT 5";
      $stmt = $con->prepare($query);
      $stmt->bind_param('i', $_GET['cid']);
      $stmt->execute();
      $stmt->bind_result($id, $title, $price, $date, $deal, $diff);
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
      foreach ($arr as $val) {
        $stmt->prepare('UPDATE promos SET views = views + 1 WHERE advert_id = ?');
        $stmt->bind_param('i', $val->id);
        $stmt->execute();
      }
      echo json_encode($arr);
    }
  }
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
        $a->promo = self::getPromos($stmt, $_GET['id']);
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
        $q = $con->real_escape_string($_GET['q']);
        $query = $query . "AND advert.title LIKE '%".$q."%' ";
        if (!(isset($_GET['a']) && $_GET['a'] == 'n')){
          $query = $query . "OR advert.description LIKE '%".$q."%' ";
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
            $q = $con->real_escape_string($_GET['q']);
            $query = $query . "AND advert.title LIKE '%".$q."%' ";
            if (!(isset($_GET['a']) && $_GET['a'] == 'n')){
              $query = $query . "OR advert.description LIKE '%".$q."%' ";
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
  public static function putPromotion(){
    $_SERVER['REQUEST_METHOD']==="PUT" ? parse_str(file_get_contents('php://input', false , null, -1 , $_SERVER['CONTENT_LENGTH'] ), $_PUT): $_PUT=array();
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
          if ($bal - DEALS[$_PUT['deal']] >= 0){
            $ins = self::promo($stmt, $_PUT['deal'], $_PUT['aid']);
            Users::topupAccount($stmt, $uid, - DEALS[$_PUT['deal']]);
            echo $ins;
          }
        }
      }
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
      $stmt->bind_result($uid);
      if ($stmt->fetch()){
        $stmt->close();
        Messages::clearMessages($stmt, $uid);
        $query = 'DELETE FROM advert, advert_log, images '.
        'USING advert JOIN advert_log JOIN images WHERE advert.user_id=? AND '.
        'advert.id=images.advert_id AND advert.id=advert_log.advert_id AND advert.id=?';
        $stmt = $con->prepare($query);
        $stmt->bind_param('ii', $uid, $_REQUEST['id']);
        $stmt->execute();
        $stmt->prepare('DELETE FROM promos WHERE advert_id=?');
        $stmt->bind_param('i', $_REQUEST['id']);
        $stmt->execute();
        header('204 No Content');
      }
    }
  }
}
?>
