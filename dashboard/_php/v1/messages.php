<?php
/**
 * All things mesaging are handled here
 */
class Messages{
  public static function clearThreads(&$con, $aid){
    echo "threads";
  }
  public static function clearMessages(&$con, $uid){
    $con->query("DELETE FROM messages WHERE users_id=$uid");
    $con->query("DELETE FROM threads WHERE users_id=$uid");
    $con->query("DELETE threads FROM threads JOIN adverts WHERE adverts.id=threads.adverts_id AND adverts.users_id=$uid");
  }
  public static function putMessages(&$con){
    $_SERVER['REQUEST_METHOD']==="PUT" ? parse_str(file_get_contents('php://input', false , null, -1 , $_SERVER['CONTENT_LENGTH'] ), $_PUT): $_PUT=array();
    $_SERVER['REQUEST_METHOD']==="PUT" ? parse_str(file_get_contents('php://input', false , null, -1 , $_SERVER['CONTENT_LENGTH'] ), $_REQUEST): $_REQUEST=array();

    if (sizeof($_POST) > 0){
      $_REQUEST = $_POST;
    }

    $stmt = $con->prepare("UPDATE threads SET reply_id=0 WHERE id=?");
    $stmt->bind_param('i', $_REQUEST['tid']);
    $stmt->execute();
  }
  public static function insert(&$stmt, $tid, $uid, $b){
    $d = new DateTime();
    $date = $d->format('Y-m-d, H:m:s');
    $query = 'INSERT INTO messages SET threads_id=?, users_id=?, body=?, date_created=?';
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
  public static function postMessage(&$con, $uid){
    $stmt = $con->stmt_init();
    if (isset($_POST['tid'])){
      self::insert($stmt, $_POST['tid'], $uid, $_POST['body']);
    }else{
      $stmt->prepare('INSERT INTO threads SET users_id=?, adverts_id=?');
      $stmt->bind_param('ii', $uid, $_POST['id']);
      $stmt->execute();
      header('HTTP/1.0 201 Created');
      self::insert($stmt, $stmt->insert_id, $uid, $_POST['body']);
    }
  }
  public static function getMessages(&$con, $uid){
    $stmt = $con->stmt_init();
    if (isset($_GET['id'])){
      $stmt->prepare('SELECT users_id, body, date_created FROM messages WHERE threads_id=?');
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
      $q1 = 'SELECT DISTINCT threads.id, threads.adverts_id, users.name, threads.reply_id FROM threads JOIN (users, adverts) ON threads.adverts_id=adverts.id AND adverts.users_id=users.id WHERE threads.users_id=?';
      $q2 = 'SELECT DISTINCT threads.id, threads.adverts_id, users.name, threads.reply_id FROM threads JOIN (users, adverts) ON threads.users_id=users.id AND threads.adverts_id=adverts.id WHERE adverts.users_id=?';
      $query = '(' . $q1 . ') UNION (' . $q2 . ')';
      $stmt = $con->prepare($query);
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
?>
