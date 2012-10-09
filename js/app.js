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
	$(document).on('click','.column-add-top',function(){
		var me = $(this);
		console.log('column-add');
		$('#wrap').css('width',$('#wrap').css('width')+$('#column-ctrl').css('width'));
		//console.log('wrapwidth: '+$('#wrap').css('width'));
		me.closest('.column').after($('#_column').html());
		$( ".column-content" ).sortable({connectWith: ".column-content"});
		var newcolnum = parseInt(me.closest('.column').attr('data-col')) + 1;
		//me.closest('.column').next().attr('data-col',newcolnum);
		me.closest('.column').next().children('.column-header').children('.column-title').append($('#_titlecard').html());
		//$(this).parent().parent().prev().attr('id','columns-title-'+colcnt);
		var cnt = 0;
		$('#columns .column').each(function(){
			$(this).attr('data-col',cnt);
			var thiscol = $(this).attr('data-col');
			var cardcnt = 1;
			$(this).children('.column-content').children('.card').each(function(){
				var cardid = $(this).attr('data-id');
				var myrow = cardcnt;
				var mycol = thiscol;
				$.get('ajax.php?fn=card-sort-save&id='+cardid+'&row='+myrow+'&col='+mycol);
				cardcnt++;
			});
			cnt++;
		});
		var wrapwidth = $('#wrap').css('width').replace(/px/, "");
		var columnwidth = $('.column:last').css('width').replace(/px/, "");
		console.log('colwidth: '+columnwidth);
		var newwrap = parseInt(wrapwidth) + parseInt(columnwidth);
		$('#wrap').css('width',newwrap+'px');
		console.log('wrapwidth: '+$('#wrap').css('width'));
	});

/* COLUMN DELETE */
	$(document).on('click','.column-delete-top',function(){
		var me = $(this);
		console.log('column-delete');
		var thiscolid = me.parent('.column').attr('data-col');
		console.log(thiscolid);
		var colcnt = $('#columns > .column').length;
		// delete column
		smoke.confirm('Delete this column? Are you sure?',function(e){
			if (e){
				var titlecardid = me.parent('.column').find('.title-card').attr('data-id');
				console.log('title card '+titlecardid+' deleted');
				if(titlecardid!=undefined){
					$.get('ajax.php?fn=card-delete&id='+titlecardid);
					//console.log('title card '+titlecardid+' deleted');
				}
				// keep cards or delete
				var cardcnt = me.parent('.column').children().find('.card').length;
				if(cardcnt > 0){
					smoke.confirm('Should cards be moved to staging or deleted?',function(f){
						if(f){
							console.log('move cards');
							
							me.parent('.column').children().find('.card').each(function(){
								var cardid = $(this).attr('data-id');
								var myrow = cardcnt;
								var mycol = 0;
								$.get('ajax.php?fn=card-sort-save&id='+cardid+'&row='+myrow+'&col='+mycol);
								cardcnt++;
							});

							// TODO: shift all later card's columns left, minus 1
							me.parent('.column').remove();
							//window.location.reload();
						}else{
							console.log('delete cards');
							me.parent('.column').remove();
						}

					},{ok: 'Move Cards to Staging',cancel: "Delete Cards"});
				}
				$('#columns > .column').each(function(){
					var iteratecol = $(this);
					var colid = iteratecol.attr('data-col');
					console.log('colid cardsort: '+colid);
					//if the each we're in is greater than the column we're deleting, then decrement it and save all cards.
					if(colid > thiscolid){
						var newcolid = colid - 1;
						console.log('col '+colid+' chnx to '+newcolid);
						iteratecol.attr('data-col',newcolid);
						iteratecol.children('.column-content').children('.card').each(function(){
							var thiscard = $(this);
							var cardid = thiscard.attr('data-id');
							var myrow = thiscard.attr('data-row');
							var mycol = newcolid;
							console.log('id: '+cardid+'|r: '+myrow+'|c: '+mycol);
							$.get('ajax.php?fn=card-sort-save&id='+cardid+'&row='+myrow+'&col='+mycol);
						});
					}
				});
			} 
		});
		
	});

/* COLUMN MOVE SELECT */
	$(document).on('change','.column-move-select',function(){
		$(this).parent().parent().parent().html('MOVED!');
		// do all that funky logic here, for moving the column and db col ids
		window.location.reload();
	});

/* TITLE FN*/
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
		$(this).parent().parent().parent().parent().children('.column-ctrl').show();
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
		//var cardcolor = $(this).closest('.card').attr('data-color-id');
		$(this).parent().siblings('.card-content-view').children('.title-content').html(cardcontent);
		$.get('ajax.php?fn=title-save&plot='+plotid+'&col='+mycol+'&content='+escape(cardcontent));
		console.log('card-close-after-save');
		$(this).parent().hide();
		$(this).parent().parent().parent().parent().children('.column-ctrl').hide();
		$(this).parent().siblings('.card-content-view').show();
		//$(this).parent().siblings('.card-content-view').css('background-color','#'+$(this).closest('.title-card').attr('data-color-value'));
	});

	// title close
	$(document).on('click','.title-close',function(){
		console.log('title-close');
		$(this).parent().hide();
		$(this).parent().parent().parent().parent().children('.column-ctrl').hide();
		$(this).siblings('textarea').val($(this).parent().siblings('.card-content-view').children('.title-content').html());
		$(this).parent().siblings('.card-content-view').show();
	});

