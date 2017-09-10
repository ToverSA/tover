<?php
/**
 *
 */
class UI{
  public static function begin(){
    return "<!DOCTYPE html>\n<html>\n";
  }
  public static function head($title){
    $h = "\t<head>\n";
    $h = $h . "\t\t<title>All Kept Original &copy; | $title</title>\n";
    $h = $h . "\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\"/>\n";
    $h = $h . "\t\t<link rel=\"stylesheet\" href=\"/styles/theme.css\"/>\n";
    $h = $h . "\t</head>\n";
    return $h;
  }
  public static function openBody(){
    return "\t<body class=\"confirm-payment\">\n";
  }
  public static function title($title){
    return "\t\t<h1 class=\"color-primary\">$title</h1>";
  }
  public static function openTable(){
    return "\t\t<table>";
  }
  public static function openRow(){
    return "\t\t\t<tr>";
  }
  public static function tableColumn($d){
    return "\t\t\t<td>$d</td>";
  }
  public static function closeRow(){
    return "\t\t\t</tr>";
  }
  public static function closeTable(){
    return "\t\t</table>";
  }
  public static function payButton($amt, $id, $email){
      $data = array(
           // Merchant details
          'merchant_id' => MERCHANT_ID,
          'merchant_key' => MERCHANT_KEY,
          'return_url' => RETURN_URL,
          'cancel_url' => CANCEL_URL,
          'notify_url' => NOTIFY_URL,
	        'email_address'=> $email,
           // Transaction details
          'm_payment_id' => $id, //Unique payment ID to pass through to notify_url
	        'amount' => number_format( sprintf( "%.2f", $amt), 2, '.', '' ),  //Amount needs to be in ZAR,if you have a multicurrency system, the conversion needs to place before building this array
          'item_name' => 'Credits',
          'item_description' => 'Credits are a unit currecy used in the akomo system i.e. promoting adverts that were posted by users of the platform',
          'custom_amount' => $amt, //custom integer to be passed through
          );

      $pfOutput = '';
      foreach( $data as $key => $val)
      {
          if(!empty($val))
          {
          	$pfOutput .= $key .'='. urlencode( trim( $val ) ) .'&';
          }
  	}
      // Remove last ampersand
      $getString = substr( $pfOutput, 0, -1 );
      $passPhrase = "2ce3fdc76ed136f164948bfd3e432597";
      if( isset( $passPhrase ) )
      {
          $getString .= '&passphrase='. urlencode( trim( $passPhrase ));
      }
      // $data['signature'] = md5( strtoupper( $getString ) );
    $b = "<div class=\"pay-btn\">";
    $testingMode = true;
    $pfHost = $testingMode ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';
    $b = $b . '<form action="https://'.$pfHost.'/eng/process" method="post">';
    foreach ($data as $name=> $value){
      $b .= '<input name="'.$name.'" type="hidden" value="'.$value.'" />';
    }
    $b .= '<input type="submit" value="Pay Now" /></form>';
    $b = $b . "<span>All payments are handled by payfast, a secure South African payment gateway trusted by many big guns in the game.</span>";
    $b = $b . "<img src=\"/img/payfast.png\"/>";
    $b = $b . "</div>";
    return $b;
   }
  public static function closeBody(){
    return "\t</body>\n";
  }
  public static function end(){
    return "</html>\n";
  }
  public static function confirm(){
    $con = new mysqli(HOST, USER, PWD, DB);
    $stmt = $con->prepare("SELECT email FROM users WHERE id=?");
    $stmt->bind_param('i', $_POST['id']);
    $stmt->execute();
    $stmt->bind_result($email);
    $stmt->fetch();
    echo self::begin();
    echo self::head("Confirm payment");
    echo self::openBody();
    echo self::title("PURCHASE SUMMARY");
    echo self::openTable();
    echo self::openRow();
    echo self::tableColumn("Date :");
    $d = new DateTime();
    echo self::tableColumn($d->format("H:m A d M Y"));
    echo self::closeRow();
    echo self::openRow();
    echo self::tableColumn("User ID :");
    echo self::tableColumn($_POST['id']);
    echo self::closeRow();
    echo self::openRow();
    echo self::tableColumn("User email :");
    echo self::tableColumn($email);
    echo self::closeRow();
    echo self::openRow();
    echo self::tableColumn("Credits :");
    echo self::tableColumn(RATES[$_POST['deal']-1]);
    echo self::closeRow();
    echo self::openRow();
    echo self::tableColumn("Purchase amount :");
    echo self::tableColumn("R" . (RATES[$_POST['deal']-1] * Ads::getRates()));
    echo self::closeRow();
    echo self::openRow();
    echo self::tableColumn("Total :");
    echo self::tableColumn("R" . (RATES[$_POST['deal']-1] * Ads::getRates()));
    echo self::closeRow();
    echo self::closeTable();
    echo self::payButton(RATES[$_POST['deal']-1] * Ads::getRates(), $_POST['id'], $email);
    echo self::closeBody();
    echo self::end();
  }
}

?>
