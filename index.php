<!--
TODO: 
	- Add/Remove columns
	- Add/Edit/Remove notes
	- change color of notes
	- change number of columns
	- Save column and notes positions in the database (iterate with jQ to save serialized?)
	- make accounts to login
	- make discreet projects for each screen
-->
<meta charset="utf-8">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" /></script>	
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js" ></script>	
	<link rel="stylesheet" type="text/css" href="css/cupertino/jquery-ui-1.8.21.custom.css">
	
	<style>
	body{font-size: 12px;}
	.column { width: 170px; float: left; padding-bottom: 100px; }
	.portlet { margin: 0 1em 1em 0; }
	.portlet-header { margin: 0.3em; padding-bottom: 4px; padding-left: 0.2em; }
	.portlet-header .ui-icon { float: right; }
	.portlet-content { padding: 0.4em; }
	.ui-sortable-placeholder { border: 1px dotted black; visibility: visible !important; height: 50px !important; }
	.ui-sortable-placeholder * { visibility: hidden; }
	</style>
	<script>
	$(function() {
		$( ".column" ).sortable({
			connectWith: ".column"
		});

		$( ".portlet" ).addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
			.find( ".portlet-header" )
				.addClass( "ui-widget-header ui-corner-all" )
				.prepend( "<span class='ui-icon ui-icon-minusthick'></span>")
				.end()
			.find( ".portlet-content" );

		$( ".portlet-header .ui-icon" ).click(function() {
			$( this ).toggleClass( "ui-icon-minusthick" ).toggleClass( "ui-icon-plusthick" );
			$( this ).parents( ".portlet:first" ).find( ".portlet-content" ).toggle();
		});

		$( ".column" ).disableSelection();
	});
	</script>


<div class="demo">

<div class="column">
<strong>1</strong>
	<div class="portlet">
		<div class="portlet-header">Feeds</div>
		<div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
	</div>
	
	<div class="portlet">
		<div class="portlet-header">News</div>
		<div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
	</div>

</div>

<div class="column">
<strong>2</strong>
	<div class="portlet">
		<div class="portlet-header">Shopping</div>
		<div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
	</div>

</div>

<div class="column">
<strong>3</strong>
	<div class="portlet">
		<div class="portlet-header">Links</div>
		<div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
	</div>
	
	<div class="portlet">
		<div class="portlet-header">Images</div>
		<div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
	</div>

</div>
<div class="column">
	<strong>4</strong>
</div>
<div class="column">
	<strong>5</strong>
</div>
<div class="column">
	<strong>6</strong>
</div>
<div class="column">
	<strong>7</strong>
</div>
<div class="column">
	<strong>8</strong>
</div>
</div>