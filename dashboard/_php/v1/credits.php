<?php
/**
 *
 */
class Credits{

  function __construct(){
    # code...
  }
  public static function getCredits($con, $uid){
    $stmt = $con->prepare('SELECT balance FROM accounts WHERE id=?');
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

?>
