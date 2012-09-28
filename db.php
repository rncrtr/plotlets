<?php
// dev
if($_SERVER['HTTP_HOST']=='testwww.dev'){
	$dbname = 'plotlets';
	$server = 'localhost';
	$user = 'root'; 
	$pass = '';
}
/*
$link = mysql_connect("$hostname:$port", $username, $password);
$db_selected = mysql_select_db($db, $link);
*/
$dbh = new PDO('mysql:host='.$server.'; dbname='.$dbname, $user, $pass, 
    array(PDO::ATTR_PERSISTENT => true)
);
$dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);