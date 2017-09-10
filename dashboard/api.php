<?php
//require_once('_php/conf.php');
//require_once('_php/image.php');
require_once('_php/insties.php');
//require_once('_php/ads.php');
//require_once('_php/users.php');
//require_once('_php/messages.php');
function handleGet(){
  if (isset($_SERVER['PATH_INFO'])){
    switch (strtolower($_SERVER['PATH_INFO'])) {
      case '/v1/campuses':
      case '/v1/campuses/':
        Insties::getCampuses();
        break;
      default:
        break;
    }
  }
}
function handlePost(){
  if (isset($_SERVER['PATH_INFO'])){
    switch ($_SERVER['PATH_INFO']) {
      default:
        break;
    }
  }
}
function handePut(){
  if (isset($_SERVER['PATH_INFO'])){
    switch (strtolower($_SERVER['PATH_INFO'])) {
      default:
        break;
    }
  }
}
function handleDelete(){
  if (isset($_SERVER['PATH_INFO'])){
    switch ($_SERVER['PATH_INFO']) {
      default:
        break;
    }
  }
}
if ($_SERVER['REQUEST_METHOD'] === 'GET'){
  handleGet();
}
else if ($_SERVER['REQUEST_METHOD'] === 'POST'){
  handlePost();
}
else if ($_SERVER['REQUEST_METHOD'] === 'PUT'){
  handePut();
}
else if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){
  handleDelete();
}
?>
