<?php include('header.php'); ?>
<?php
if(!empty($_SESSION['loggedin']) && !empty($_SESSION['email'])){ ?>
	<?php 
	$userid = $_SESSION['userid'];
	//echo $userid;
	if(isset($_GET['plots'])){ ?>
		<script>
			$('#page-title').html('plots');
			// plot load
			var userid = <?= $userid ?>;
				$.getJSON('ajax.php?fn=plot-load&user='+userid,function(result){
					$.each(result, function(){
						console.log(this.title);
						$('#plots').append($('#_plot').html());
						var thisplot = $('#plots .plot:last-child');
						thisplot.children('.plot-ctrl').children('button').attr('data-plot-id',this.id);
						thisplot.children('.plot-list-title').html(this.title);
					});
				});
		</script>
		<label>Add New Plot:</label>
		<div id="plot-add" class="form-inline">
			<input id="plot-title" type="text" class="input-large" data-user="<?= $userid ?>" placeholder="Plot Title">
			<button class="btn btn-success plot-add-btn"><i class="icon-ok icon-white"></i> Save</button>
		</div><br />
		<h2>Your Plots:</h2><br />
		<div id="plots">
		</div>
	<?php }elseif(isset($_GET['logout'])){
		session_unset();
		session_destroy();
		$_SESSION = array();
		echo 'You have been logged out. <a href="/plotlets/">Login</a> again?';
	}else{ ?>
	<div id="content" class="content plot" data-plot="<?=$_GET['p'] ?>">
		<div class="hr" style="margin-top: -10px;"></div><br />
		<!--columns-->
		<div id="columns">
			<div class="column" data-col="1">
				<div class="column-header">
					<div class="anchor-title">Anchors</div>
				</div>
				<div class="column-content"></div>
				<div class="column-footer">
					<div class="card-add center"><button class="card-add-btn btn btn-small btn-primary"><i class="icon-plus icon-white"></i> Card</button></div>
				</div>
			</div>
			<div id="column-ctrl" class="column">
				<div class="center">
					<button class="btn btn-danger btn-small column-delete" style="display: none;"><i class="icon-minus icon-white"></i> Column</button>
					<button class="btn btn-success btn-small column-add"><i class="icon-plus icon-white"></i> Column</button>
				</div>
			</div>
		</div>
		<!--/columns-->
	</div>
	<?php } //default view ?>
<?php }elseif(!empty($_POST['email']) && !empty($_POST['password'])){
	$email = $_POST['email'];
	$pass = $_POST['password'];
    $checklogin = $dbh->prepare("SELECT * FROM users WHERE email = '".$email."' AND pass = '".$pass."' and active = 1");
    $checklogin->execute();
    $rowcnt = $checklogin->rowCount();  
    if($rowcnt == 1){   
    	$_SESSION['userid'] = $checklogin->fetchColumn();
        $_SESSION['email'] = $email;   
        $_SESSION['loggedin'] = 1;  
        echo '<script>window.location.href="/plotlets/?plots";</script>';
    }else{  
        echo "<h1>Error</h1>";  
        echo "<p>Sorry, your account could not be found. Please <a href=\"index.php\">click here to try again</a>.</p>";  
    }  
}else{ ?>
<div class="para">
	<div class="llax" style="width: 500px;">
		<h2 class="center">Login</h2>
		<br />
		<form class="form-horizontal" action="/plotlets/" method="POST">
		  <div class="control-group">
		    <label class="control-label" for="inputEmail">Email</label>
		    <div class="controls">
		      <input type="text" id="inputEmail" name="email" placeholder="Email">
		    </div>
		  </div>
		  <div class="control-group">
		    <label class="control-label" for="inputPassword">Password</label>
		    <div class="controls">
		      <input type="password" id="inputPassword" name="password" placeholder="Password">
		    </div>
		  </div>
		  <div class="control-group">
		    <div class="controls">
		    	<!--
		      <label class="checkbox">
		        <input type="checkbox"> Remember me
		      </label>
		  		-->
		      <button type="submit" class="btn">Sign in</button>
		    </div>
		  </div>
		</form>
	</div>
</div>
<?php } ?>

<?php include('footer.php'); ?>	