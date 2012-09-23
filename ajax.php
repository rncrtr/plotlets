<?php 
header('Content-Type: application/json');
require('db.php'); 
?>
<?php
if($_POST){
	// inplace editor
	$el = $_POST['element_id'];
	$updval = $_POST['update_value'];
	$origval = $_POST['orginal_value'];
	$recid = $_POST['recid'];
	$dbits = explode('-',$el);
	$tbl = $dbits[0];
	$field = $dbits[1];
	$recid = $dbits[2];
	$findqry = "SELECT $field FROM $tbl WHERE id=$recid";
	$rowcnt = count($dbh->query($findqry)->fetchColumn());
	if($rowcnt > 0){
		//echo 'upd row';
		$qrystr = "UPDATE $tbl SET $field='$updval' WHERE id=$recid";
		//echo $qrystr;
		$dbh->query($qrystr);
	}else{	
		echo 'add new';
	}
	echo $updval;
}

if($_GET){
	if($_GET['fn']=='card-load'){
		$plotid = $_GET['plot'];
		$sql = "SELECT cards.*,colors.value as color FROM cards LEFT JOIN colors on cards.color_id=colors.id WHERE plot_id=$plotid ORDER BY col,row ASC";
		$cards = $dbh->query($sql)->fetchAll();
		echo json_encode($cards);
	}
	if($_GET['fn']=='card-add'){
		$plotid = $_GET['plot'];
		$col = $_GET['col'];
		$row = $_GET['row'];
		$sql = "INSERT INTO cards (plot_id,content,col,row) VALUES ($plotid,'edit me',$col,$row);";
		$dbh->query($sql);
		$card = $dbh->query("SELECT LAST_INSERT_ID() as id")->fetch();
		echo json_encode($card);
	}
	if($_GET['fn']=='card-edit'){
		$id = $_GET['id'];
		$sql = "SELECT * FROM cards WHERE id=$id";
		$card = $dbh->query($sql)->fetch();
		echo json_encode($card);
	}
	if($_GET['fn']=='card-save'){
		$id = $_GET['id'];
		$content = $_GET['content'];
		$color = $_GET['color'];
		$sql = "UPDATE cards SET content='$content',color_id=$color WHERE id=$id";
		$dbh->query($sql);
		echo $content;
	}
	if($_GET['fn']=='card-close'){
		$id = $_GET['id'];
		$sql = "SELECT * FROM cards WHERE id=$id";
		$card = $dbh->query($sql)->fetch();
		//var_dump($card);
		echo $card['content'];
	}
	if($_GET['fn']=='card-sort-save'){
		$row = $_GET['row'];
		$col = $_GET['col'];
		$id = $_GET['id'];
		$sql = "UPDATE cards SET row=$row,col=$col WHERE id=$id";
		$dbh->query($sql);
	}
}

/*
$editform .= '<div class="columns cf">';
	$editform .= '<span class="title">Col:&nbsp;</span>';
	// loop this for avail columns
	$editform .= '<div class="columnclick">1</div>';
$editform .= '</div>';
*/

$dbh = null;
?>