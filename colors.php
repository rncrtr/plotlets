<style>
/* colors */
<?php 
	$colors = array();
	$sql = "SELECT * FROM colors ORDER BY id";
	$cnt = 0;
	foreach($dbh->query($sql) as $row){
		echo '.'.$row['name'].'{background: #'.$row['value'].';}
		';
		$colors[$cnt]['id'] = $row['id']; 
		$colors[$cnt]['name'] = $row['name']; 
		$colors[$cnt]['value'] = $row['value']; 
		$cnt++;
	}
?>
</style>