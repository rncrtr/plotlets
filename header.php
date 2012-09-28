<?php 
session_start();
$root = '/plotlets';
require_once('db.php');
$plotid = 1;
?>
<!DOCTYPE html>
<html>
<head>
	<title>plotlets</title>
	<meta charset="utf-8">
<!--jquery/ui-->
	<link rel="stylesheet" type="text/css" href="css/cupertino/jquery-ui-1.8.21.custom.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" /></script>	
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js" ></script>
<!--bootstrap-->
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/bootstrap-responsive.css" rel="stylesheet">
	<script src="js/bootstrap.min.js"></script>
<!--smoke signal/alert/confirm-->
	<link rel="stylesheet" href="js/smoke/smoke.css">
	<link rel="stylesheet" href="js/smoke/themes/100s.css">
	<script type="text/javascript" src="js/smoke/smoke.js"></script>
	<?php include('css.php'); ?>
	<?php include('colors.php'); ?>
</head>
<body>
	<div id="wrap">
		<?php if(!empty($_SESSION['loggedin'])){ ?>
			<h1 class="app-title">plotlets</h1>
		<?php } ?>
		<div id="nav" class="fl right" style="width: 1000px; margin-top: -40px;">
			<?php if(!empty($_SESSION['loggedin'])){ ?>
				<a href="?plots">plots</a>
				<a href="?logout">logout</a>
			<?php } ?>
		</div>
		<div id="msg"></div>