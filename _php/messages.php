<?php
/**
 * All things mesaging are handled here
 */
class Messages{
  public static function putMessages(){
    $_SERVER['REQUEST_METHOD']==="PUT" ? parse_str(file_get_contents('php://input', false , null, -1 , $_SERVER['CONTENT_LENGTH'] ), $_PUT): $_PUT=array();
    if (isset($_SERVER['HTTP_TOKEN'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT id FROM login WHERE token=?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('s', $_SERVER['HTTP_TOKEN']);
      $stmt->execute();
      $stmt->bind_result($uid);
      if ($stmt->fetch()){
        $stmt->prepare("UPDATE threads SET reply_id=0 WHERE id=?");
        $stmt->bind_param('i', $_PUT['tid']);
        $stmt->execute();
        print_r($stmt);
      }
    }
  }
  public static function insert(&$stmt, $tid, $uid, $b){
    $d = new DateTime();
    $date = $d->format('Y-m-d, H:m:s');
    $query = 'INSERT INTO messages SET thread_id=?, user_id=?, body=?, date_created=?';
    $stmt->prepare($query);
    $stmt->bind_param('iiss', $tid, $uid, $b, $date);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
      $stmt->prepare("UPDATE threads SET reply_id=? WHERE id=?");
      $stmt->bind_param('ii',$uid, $tid);
      $stmt->execute();
      echo $d->format('d M Y, h:m:s A');;
    } else {
      header('HTTP/1.0 500 Internal server Error');
    }
  }
  public static function postMessage(){
    if (isset($_SERVER['HTTP_TOKEN'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT id FROM login WHERE token=?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('s', $_SERVER['HTTP_TOKEN']);
      $stmt->execute();
      $stmt->bind_result($uid);
      if ($stmt->fetch()){
        if (isset($_POST['tid'])){
          self::insert($stmt, $_POST['tid'], $uid, $_POST['body']);
        }else{
          $stmt->prepare('INSERT INTO threads SET user_id=?, advert_id=?');
          $stmt->bind_param('ii', $uid, $_POST['id']);
          $stmt->execute();
          header('HTTP/1.0 201 Created');
          self::insert($stmt, $stmt->insert_id, $uid, $_POST['body']);
        }
      }
    }
  }
  public static function getMessages(){
    if (isset($_SERVER['HTTP_TOKEN'])){
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'SELECT id FROM login WHERE token=?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('s', $_SERVER['HTTP_TOKEN']);
      $stmt->execute();
      $stmt->bind_result($uid);
      if ($stmt->fetch()){
        if (isset($_GET['id'])){
          $stmt->prepare('SELECT user_id, body, date_created FROM messages WHERE thread_id=?');
          $stmt->bind_param('i', $_GET['id']);
          $stmt->execute();
          $stmt->bind_result($id, $body, $date);
          $thread = array();
          while ($stmt->fetch()) {
            $d = new DateTime($date);
            array_push($thread, array('sent' => ($uid == $id), 'body' => $body, 'date' => $d->format('M d h:m:s A')));
          }
          echo json_encode($thread);
        }else{
          $q1 = 'SELECT DISTINCT threads.id, threads.advert_id, users.name, threads.reply_id FROM threads JOIN (users, advert) ON threads.advert_id=advert.id AND advert.user_id=users.id WHERE threads.user_id=?';
          $q2 = 'SELECT DISTINCT threads.id, threads.advert_id, users.name, threads.reply_id FROM threads JOIN (users, advert) ON threads.user_id=users.id AND threads.advert_id=advert.id WHERE advert.user_id=?';
          $query = '(' . $q1 . ') UNION (' . $q2 . ')';
          $stmt->prepare($query);
          $stmt->bind_param('ii', $uid, $uid);
          $stmt->execute();
          $stmt->bind_result($tid, $aid, $name, $rid);
          $inbox = array();
          while ($stmt->fetch()) {
            array_push($inbox, array('tid' => $tid, 'id' => $aid, 'name' => $name, 'seen' => (($uid == $rid) || ($rid == 0))));
          }
          echo json_encode($inbox);
        }
      }
    }
  }
}
?>
