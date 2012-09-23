$(function(){
	var cards = $( ".column-content" ).sortable({
		connectWith: ".column-content",
		update: function(event, ui) {
        	console.log('card id: '+ui.item.attr('data-id'));
        	var myrow = ui.item.index();
        	var mycol = ui.item.closest('.column').attr('data-col');
        	console.log("New position: " + mycol +','+myrow);
        	var cardid = ui.item.attr('data-id');
        	$('#msg').load('ajax.php?fn=card-sort-save&id='+cardid+'&row='+myrow+'&col='+mycol);
   		}	
           
	});
	//console.log(cards);

	$( ".card-content-view" )
		.find( ".card-content" );
	$( ".column" ).disableSelection();

	/* in-place editor */
	
	$(".editable").editInPlace({
		//callback: function(unused, enteredText) { return enteredText; },
		url: './ajax.php',
		show_buttons: true
	});
	
	$(".column-title").editInPlace({
		//callback: function(unused, enteredText) { return enteredText; },
		url: './ajax.php',
		field_type: 'textarea',
		textarea_rows: '5',
		textarea_cols: '10',
		show_buttons: true
	});

/* COLUMN FN */
	$(document).on('click','.column-add',function(){
		console.log('column-add');
		$('#column-ctrl').before($('#_column').html());
		$( ".column-content" ).sortable({connectWith: ".column-content"});
		var colcnt = $('#columns > .column').length - 1;
		$(this).parent().parent().prev().attr('data-col',colcnt);
		if(colcnt > 1){
			$('.column-delete').show();
		}
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
		console.log('card-edit');
		var oldcontent = $(this).siblings('.card-content').html();
		$(this).parent().hide();
		$(this).parent().siblings('.card-content-edit').children('textarea').html(oldcontent);
		$(this).parent().siblings('.card-content-edit').show();
		/* $.getJSON('ajax.php?fn=card-edit&id=1',function(result){
			me.parent().parent('.card').before($('#_card-editor').html());
		}); */
		// hide edit icon while in edit mode
		//$(this).parent().hide();
		//$(this).parent().siblings('.portlet-content-edit').removeClass('hidden');
	});

	// card save
	$(document).on('click','.card-save',function(){
		console.log('card-save');
		var cardid = $(this).closest('.card').attr('data-id');
		var cardcontent = $(this).siblings('textarea').val();
		$(this).parent().siblings('.card-content-view').children('.card-content').html(cardcontent);
		$('#msg').load('ajax.php?fn=card-save&id='+cardid+'&content='+escape(cardcontent));
		console.log('card-close-after-save');
		$(this).parent().hide();
		$(this).parent().siblings('.card-content-view').show();
		// hide edit icon while in edit mode
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
		smoke.confirm('Delete this card? Are you sure?',function(e){
			if (e){
				me.parent().parent().remove();
			} 
		});
		
	});
});

