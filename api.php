<?php
require_once('_php/conf.php');
require_once('_php/image.php');
require_once('_php/insties.php');
require_once('_php/ads.php');
require_once('_php/users.php');
function handleGet(){
  if (isset($_SERVER['PATH_INFO'])){
    switch ($_SERVER['PATH_INFO']) {
      case '/v1/campuses':
      case '/v1/campuses/':
        Insties::getCampuses();
        break;
      case '/v1/account':
      case '/v1/account/':
        Users::getAccount();
        break;
      case '/v1/account/ads':
      case '/v1/account/ads/':
        Ads::getAccountAds();
        break;
      case '/v1/ads':
      case '/v1/ads/':
        Ads::getAds();
        break;
      case '/v1/image/thumb.jpg':
      case '/v1/image/thumb.jpg/':
        Image::getThumb();
        break;
      default:
        break;
    }
  }
}
function handlePost(){
  if (isset($_SERVER['PATH_INFO'])){
    switch ($_SERVER['PATH_INFO']) {
      case '/v1/users/new':
      case '/v1/users/new/':
        Users::postNewUser();
        break;
      case '/v1/ads':
      case '/v1/ads/':
        Ads::post();
        break;
      case '/v1/users/auth':
      case '/v1/users/auth/':
        Users::postAuthUser();
        break;
      default:
        break;
    }
  }
}
function handePut(){
  echo 'hello';
  print_r($_PUT);
}
function handleDelete(){
  print_r($_SERVER);
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
