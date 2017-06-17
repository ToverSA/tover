<?php
/**
 * Insties, short for institutions. Basically the users location.
 */
class Campus{}

class Insties{
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
    foreach ($arr as &$value) {
      $query = 'SELECT id, name FROM campuses WHERE inst_id=?';
      $stmt = $con->prepare($query);
      $stmt->bind_param('i', $value);
      $stmt->execute();
      $stmt->bind_result($id, $name);
      while ($stmt->fetch()) {
        $c = new Campus();
        $c->id = $id;
        $c->name = $name;
        array_push($value->campuses, $c);
      }
      $stmt->close();
    }
    echo json_encode($arr);
  }
}
?>
