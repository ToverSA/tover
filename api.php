<?php
require_once('dashboard/_php/v1/conf.php');
require_once('dashboard/_php/v1/image.php');
require_once('dashboard/_php/v1/credits.php');
require_once('dashboard/_php/v1/insties.php');
require_once('dashboard/_php/v1/ads.php');
require_once('dashboard/_php/v1/users.php');
require_once('dashboard/_php/v1/messages.php');
// require_once('dashboard/_php/v1/logs.php');
require_once('dashboard/_php/v1/ui.php');

function handleGet(){

  if (isset($_SERVER['PATH_INFO'])){
    switch (strtolower($_SERVER['PATH_INFO'])) {
      case '/v1/campuses':
      case '/v1/campuses/':
        $i = new Insties();
        echo json_encode($i->insties);
        break;
      case '/v1/visitors':
      case '/v1/visitors/':
        Logs::getVisitors();
        break;
      case '/v1/account':
      case '/v1/account/':
        $u = new Users();
        $u->auth();
        $u->getAccount();
        break;
      case '/v1/users':
      case '/v1/users/':
        Users::getUsers();
        break;
      case '/v1/users/verify':
      case '/v1/users/verify/':
        Users::verifyUser();
        break;
      case '/v1/account/ads':
      case '/v1/account/ads/':
        $u = new Users();
        $u->auth();
        $u->getAds();
        break;
      case '/v1/ads':
      case '/v1/ads/':
        Ads::getAds();
        break;
      case '/v1/ads/count':
      case '/v1/ads/count/':
        Ads::getAdsCount();
        break;
      case '/v1/image/thumb.jpg':
      case '/v1/image/thumb.jpg/':
        Image::getThumb();
        break;
      case '/v1/image/large.jpg':
      case '/v1/image/large.jpg/':
        Image::getLarge();
        break;
      case '/v1/messages':
      case '/v1/messages/':
        $u = new Users();
        $u->auth();
        $u->getMessages();
        break;
      case '/v1/credits':
      case '/v1/credits/':
        $u = new Users();
        $u->auth();
        $u->getCredits();
        break;
      case '/v1/ads/promotions':
      case '/v1/ads/promotions/':
        Ads::getPromoAds();
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
        Users::newUser();
        break;
      case '/v1/ads':
      case '/v1/ads/':
        $u = new Users();
        $u->auth();
        $u->postAd();
        break;
      case '/v1/ads/delete':
      case '/v1/ads/delete/':
        $u = new Users();
        $u->auth();
        $u->deleteAd();
        break;
      case '/v1/users/auth':
      case '/v1/users/auth/':
        Users::authUser();
        break;
      case '/v1/users/verify':
      case '/v1/users/verify/':
        Users::sendVerificationUser();
        break;
      case '/v1/users/recovery':
      case '/v1/users/recovery/':
        Users::recoverUser();
        break;
      case '/v1/messages':
      case '/v1/messages/':
        $u = new Users();
        $u->auth();
        $u->postMessage();
        break;
      case '/v1/credits':
      case '/v1/credits/':
        $u = new Users();
        $u->auth();
        $u->postCredits();
        break;
      case '/v1/visitors':
      case '/v1/visitors/':
        // Logs::visit();
        break;
      case '/v1/account/confirm':
      case '/v1/account/confirm/':
        UI::confirm();
        break;
      case '/v1/account/edit':
      case '/v1/account/edit/':
        $u = new Users();
        $u->auth();
        $u->putAccount();
        break;
      case '/v1/account/delete':
      case '/v1/account/delete/':
        $u = new Users();
        $u->auth();
        $u->deleteUser();
        break;
      default:
        break;
    }
  }
}
function handePut(){
  if (isset($_SERVER['PATH_INFO'])){
    switch (strtolower($_SERVER['PATH_INFO'])) {
      case '/v1/account':
      case '/v1/account/':
        $u = new Users();
        $u->auth();
        $u->putAccount();
        break;
      case '/v1/messages':
      case '/v1/messages/':
        $u = new Users();
        $u->auth();
        $u->putMessages();
        break;
      case '/v1/ads/promotions':
      case '/v1/ads/promotions/':
        $u = new Users();
        $u->auth();
        $u->putPromotion();
        break;
      default:
        break;
    }
  }
}
function handleDelete(){
  if (isset($_SERVER['PATH_INFO'])){
    switch ($_SERVER['PATH_INFO']) {
      case '/v1/ads':
      case '/v1/ads/':
        Ads::deleteAds();
        break;
      case '/v1/account':
      case '/v1/account/':
        Users::deleteUser();
        break;
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
