<?php
/**
 * All things mesaging are handled here
 */
class Messages{
  public static function postMessage(){
    if (isset($_POST['id'])){

    } else {
      $con = new mysqli(HOST, USER, PWD, DB);
      $query = 'INSERT INTO table (a,b,c) VALUES (1,2,3) ON DUPLICATE KEY UPDATE c=c+1';
      // $stmt = $con->prepare($query);
      // print_r();
      // $d = new DateTime();
      //echo $d->format('d M Y, h:m:s A');
    }
  }
}
?>
