<?php
/**
 * Ads class. All things ads will be handled here.
 * id, limit, query as params for get requests.
 */

class Ads{
  public static function clearAds(&$con, $uid){
    Messages::clearMessages($con, $uid);
    $con->query("DELETE advert_log FROM advert_log JOIN adverts WHERE adverts.id=advert_log.adverts_id AND adverts.users_id=$uid");
    $con->query("DELETE images FROM images JOIN adverts WHERE adverts.id=images.adverts_id AND adverts.users_id=$uid");
  }
  public static function promo(&$stmt, $deal, $aid){
    $stmt->prepare('INSERT INTO promos SET id=?, deal=?, views=0, date_created=? ON DUPLICATE KEY UPDATE views=0, deal=?, date_created=?');
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
      $stmt->prepare("SELECT deal+0, ABS(DATEDIFF(date_created,'$date')) FROM promos WHERE (ABS(DATEDIFF(date_created,'$date')) < 8) AND id=?");
      $stmt->bind_param('i', $id);
      $stmt->execute();
      $stmt->bind_result($deal, $diff);
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
      $query = 'SELECT COUNT(adverts.id) FROM adverts JOIN users ON adverts.users_id=users.id '.
      "WHERE users.campuses_id=?";
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
      $query = "SELECT adverts.id, adverts.title, adverts.price, adverts.date_created, promos.deal+0, ABS(DATEDIFF(promos.date_created,'$date')) FROM users JOIN adverts JOIN promos ON users.id=adverts.users_id AND adverts.id=promos.id WHERE ((promos.deal+0 = 1 AND ABS(DATEDIFF(promos.date_created,'$date')) < 4) OR (promos.deal+0 = 2 AND ABS(DATEDIFF(promos.date_created,'$date')) < 6) OR (promos.deal+0 = 3 AND ABS(DATEDIFF(promos.date_created,'$date')) < 8)) AND users.campuses_id=? ORDER BY promos.views ASC LIMIT 5";
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
        $stmt->prepare('UPDATE promos SET views = views + 1 WHERE id = ?');
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
      $query = 'SELECT adverts.title, adverts.price, adverts.description, users.name, '.
      'users.id, users.number, users.whatsapp FROM adverts JOIN users ON adverts.users_id=users.id '.
      'WHERE adverts.id=?';
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
        $query = 'SELECT id FROM images WHERE adverts_id=?';
        $stmt->prepare($query);
        $stmt->bind_param('i', $_GET['id']);
        $stmt->execute();
        $stmt->bind_result($id);
        while ($stmt->fetch()) {
          array_push($a->src_id, $id);
        }
        echo json_encode($a);
        $stmt->close();
        $query = "INSERT INTO advert_log SET id=?, views=1 ON DUPLICATE KEY UPDATE views=views+1";
        $stmt = $con->prepare($query);
        $stmt->bind_param('i', $_GET['id']);
        $stmt->execute();
      }
    } else if (isset($_GET['q'])){
      $q = $_GET['q'];
      $s = 0;
      if (isset($_GET['s'])){
        $s = intval($_GET['s']);
        $s = ($s < 0) ? - $s : $s;
      }
      $select = "SELECT adverts.id, adverts.title, adverts.price, adverts.date_created, SUM(advert_log.views) views FROM adverts JOIN users JOIN advert_log ON adverts.users_id=users.id AND	adverts.id=advert_log.id WHERE users.campuses_id=?";
      $cat = (isset($_GET['c'])) ? "AND adverts.category=". $_GET['c'] : "";
      $cond = "(adverts.title LIKE '%$q%' $cat) OR (adverts.description LIKE '%$q%' $cat)";
      $sort = " GROUP BY adverts.id";
      switch ($s) {
        case 2:
          $sort .= " ORDER BY views DESC";
          break;
        case 3:
          $sort .= " ORDER BY adverts.price ASC";
          break;
        case 4:
          $sort .= "  ORDER BY adverts.price DESC";
          break;
        default:
          $sort .= " ORDER BY adverts.id DESC";
          break;
      }
      $query = $select . " AND " . $cond . $sort;

      $query = $query.' LIMIT ?, ?';

      $con = new mysqli(HOST, USER, PWD, DB);
      $stmt = $con->prepare($query);
      $stmt->bind_param('iii', $_GET['cid'], $limit, $rows);
      $stmt->execute();
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
      echo json_encode($arr);
    } else if (isset($_GET['uid'])){
      $uid = intval($_GET['uid']);
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT adverts.id, adverts.title, adverts.price, '.
      'adverts.date_created FROM users JOIN adverts ON users.id=adverts.users_id '.
      'WHERE adverts.users_id=?';
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
      $s = 0;
      if (isset($_GET['s'])){
        $s = intval($_GET['s']);
        $s = ($s < 0) ? - $s : $s;
      }
      $select = "SELECT adverts.id, adverts.title, adverts.price, adverts.date_created, SUM(advert_log.views) views FROM adverts JOIN users JOIN advert_log ON adverts.users_id=users.id AND	adverts.id=advert_log.id WHERE users.campuses_id=?";
      $cat = (isset($_GET['c'])) ? " AND adverts.category=". $_GET['c'] : "";
      $cond = $cat;
      $sort = " GROUP BY adverts.id";
      switch ($s) {
        case 2:
          $sort .= " ORDER BY views DESC";
          break;
        case 3:
          $sort .= " ORDER BY adverts.price ASC";
          break;
        case 4:
          $sort .= "  ORDER BY adverts.price DESC";
          break;
        default:
          $sort .= " ORDER BY adverts.id DESC";
          break;
      }
      $query = $select . $cond . $sort;

      $query = $query.' LIMIT ?, ?';

      $con = new mysqli(HOST, USER, PWD, DB);
      $stmt = $con->prepare($query);
      $stmt->bind_param('iii', $_GET['cid'], $limit, $rows);
      $stmt->execute();
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
      echo json_encode($arr);
    }
  }
  public static function getAccountAds($con, $uid){
    $query = 'SELECT adverts.id, adverts.users_id, adverts.price, adverts.title, '.
    'adverts.description, adverts.category+0, adverts.date_created, SUM(advert_log.views) '.
    'FROM adverts LEFT JOIN advert_log ON adverts.id=advert_log.id '.
    'WHERE adverts.users_id=? GROUP BY adverts.id ORDER BY adverts.id DESC';
    $stmt = $con->prepare($query);
    $stmt->bind_param('i', $uid);
    $stmt->execute();
    $stmt->bind_result($id, $uid, $price, $title, $desc, $cat, $date, $cnt);
    $arr = array();
    while ($stmt->fetch()){
      $a = new Ads();
      $a->id = $id;
      $a->price = $price;
      $a->title = $title;
      $a->description = $desc;
      $a->category = $cat;
      $d = new DateTime($date);
      $a->date_created = $d->format('d M Y');
      $a->count = $cnt;
      array_push($arr, $a);
    }
    echo json_encode($arr);
  }
  public static function putPromotion($u, &$con, $uid, $aid, $deal){
    $stmt = $con->prepare('SELECT balance FROM accounts WHERE id=?');
    $stmt->bind_param('i', $uid);
    $stmt->execute();
    $stmt->bind_result($bal);
    if ($stmt->fetch()){
      if ($bal - DEALS[$deal] >= 0){
        $stmt = $con->stmt_init();
        $ins = self::promo($stmt, $deal, $aid);
        $u->topupAccount($stmt, (-DEALS[$deal]));
        echo $ins;
      }
    }
  }
  public static function post($con, $uid){
    $imgs = array();
    foreach($_POST['images'] as $src){
      array_push($imgs, Image::optimise($src));
    }
    $con->autocommit(false);
    $con->query('START TRANSACTION');
    $query = 'INSERT INTO adverts SET users_id=?, price=?, title=?, description=?,'.
    'category=?, date_created=?';
    $stmt = $con->prepare($query);
    $d = new DateTime();
    $date = $d->format('Y-m-d h:i:s');
    $stmt->bind_param('isssis', $uid, $_POST['price'], $_POST['title'],
    $_POST['description'], $_POST['category'], $date);
    $stmt->execute();
    $aid = $stmt->insert_id;
    if ($aid > 0){
      $query = 'INSERT INTO images (adverts_id, src) VALUES (?, ?)';
      $stmt->prepare($query);
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
  }
  public static function deleteAds(&$con, $id){
    $con->query("DELETE FROM advert_log WHERE id=$id");
    $con->query("DELETE FROM messages WHERE threads_id=(SELECT id WHERE adverts_id=$id)");
    $con->query("DELETE FROM threads WHERE adverts_id=$id");
    $con->query("DELETE FROM images WHERE adverts_id=$id");
    $con->query("DELETE FROM promos WHERE id=$id");
    $con->query("DELETE FROM adverts WHERE id=$id");
    echo "done";
  }
}
?>
