<?php 
require_once('db.php');
$plotid = 1;
$cardid1 = 1;
$sql = "SELECT * FROM cards WHERE plot_id=$plotid";
$dbh->query($sql);
?>
<!DOCTYPE html>
<html>
<head>
	<title>plotlets</title>
	<meta charset="utf-8">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/bootstrap-responsive.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/cupertino/jquery-ui-1.8.21.custom.css">
	<link rel="stylesheet" href="js/smoke/smoke.css">
	<link rel="stylesheet" href="js/smoke/themes/100s.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" /></script>	
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js" ></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/jquery.editinplace.js"></script>
	<script type="text/javascript" src="js/smoke/smoke.js"></script>
	<style>
		*{font-family: helvetica, arial, sans-serif;}
		body{font-size: 12px; min-width: 100%; width: 1000%; background: #FFF; margin: 10px;}
		.left{text-align: left;}
		.center{text-align: center;}
		.right{text-align: right;}
		.hidden{display: none;}
		.fl{float: left;}
		.fr{float: right;}

		.meta{padding-bottom: 10px; padding-left: 10px;}
		.meta .title{font-size: 16px; width: 450px; border: 0px; border-bottom: 1px solid #00137F; margin-top: 10px; padding: 5px 10px 5px 0px; }
		
		.column {font-family: helvetica, arial, sans-serif; width: 200px; float: left; min-height: 600px; border-right: 1px solid #e0e0e0;}
		.column:last-child{border-right: 0px;}
		.column-content{min-height: 50px;}
		.column-ctrl{margin: 10px; min-height: 35px;}
		.column-title{margin-left: 10px; font-size: 12px; font-style: italic; min-height: 35px; font-weight: 600;}
		.anchor-title{margin-left: 10px; font-size: 12px; font-style: italic; min-height: 35px; font-weight: 600;}
		.card{margin: 0px 10px 10px 10px;}
		.card-content-view {margin: 10px; padding: 5px; min-height: 35px;}

		.card-content-edit {padding: 0.4em; line-spacing: 1em;}
		.card-content-edit textarea{width: 160px; height: 60px;}
		.ctrl,.ctrl-edit{ margin: 5px 5px 5px 5px;}
		.ui-sortable-placeholder { border: 1px dotted black; visibility: visible !important; height: 50px !important; }
		.ui-sortable-placeholder * { visibility: hidden; }

		/*
		.neon-green{background: #33FF33; color: #000;}
		.light-blue{background: #33A1DE; color: #000;}
		.blue{background: #0000FF; color: #FFF;}
		.red{background: #E3170D; color: #FFF;}
		.yellow{background: #E6B426; color: #000;}
		*/
		.title input.inplace_field{width: 300px;}
		.column-title input.inplace_field{width: 160px;}
		textarea.inplace_field{width: 160px; height: 60px;}


		/* edit form */
		.card-content-edit{}
		.card-content-edit textarea{width: 160px; height: 60px;}
		.card-content-edit .title{float: left; font-size: 12px; font-weight: bold;}
		.card-add,.card-save,.card-close,.card-delete{cursor: pointer;}

		/* add/edit */
		.colors{padding-bottom: 10px;}
		.colorclick{float: left; font-size: 11px; width: 15px; border: 1px solid #000; text-align: center; margin-right: 5px; cursor: pointer;}
		.columnclick{float: left; font-size: 11px; width: 10px; border: 0px solid #696969; text-align: center; margin-right: 5px; cursor: pointer;}
	</style>
	<?php include('colors.php'); ?>
</head>
<body>
	<div id="msg"></div>
<div class="content" data-plot="<?=$plotid ?>">
	<!--meta-->
	<div class="meta clearfix">
		<div id="plots-title" class="title editable">Snora and the Cruel Complications</div>
	</div>
	<!--/meta-->
	<!--columns-->
	<div id="columns">
		<div class="column" data-col="1">
			<div class="column-header">
				<div class="anchor-title">Anchors</div>
			</div>
			<div class="column-content">

			</div>
			<div class="column-footer">
				<div class="card-add center"><button class="card-add-btn btn btn-primary"><i class="icon-plus icon-white"></i> Add Card</button></div>
			</div>
		</div>
		<div id="column-ctrl" class="column">
			<div class="center">
				<i class="icon-minus column-delete"></i>
				<i class="icon-plus column-add"></i>
			</div>
		</div>
	</div>
	<!--/columns-->
</div>
<?php require_once('templates.php'); ?>
<script src="js/app.js"></script>
</body>
</html>
<?php $dbh = null;