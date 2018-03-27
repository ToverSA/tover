<?php
/**
 *
 */
class Campus{
  public $status = 0;
  private $iid = 0;
  private $iname = '';
  private $cname = '';
  private $cid = 0;
  private function init(&$stmt, $name){
    $stmt->prepare('INSERT INTO campuses SET institutions_id=?, name=?');
    $stmt->bind_param('is', $this->iid, $name);
    $stmt->execute();
    if ($stmt->affected_rows > 0){
      $this->cid = $stmt->insert_id;
      $this->cname = $name;
    }else{
      header('HTTP/1.0 500 Internal Server Error');
    }
  }
  function __construct($iName, $cName){
    $i = ucwords($iName);
    $c = ucwords($cName);
    if (strlen($i) > 0 && strlen($i) > 0){
      $this->con = new mysqli(HOST, USER, PWD, DB);
      $stmt = $this->con->prepare('SELECT id, name FROM institutions WHERE name=?');
      $stmt->bind_param('s', $i);
      $stmt->execute();
      $stmt->bind_result($id, $name);
      if ($stmt->fetch()){
        $this->iname = $name;
        $this->iid = $id;
        $this->init($stmt, $c);
      } else {
        $stmt->prepare('INSERT INTO institutions SET name=?');
        $stmt->bind_param('s', $i);
        $stmt->execute();
        if ($stmt->affected_rows > 0){
          $this->iid = $stmt->insert_id;
          $this->iname = $i;
          $this->init($stmt, $c);
        }
      }
    }
  }

  public function jsonEncoded(){
    $c = new StdClass;
    $c->institution = $this->iname;
    $c->campus = $this->cname;
    return json_encode($c);
  }
}
class Insties{
  public $insties = array();
  public function __construct(){
    $con = new mysqli(HOST, USER, PWD, DB);
    $query = 'SELECT * FROM institutions';
    $stmt = $con->prepare($query);
    $stmt->execute();
    $stmt->bind_result($iid, $iname);
    while ($stmt->fetch()) {
      $i = $s = new StdClass;
      $i->id = $iid;
      $i->name = $iname;
      $i->campuses = array();
      array_push($this->insties, $i);
    }
    $stmt->close();
    foreach ($this->insties as $value) {
      $query = 'SELECT id, name FROM campuses WHERE institutions_id=?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('i', $value->id);
      $stmt->execute();
      $stmt->bind_result($id, $name);
      while ($stmt->fetch()) {
        array_push($value->campuses, array('id' => $id, 'name' => $name));
      }
      $stmt->close();
    }
  }
  public static function getCampuses(){
    $con = new mysqli(HOST, USER, PWD, DB);
    $query = 'SELECT * FROM institutions';
    $stmt = $con->prepare($query);
    $stmt->execute();
    $stmt->bind_result($iid, $iname);
    $arr = array();
    while ($stmt->fetch()) {
      $i = new insties();
      $i->id = $iid;
      $i->name = $iname;
      $i->campuses = array();
      array_push($arr, $i);
    }
    $stmt->close();
    foreach ($arr as $value) {
      $query = 'SELECT id, name FROM campuses WHERE institutions_id=?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('i', $value->id);
      $stmt->execute();
      $stmt->bind_result($id, $name);
      while ($stmt->fetch()) {
        array_push($value->campuses, array('id' => $id, 'name' => $name));
      }
      $stmt->close();
    }
    echo json_encode($arr);
  }
}
?>
