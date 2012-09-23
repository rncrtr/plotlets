<!--lightbox-->
<div id="overlay"></div>
<div id="lightbox">
	<div id="lbcontain">
		<div id="x" onclick="$('#overlay').hide(); $('#lightbox').hide(); $('#inner').html('');" style="position: absolute; right: 10px; top: 10px;">
			<i class="icon-remove"></i>
		</div>
		<h2 class="lb_title">Add/Edit Card</h2>
		<div id="lb_content">
			<div class="lb_inner">
				<div class="clearfix">
				<b>Content:</b><br />
				<textarea rows="10" style="width: 95%;"></textarea>
				</div>
				<div class="clearfix">
					<b>Color:</b><br />
					<!--available colors loop-->
						<div class="colorclick neon-green">&nbsp;</div>
						<div class="colorclick blue">&nbsp;</div>
						<div class="colorclick light-blue">&nbsp;</div>
						<div class="colorclick red">&nbsp;</div>
					<!--/available colors-->
				</div><br />
				<div class="clearfix">
					<b>Column:</b><br />
					<!--available columns loop-->
						<div class="columnclick">1</div>
						<div class="columnclick">2</div>
						<div class="columnclick">3</div>
						<div class="columnclick">4</div>
						<div class="columnclick">5</div>
						<div class="columnclick">6</div>
						<div class="columnclick">7</div>
						<div class="columnclick">8</div>
						<div class="columnclick">9</div>
						<div class="columnclick">10</div>
						<div class="columnclick">11</div>
						<div class="columnclick">12</div>
						<br /><br />
						<div class="columnclick">13</div>
						<div class="columnclick">14</div>
						<div class="columnclick">15</div>
						<div class="columnclick">16</div>
						<div class="columnclick">17</div>
						<div class="columnclick">18</div>
						<div class="columnclick">19</div>
						<div class="columnclick">20</div>
						<div class="columnclick">21</div>
						<div class="columnclick">22</div>
						<div class="columnclick">23</div>
						<div class="columnclick">24</div>
					<!--/available columns-->
				</div><br />
				<div class="clearfix">
					<button class="right btn btn-primary">Save</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!--/lightbox-->