<?php
/**
 * User tracking
 */
class Logs{
  public static function getVisitors(){
    echo gethostbyaddr(self::getIPAddress());
  }
  public static function getIPAddress(){
    if (isset($_SERVER['HTTP_CLIENT_IP'])){
      return $_SERVER['HTTP_CLIENT_IP'];
    }else if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])){
      return $_SERVER['HTTP_X_FORWARDED_FOR'];
    }else{
      return $_SERVER['REMOTE_ADDR'];
    }
  }
  public static function visit(){
    $con = new mysqli(HOST, USER, PWD, DB);
    $query = 'INSERT INTO visitors (campus_id, ip_address) VALUES (?, ?) ON DUPLICATE KEY UPDATE count = count + 1';
    $stmt = $con->prepare($query);
    $ip = $con->escape_string(self::getIPAddress());
    // $ip = $con->escape_string(inet_ntop($ip));
    echo $ip;
    $stmt->bind_param('is', $_POST['cid'], $ip);
    $stmt->execute();
  }
}

?>
