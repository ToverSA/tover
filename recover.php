<?php
include_once('dashboard/_php/v1/conf.php');
include_once('dashboard/_php/v1/users.php');
if (isset($_REQUEST['r_token'])){
  $m = -1;
  if (isset($_POST['pwd'])){
    if (strcmp($_POST['pwd'], $_POST['repwd']) == 0){
      $token = base64_decode($_REQUEST['r_token']);
      Users::changePassword($token, $_POST['pwd']);
      $m = 0;
    } else {
      $m = 1;
    }
  }
} else {
  header('Location: /account');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reset your password</title>
    <link rel="stylesheet" href="/styles/theme.css"/>
    <style>
        .wrapper{
            margin: 30px auto;
            max-width: 500px;
            width: 100%;
            background-color: #FFF;
            box-shadow: 0 1px 1px 1px #CCC;
        }
        .wrapper p.body{
          text-align: center;
          font-size: 1.4em;
          color: #AAA;
        }
        .wrapper h1.title{
            color: #FFF;
            margin: 0;
            padding: 10px;
        }
        .wrapper .err{
          display: block;
          width: 98%;
          margin: 1%;
          padding: 10px;
          text-align: center;
        }
        .wrapper > form input[type=password], .wrapper > form label{
            display: block;
            width: 98%;
            margin: 1%;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <h1 class="title color-primary">Reset your password</h1>
        <?php echo "<p class=\"body\">Reset password for " . $_GET["email"] . "</p>" ?>
        <form action="" method="post">
           <label for="pass">Enter password</label>
            <input name="pwd" type="password" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z]).{4,}" title="Password must contain a lowercase letter, a digit and be at least four characters long">
            <label for="repwd">Re-enter password</label>
            <input name="repwd" type="password" placeholder="Re-enter" pattern="(?=.*\d)(?=.*[a-z]).{4,}" title="Password must contain a lowercase letter, a digit and be at least four characters long">
            <?php if ($m == 1){ echo "<span class=\"err\">Passwords do not match!</span>\n"; } ?>
            <div class="btns">
                <a href="/account">
                    <span class="color-accent-inv">CANCEL</span>
                </a>
                <input type="submit" class="color-accent" value="RESET"/>
            </div>
        </form>
    </div>
</body>
</html>
