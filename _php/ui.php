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
  public static function closeBody(){
    return "\t</body>\n";
  }
  public static function end(){
    return "</html>\n";
  }
  public static function confirm(){
    echo self::begin();
    echo self::head("Confirm payment");
    echo self::openBody();
    echo self::title("Confirm payment");
    echo self::closeBody();
    echo self::end();
  }
}

?>
