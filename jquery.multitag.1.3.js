/*
Script name: multitag
Version: 1.3
Author: Alireza Balouch http://swape.net
Description: jQuery plugins for making multitag
Example:
 Script:
  $(".mytags").multitag();

*/
(function($){
	$.fn.multitag = function(){
		var defaults = {fademsec : 300 };
		var options = $.extend(defaults, options);
		return this.each(function(idx){
			var thisinput = $(this);
			var noe = thisinput.val();
			var thisname = thisinput.attr('id');
			// adding tag conainer
			var thisTagboxID = 'multitag-tagbox' + idx;
			$(this).after('<div class="multitag-tagbox" id="' + thisTagboxID + '" data-for="' + thisname + '" ></div>');
			$(this).data('tagbox' , thisTagboxID );
			makeNewTagBoxes( thisname );
			$('.multitag-tagbox').on('click',function(){
				$(this).find('input').focus();
			});
			$('#' + thisname).hide();
		});//each
	};


	function makeNewTagBoxes( strTagbox ){
		var strTags = $('#' + strTagbox).val();
		var thisTagboxID = '#' + $('#' + strTagbox).data('tagbox'); 
		$(thisTagboxID).html('');
		var arrTags = strTags.split(',');
		for(var x= 0; x < arrTags.length ; x++){
			if(arrTags[x] !== ''){
				$(thisTagboxID).append('<span><b>' + arrTags[x] + '</b><a href="#" class="tagboxclosebtn" data-rtag="' + arrTags[x] + '" data-for="'  + strTagbox + '" >x</a></span>');
			}
		}
		$(thisTagboxID).append('<input type="text" id="' + strTagbox + '-input" data-for="' + strTagbox + '" />');
		$('#' + strTagbox + '-input').focus();

		$(thisTagboxID + ' .tagboxclosebtn' ).on('click',function(){
			var strVal = $( '#' + $(this).data('for') ).val();
			var strNew = strVal.replace( $(this).data('rtag') , '');
			strNew = strNew.replace( /,,/gi , ',');
			$( '#' + $(this).data('for') ).val( strNew );
			makeNewTagBoxes($(this).data('for'));
			return false;
		});

		$(thisTagboxID + ' input' ).on('keypress focusout', function(e){
			if (e.which === 44 || e.which === 0 || e.which === 13 || e.which === 9){
				var newstr = $(this).val();
				if(newstr !== ''){
					newstr = newstr.replace(',' , '');
					var tagObjID = $(this).data('for');
					$('#' + tagObjID).val( $('#' + tagObjID).val() + ',' + newstr);
					$(this).val('');
					makeNewTagBoxes(tagObjID);
					return false;
				}
			}
		});
	}
})(jQuery);