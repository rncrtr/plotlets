<!--TEMPLATES-->
<div id="templates" class="hidden">
	<div id="_plot">
		<div class="plot">
			<div class="fl plot-ctrl">
				<button type="button" class="plot-view btn btn-small btn-inverse"><i class="icon-search icon-white"></i>&nbsp;View Cards</button>
			</div>
			<div class="plot-list-title-view">
				<div class="fl plot-list-title"></div>
				<i class="icon-pencil icon-blue fl plot-list-title-edit"></i>
			</div>
			<div class="plot-list-title-edit cf" style="display: none;">
				<textarea></textarea>
				<i class="icon-trash fl card-delete"></i>
				<i class="icon-remove icon-red fr card-close"></i>
				<i class="icon-ok icon-green fr card-save"></i>
			</div>
			<div class="cf">&nbsp;</div>
			<br />
		</div>
	</div>
	<div id="_column">
		<div class="column">
			<span class="column-num fl"></span>
			<i class="icon-plus icon-green fr column-add-top"></i>
			<i class="icon-minus icon-red fr column-delete-top"></i>
			<div class="column-header">
				<div class="column-ctrl" style="display: none;">
					<span class="column-ctrl-text">Move column before:</span>
					<select class="column-move-select center" data-select-col="">
						<option value="x">--</option>
						<option value="0">1</option>
						<option value="1">2</option>
						<option value="2">3</option>
						<option value="3">4</option>
						<option value="4">5</option>
						<option value="5">6</option>
						<option value="6">7</option>
						<option value="7">8</option>
						<option value="8">9</option>
						<option value="9">10</option>
						<option value="10">11</option>
						<option value="11">12</option>
					</select>
				</div>
				<div class="column-title"></div>
			</div>
			<div class="column-content"></div>
			<div class="column-footer">
				<div class="card-add center"><button class="card-add-btn btn btn-primary"><i class="icon-plus icon-white"></i> Card</button></div>
			</div>
		</div>
	</div>
	<div id="_card">
		<div class="card">
			<div class="card-content-view cf rounded">
				<div class="card-content">edit me</div>
				<i class="icon-trash fl card-delete"></i>
				<i class="icon-pencil icon-blue fr card-edit"></i>
			</div>
			<div class="card-content-edit cf rounded" style="display: none;">
				<textarea></textarea>
				<div class="colors cf">
					<?php foreach($colors as $color){	?>
						<div class="colorclick <?=$color['name']?>" data-color-value="<?=$color['value']?>" data-color-id="<?=$color['id']?>">&nbsp;</div>
					<?php } ?>
				</div>
				<i class="icon-trash fl card-delete"></i>
				<i class="icon-remove icon-red fr card-close"></i>
				<i class="icon-ok icon-green fr card-save"></i>
			</div>
		</div>
	</div>
	<div id="_titlecard">
		<div class="title-card">
			<div class="card-content-view cf">
				<div class="title-content">column title</div>
				<!--<i class="icon-trash fl card-delete"></i>-->
				<i class="icon-pencil icon-blue fr title-edit"></i>
			</div>
			<div class="card-content-edit cf" style="display: none;">
				<textarea></textarea>
				<!--<i class="icon-trash fl card-delete"></i>-->
				<i class="icon-remove icon-red fr title-close"></i>
				<i class="icon-ok icon-green fr title-save"></i>
			</div>
		</div>
	</div>
</div>
<!--/TEMPLATES-->