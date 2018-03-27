<?php
require_once('conf.php');
require_once('insties.php');
require_once('admin.php');
function handlePost(){
  // print_r($_SERVER['PATH_INFO']);
  if (isset($_SERVER['PATH_INFO'])){
    switch ($_SERVER['PATH_INFO']) {
        case '/admin/auth':
        case '/admin/auth/':
          $admin = new Admin($_REQUEST['username'], $_REQUEST['password']);
          $admin->isAuth();
          break;
        case '/admin/campuses':
        case '/admin/campuses/':
          $admin = new Admin();
          $admin->addCampus();
          break;
      default:
        break;
    }
  }
}
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
  handlePost();
}
?>
