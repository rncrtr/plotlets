$(function(){

	$( ".card-content-view" )
		.find( ".card-content" );
	$( ".column" ).disableSelection();

/* PLOT FN */
	// plot add
	$(document).on('click','.plot-add-btn',function(){
		var me = $(this);
		console.log('plot-add');
		var plottitle = me.siblings('#plot-title').val();
		var userid = me.siblings('#plot-title').attr('data-user');
		$.getJSON('ajax.php?fn=plot-add&user='+userid+'&title='+escape(plottitle),function(result){
			//console.log(result);
			me.attr('data-plot',result.id);
		});
	});

	// plot view
	$(document).on('click','.plot-view',function(){
		var me = $(this);
		var plotid = me.attr('data-plot-id');
		window.location.href = '/plotlets/?p='+plotid;
	});


/* COLUMN FN */
	$(document).on('click','.column-add',function(){
		console.log('column-add');
		$('#wrap').css('width',$('#wrap').css('width')+$('#column-ctrl').css('width'));
		console.log('wrapwidth: '+$('#wrap').css('width'));
		$('#column-ctrl').before($('#_column').html());
		$( ".column-content" ).sortable({connectWith: ".column-content"});
		var colcnt = $('#columns > .column').length - 1;
		$(this).parent().parent().prev().attr('data-col',colcnt);
		$(this).parent().parent().prev().children('.column-header').children('.column-title').append($('#_titlecard').html());
		//$(this).parent().parent().prev().attr('id','columns-title-'+colcnt);
		if(colcnt > 1){
			$('.column-delete').show();
		}
		var wrapwidth = $('#wrap').css('width').replace(/px/, "");
		var columnwidth = $('.column:last').css('width').replace(/px/, "");
		console.log('colwidth: '+columnwidth);
		var newwrap = parseInt(wrapwidth) + parseInt(columnwidth);
		$('#wrap').css('width',newwrap+'px');
		console.log('wrapwidth: '+$('#wrap').css('width'));
	});
	$(document).on('click','.column-delete',function(){
		var me = $(this);
		console.log('column-delete');
		var colcnt = $('#columns > .column').length - 1;
		smoke.confirm('Delete this column? Are you sure?',function(e){
			if (e){
				me.parent().parent().prev().remove();
				if(colcnt < 3){
					$('.column-delete').hide();
				}
			} 
		});
		
	});

/* CARD FN */
	// card load
	//$('#msg').load('ajax.php?fn=card-load&plot=1');
	var plotid = $('.plot').attr('data-plot');
	if(plotid > 0){
		$('#page-title').load('ajax.php?fn=plot-title-load&plot='+plotid);
		$.getJSON('ajax.php?fn=card-load&plot='+plotid,function(result){
			$.each(result, function(){
				var colcnt = $('#columns > .column').length - 1;
				console.log('colcnt: '+colcnt);
				while(this.col > colcnt){
					//create column
					console.log('column-add');
					$('#column-ctrl').before($('#_column').html());
					$( ".column-content" ).sortable({
						connectWith: ".column-content",
						update: function(event, ui) {
				        	console.log('card id: '+ui.item.attr('data-id'));
				        	var myrow = ui.item.index()+1;
				        	var mycol = ui.item.closest('.column').attr('data-col');
				        	console.log("New position: " + mycol +','+myrow);
				        	var cardid = ui.item.attr('data-id');
				        	$('#msg').load('ajax.php?fn=card-sort-save&id='+cardid+'&row='+myrow+'&col='+mycol);
				   		},
				   		delay: 300
					});
					var wrapwidth = $('#wrap').css('width').replace(/px/, "");
					var columnwidth = $('.column:last').css('width').replace(/px/, "");
					console.log('colwidth: '+columnwidth);
					var newwrap = parseInt(wrapwidth) + parseInt(columnwidth);
					$('#wrap').css('width',newwrap+'px');
					console.log('wrapwidth: '+$('#wrap').css('width'));
					var truecolnum = colcnt+1;
					$('#column-ctrl').prev().attr('data-col',truecolnum);
					$('#column-ctrl').prev().children('.column-header').children('.column-title').append($('#_titlecard').html());
					//$('#column-ctrl').prev().children().find('.column-title').attr('id','columns-title-'+plotid+'-'+truecolnum);
					//$('#column-ctrl').prev().children().find('.column-title').load('ajax.php?fn=title-load&plot='+plotid+'&col='+truecolnum);
					if(colcnt+1 > 1){
						$('.column-delete').show();
					}

					colcnt = $('#columns > .column').length - 1;
					if(this.col == colcnt){
						break;
					}
				}
				// column with the corrrect data-col id add cards
				var datacol = '.column[data-col='+this.col+']';

				if(this.row == 0){
					$(datacol).children('.column-header').children('.column-title').children('.title-card').children('.card-content-view').children('.title-content').html(this.content);
					$(datacol).children('.column-header').children('.column-title').children('.title-card').attr('data-id',this.id);
				}else{
					$(datacol).children('.column-title').append($('#_titlecard').html());
					$(datacol).children('.column-content').append($('#_card').html());
					var thiscard = $(datacol).children('.column-content').children('.card:last');
					var thistitle = $(datacol).children('.column-title').children('.title-card');
					thiscard.attr('data-id',this.id);
					thiscard.find('.card-content').html(this.content);
					thiscard.attr('data-color-value',this.color);
					thiscard.attr('data-color-id',this.color_id);
					thiscard.children('.card-content-view').css('background-color','#'+this.color);
					thiscard.children('.card-content-edit').css('background-color','#'+this.color);
				}
			}); // each
		}); // getJSON
	}

	// card add
	$(document).on('click','.card-add-btn',function(){
		var me = $(this);
		me.parent().parent().siblings('.column-content').append($('#_card').html());
		var mycol = me.closest('.column').attr('data-col');
		var myrow = me.parent().parent().siblings('.column-content').children('.card').size();
		var plotid = $('#content').attr('data-plot');
		//console.log(myrow);
		$.getJSON('ajax.php?fn=card-add&plot='+plotid+'&col='+mycol+'&row='+myrow,function(result){
			//console.log(result);
			me.parent().parent().siblings('.column-content').children('.card:last').attr('data-id',result.id);
		});
	});

	// card edit
	$(document).on('click','.card-edit',function(){
		var me = $(this);
		console.log('card-edit');
		var oldcontent = $(this).siblings('.card-content').html();
		if(oldcontent!=null && oldcontent!=""){
			oldcontent = html2md(oldcontent);
		}
		$(this).parent().hide();
		$(this).parent().siblings('.card-content-edit').children('textarea').html(oldcontent);
		$(this).parent().siblings('.card-content-edit').show();
		$.getJSON('ajax.php?fn=card-edit&id=1',function(result){
			me.parent().parent('.card').before($('#_card-editor').html());
		});
		// hide edit icon while in edit mode
		//$(this).parent().hide();
		//$(this).parent().siblings('.portlet-content-edit').removeClass('hidden');
	});

	// title edit
	$(document).on('click','.title-edit',function(){
		var me = $(this);
		console.log('card-edit');
		var titlecontent = $(this).siblings('.title-content').html();
		console.log(titlecontent);
		if(titlecontent!=null && titlecontent!=""){
			titlecontent = html2md(titlecontent);
		}
		$(this).parent().hide();
		$(this).parent().siblings('.card-content-edit').show();
		$(this).parent().siblings('.card-content-edit').children('textarea').html(titlecontent);
		$.getJSON('ajax.php?fn=card-edit&id=1',function(result){
			me.parent().parent('.card').before($('#_card-editor').html());
		});
		// hide edit icon while in edit mode
		//$(this).parent().hide();
		//$(this).parent().siblings('.portlet-content-edit').removeClass('hidden');
	});

	//title save
	$(document).on('click','.title-save',function(){
		var me = $(this);
		console.log('title-save');
		var cardid = $(this).closest('.title-card').attr('data-title-id');
		var cardcontent = me.siblings('textarea').val();
		if(cardcontent!=null){
			cardcontent = md2html(cardcontent);
		}
		var mycol = me.closest('.column').attr('data-col');
		var cardcolor = $(this).closest('.card').attr('data-color-id');
		$(this).parent().siblings('.card-content-view').children('.title-content').html(cardcontent);
		$.get('ajax.php?fn=title-save&plot='+plotid+'&col='+mycol+'&content='+escape(cardcontent));
		console.log('card-close-after-save');
		$(this).parent().hide();
		$(this).parent().siblings('.card-content-view').show();
		//$(this).parent().siblings('.card-content-view').css('background-color','#'+$(this).closest('.title-card').attr('data-color-value'));
	});

	// card save
	$(document).on('click','.card-save',function(){
		console.log('card-save');
		var cardid = $(this).closest('.card').attr('data-id');
		var cardcontent = $(this).siblings('textarea').val();
		if(cardcontent!=null){
			cardcontent = md2html(cardcontent);
		}
		var cardcolor = $(this).closest('.card').attr('data-color-id');
		$(this).parent().siblings('.card-content-view').children('.card-content').html(cardcontent);
		$.get('ajax.php?fn=card-save&id='+cardid+'&content='+escape(cardcontent)+'&color='+cardcolor);
		console.log('card-close-after-save');
		$(this).parent().hide();
		$(this).parent().siblings('.card-content-view').show();
		$(this).parent().siblings('.card-content-view').css('background-color','#'+$(this).closest('.card').attr('data-color-value'));
	});

	// card close
	$(document).on('click','.card-close',function(){
		console.log('card-close');
		$(this).parent().hide();
		$(this).siblings('textarea').val($(this).parent().siblings('.card-content-view').children('.card-content').html());
		$(this).parent().siblings('.card-content-view').show();
	});

	// title close
	$(document).on('click','.title-close',function(){
		console.log('title-close');
		$(this).parent().hide();
		$(this).siblings('textarea').val($(this).parent().siblings('.card-content-view').children('.title-content').html());
		$(this).parent().siblings('.card-content-view').show();
	});

	// card delete
	$(document).on('click','.card-delete',function(){
		var me = $(this);
		console.log('card-delete');
		smoke.confirm('Delete this card? Are you sure?<br />This cannot be undone.',function(e){
			if (e){
				me.parent().parent().remove();
				var cardid = me.closest('.card').attr('data-id');
				$.get('ajax.php?fn=card-delete&id='+cardid);
			} 
		},{ok: 'Delete it',cancel: "Keep it"});
		
	});



	// color click
	$(document).on('click','.colorclick',function(){
		var me = $(this);
		var thiscolor = me.attr('data-color-value');
		var thiscolorid = me.attr('data-color-id');
		$(this).closest('.card').attr('data-color-value',thiscolor);
		$(this).closest('.card').attr('data-color-id',thiscolorid);
		$(this).closest('.card-content-edit').css('background-color','#'+$(this).closest('.card').attr('data-color-value'));
	});

	function html2md(content){
		content = content.replace(/<br>/g,'\r\n');
		content = content.replace(/\<b\>(.*?)\<\/b\>/g, '**$1**');
		content = content.replace(/\<strong\>(.*?)\<\/strong\>/g, '**$1**');
		content = content.replace(/\<em\>(.*?)\<\/em\>/g, '*$1*');
		return content;
	}

	function md2html(content){
		content = content.replace(/\n\r?/g, '<br>');
		content = content.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
		content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
		return content;
	}
});