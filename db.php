<?php
$dbname = 'plotlets';
$server = 'localhost';
$user = 'root'; 
$pass = '';

$dbh = new PDO('mysql:host='.$server.'; dbname='.$dbname, $user, $pass, 
    array(PDO::ATTR_PERSISTENT => true)
);
$dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);