<?php
$files = array(
  'app/app.js',
  'app/appStore.js',
  'app/eventsDir.js',
  'app/httpFacade.js',
  'app/404/notFoundCtl.js',
  'app/account/accountCtl.js',
  'app/account/actionCtl.js',
  'app/account/consoleCtl.js',
  'app/account/delAccCtl.js',
  'app/account/loginCtl.js',
  'app/account/prefsCtl.js',
  'app/account/recCtl.js',
  'app/account/registerCtl.js',
  'app/account/verifyCtl.js',
  'app/ads/adsCreateCtl.js',
  'app/ads/adsCtl.js',
  'app/header/header.js',
  'app/home/homeCtl.js',
  'app/landing/landingCtl.js',
  'app/messenger/messengerCtl.js',
  'app/messenger/messengerService.js',
  'app/search/searchCtl.js',
  'app/app.js'
);
function rsearch($folder, $pattern_array) {
    $return = array();
    $iti = new RecursiveDirectoryIterator($folder);
    foreach(new RecursiveIteratorIterator($iti) as $file){
        if (in_array(strtolower(array_pop(explode('.', $file))), $pattern_array)){
            $return[] = $file;
        }
    }
    return $return;
}
$variable = rsearch('app/', array('js'));
$files = array();
foreach ($variable as $key => $value) {
  array_push($files, $value->getPathName());
}
$files = array_reverse($files);
$code = "";
foreach ($files as $filename) {
   $code.=file_get_contents("$filename");
}
file_put_contents("app/script.js",$code);
?>
