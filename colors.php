<style>
/* colors */
<?php 
	$sql = "SELECT * FROM colors ORDER BY name";
	foreach($dbh->query($sql) as $row){
		echo '.'.$row['name'].'{background: #'.$row['value'].';}
		';
	}
?>
</style>