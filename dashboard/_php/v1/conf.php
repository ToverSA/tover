<?php
  define('HOST', 'localhost');
  define('USER', 'root');
  define('PWD', 'rootuser');
  define('DB', 'akomo_db');
  define('MERCHANT_ID', '10005331');
  define('MERCHANT_KEY', 'ch1x261w04qjo');
  define('PAYFAST_URL', 'https://sandbox.payfast.co.za/eng/process');
  define('RETURN_URL', 'http://localhost');
  define('CANCEL_URL', 'http://localhost/payment_canceled');
  define('NOTIFY_URL', 'http://localhost/_php/api.php/notify');
  const CAT = array('BOOKS' => 1, 'ELECTRONICS' => 2, 'PHONES' => 3, 'SERVICES' => 4);
  const RATES = array(100, 200, 500, 1000);
  const DEALS = array('1' => 20, '2' => 35, '3' => 50);
?>
