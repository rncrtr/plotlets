<!--TEMPLATES-->
<div id="templates" class="hidden">
	<div id="_column">
		<div class="column">
			<div class="column-header">
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
				<i class="icon-pencil icon-blue fr card-edit"></i>
			</div>
			<div class="card-content-edit cf" style="display: none;">
				<textarea></textarea>
				<!--<i class="icon-trash fl card-delete"></i>-->
				<i class="icon-remove icon-red fr card-close"></i>
				<i class="icon-ok icon-green fr title-save"></i>
			</div>
		</div>
	</div>
</div>
<!--/TEMPLATES-->