<?php

$out = 'app/script.js';
$in = [
  'app/app.js',
  'app/scripts/directives.js',
  'app/scripts/services.js',
  'app/scripts/controllers.js',
];
$file = fopen($out, 'w');
$str = '';
foreach ($in as $path) {
  $str = $str . file_get_contents($path);
}
if (fwrite($file, $str)){
  echo "File write success\n";
} else {
  echo "An error occured\n";
}
fclose($file);
?>