/* CARD FN */
	// card load
	//$('#msg').load('ajax.php?fn=card-load&plot=1');
	// plot id from container
	var plotid = $('.plot').attr('data-plot');
	var lastcol = 0;
	if(plotid > 0){
		// set page title => plot title
		$('#page-title').load('ajax.php?fn=plot-title-load&plot='+plotid);
		// get cards from db

		$.getJSON('ajax.php?fn=card-load&plot='+plotid,function(result){
			// each card
			console.log('reslen: '+result.length);
				var i = 0;
				var titlecontent = '';
				var nextcol = 1;
				var thiscol = 0;
				while(i < result.length){
					console.log('res: '+result[i].col);
						while(nextcol <= result[i].col){
						//create column
							console.log('column-add '+nextcol);
						// instantiate template
							$('#columns').append($('#_column').html());
						// outer wrapper width
							var wrapwidth = $('#wrap').css('width').replace(/px/, "");
						// column width
							var columnwidth = $('.column:last').css('width').replace(/px/, "");
						// new outer wrapper width including new column
							var newwrap = parseInt(wrapwidth) + parseInt(columnwidth);
							$('#wrap').css('width',newwrap+'px');
							if(result[i].row == 0){
								titlecontent = result[i].content;
							}else{
								titlecontent = 'column title';
							}
							$('#columns > .column:last').children('.column-header').children('.column-title').append($('#_titlecard').html());
							$('#columns > .column:last').children().find('.title-card').attr('data-id',result[i].id);
							$('#columns > .column:last').children().find('.title-content').html(titlecontent);
							$('#columns > .column:last').attr('data-col',nextcol);
							nextcol++;
						} // while new col
					var datacol = '.column[data-col='+result[i].col+']';
					if(result[i].row != 0){
						$(datacol).children('.column-content').append($('#_card').html());
						var thiscard = $(datacol).children('.column-content').children('.card:last');
						var thistitle = $(datacol).children('.column-title').children('.title-card');
						thiscard.attr('data-id',result[i].id);
						thiscard.find('.card-content').html(result[i].content);
						thiscard.attr('data-color-value',result[i].color);
						thiscard.attr('data-row',result[i].row);
						thiscard.attr('data-color-id',result[i].color_id);
						thiscard.children('.card-content-view').css('background-color','#'+result[i].color);
						thiscard.children('.card-content-edit').css('background-color','#'+result[i].color);
					}
					i++;
				} //while
				// make column's cards sortable (drag and drop)
				$( ".column-content" ).sortable({
					connectWith: ".column-content",
					update: function(event, ui){
			        	var myrow = ui.item.index()+1;
			        	var mycol = ui.item.closest('.column').attr('data-col');
			        	var cardid = ui.item.attr('data-id');
			        	var cards = $('.column[data-col='+mycol+']').children().find('.card');
			      		var cardcnt = 1;
			        	$('.column[data-col='+mycol+']').children().find('.card').each(function(){
			        		console.log(this);
			        		myrow = cardcnt;
			        		cardid = $(this).attr('data-id');
			        			$('#msg').load('ajax.php?fn=card-sort-save&id='+cardid+'&row='+myrow+'&col='+mycol);
			        		cardcnt++;
			        	});
			        	
			   		},delay: 300
				});	
				// compensate for array starting with 0	
						//var truecolnum = colcnt+1;
				// tell new column who it is	
						
				// add the title block to new column
						//
						/*
						var mycol = truecolnum;
						var cardcontent = $('#columns > .column:last').children('.column-header').children('.column-title').find('.title-content').html(); 
						$.get('ajax.php?fn=title-save&plot='+plotid+'&col='+mycol+'&content='+escape(cardcontent));
						testfortitle = 0;
						*/

				// count columns again to verify new column added
					//colcnt = $('#columns > .column').length-1;
				// continue to add empty columns in case there are later ones	
				
			// column with the corrrect data-col id add cards
			/*
				var datacol = '.column[data-col='+result.col+']';

				if(result.row == 0){
					$(datacol).children('.column-header').children('.column-title').children('.title-card').children('.card-content-view').children('.title-content').html(result.content);
					$(datacol).children('.column-header').children('.column-title').children('.title-card').attr('data-id',result.id);
				}else{
					$(datacol).children('.column-title').append($('#_titlecard').html());
					$(datacol).children('.column-content').append($('#_card').html());
					var thiscard = $(datacol).children('.column-content').children('.card:last');
					var thistitle = $(datacol).children('.column-title').children('.title-card');
					thiscard.attr('data-id',result.id);
					thiscard.find('.card-content').html(result.content);
					thiscard.attr('data-color-value',result.color);
					thiscard.attr('data-row',result.row);
					thiscard.attr('data-color-id',result.color_id);
					thiscard.children('.card-content-view').css('background-color','#'+result.color);
					thiscard.children('.card-content-edit').css('background-color','#'+result.color);
				}
			//}
		// make column's cards sortable (drag and drop)
			$( ".column-content" ).sortable({
				connectWith: ".column-content",
				update: function(event, ui) {
		        	console.log('card id: '+ui.item.attr('data-id'));
		        	var myrow = ui.item.index()+1;
		        	var mycol = ui.item.closest('.column').attr('data-col');
		        	console.log("New position: " + mycol +','+myrow);
		        	var cardid = ui.item.attr('data-id');
		        	$('#msg').load('ajax.php?fn=card-sort-save&id='+cardid+'&row='+myrow+'&col='+mycol);
		   		},delay: 300
			});		
*/
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