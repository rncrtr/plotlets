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
	<script src="js/jquery-1.7.2.min.js" /></script>	
	<script src="js/jquery-ui.min.js" ></script>
<!--bootstrap-->
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/bootstrap-responsive.css" rel="stylesheet">
	<script src="js/bootstrap.min.js"></script>
<!--stripe-->
<script type="text/javascript" src="js/stripe-v1.js"></script>
<!--smoke signal/alert/confirm-->
	<link rel="stylesheet" href="js/smoke/smoke.css">
	<link rel="stylesheet" href="js/smoke/themes/100s.css">
	<script type="text/javascript" src="js/smoke/smoke.js"></script>
	<?php include('css.php'); ?>
	<?php include('colors.php'); ?>
</head>
<body>
	<div id="wrap">
		<div id="header">
			<h1 id="app-title" class="app-title fl">plotlets:</h1>
			<div id="page-title" class="fl"></div>
			<div class="cf"></div>
			<div id="nav" class="fl right">
				<?php if(!empty($_SESSION['loggedin'])){ ?>
					<a href="?plots">plots</a>
					<a href="?logout">logout</a>
				<?php }else{ ?>
					<a href="?signup">sign-up</a>
					<a href="?login">login</a>
				<?php } ?>
			</div>
			<div class="cf"></div><br />
		</div>
		<div id="msg"></div>