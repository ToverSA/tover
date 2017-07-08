<?php
/**
 * All things images. will be done here.
 */
class Image{
  public static function output(&$src, $large = true){
    $str = base64_decode($src);
    $img = imagecreatefromstring($str);
    if (!$large){
      $img = imagescale($img, 198, 198);
    }
    header('Content-Type: image/jpeg');
    imagejpeg($img, NULL, 100);
    imagedestroy($img);
  }
  public static function optimise($str){
    $str = base64_decode($str);
    $img = imagecreatefromstring($str);
    $w = imagesx($img);
    $h = imagesy($img);
    $l = ($w < $h) ? $w : $h;
    $x = ($w > $h) ? ($w - $h)/2 : 0;
    $y = ($h > $w) ? ($h - $w)/2 : 0;
    $im = imagecreatetruecolor($l, $l);
    imagecopy($im, $img, 0, 0, $x, $y, $w, $h);
    if ($l > 512) {
        $im = imagescale($im, 512, 512);
    }
    ob_start();
    imagejpeg($im, NULL, 90);
    $contents = ob_get_contents();
    ob_end_clean();
    imagedestroy($img);
    imagedestroy($im);
    return base64_encode($contents);
  }
  public static function getThumb(){
    $con = new mysqli(HOST, USER, PWD, DB);
    if ($_GET['id'] == 0){
      $query = 'SELECT src FROM images WHERE advert_id=? ORDER BY id ASC LIMIT 1';
      $stmt = $con->prepare($query);
      $stmt->bind_param('i', $_GET['a']);
      $stmt->execute();
      $stmt->bind_result($src);
      if ($stmt->fetch()){
        self::output($src, false);
      }
    } else {
      $query = 'SELECT src FROM images WHERE id=? ORDER BY id ASC LIMIT 1';
      $stmt = $con->prepare($query);
      $stmt->bind_param('i', $_GET['id']);
      $stmt->execute();
      $stmt->bind_result($src);
      if ($stmt->fetch()){
        self::output($src, false);
      }
    }
  }
  public static function getLarge(){
    $con = new mysqli(HOST, USER, PWD, DB);
    if ($_GET['id'] == 0){
      $query = 'SELECT src FROM images WHERE advert_id=? ORDER BY id ASC LIMIT 1';
      $stmt = $con->prepare($query);
      $stmt->bind_param('i', $_GET['a']);
      $stmt->execute();
      $stmt->bind_result($src);
      if ($stmt->fetch()){
        self::output($src, false);
      }
    } else {
      $query = 'SELECT src FROM images WHERE id=? ORDER BY id ASC LIMIT 1';
      $stmt = $con->prepare($query);
      $stmt->bind_param('i', $_GET['id']);
      $stmt->execute();
      $stmt->bind_result($src);
      if ($stmt->fetch()){
        self::output($src);
      }
    }
  }
}

?>
