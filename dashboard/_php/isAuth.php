<?php
session_start();
if (isset($SESSION['id'])){
    header('HTTP/1.0 200 OK');
}else{
    header('HTTP/1.0 403 Forbidden');
}
?>
