<?php
require_once('conf.php');
require_once('insties.php');
require_once('admin.php');
function handleGet(){
  if (isset($_SERVER['PATH_INFO'])){
    switch ($_SERVER['PATH_INFO']) {
        case '/admin/campuses':
        case '/admin/campuses/':
          $admin = new Admin();
          $admin->getCampuses();
          break;
      default:
        break;
    }
  }
}
handleGet();
?>
