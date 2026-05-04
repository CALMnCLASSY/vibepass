/*
lightbox = {
	fadetime: 500
	,
	show: function(){
		//jQuery('.lightbox')style.display='block';
		//jQuery('.lightbox').html();
		jQuery('.lightbox').offset({ top: '25%', right: '25%'});
		jQuery('.blackout').fadeIn(this.fadetime);
		jQuery('.lightbox').fadeIn(this.fadetime);
                jQuery('.lightbox_left').jScrollPane({showArrows:true});
	}
	,
	hide: function(){
		jQuery('.blackout').fadeOut(this.fadetime);
		jQuery('.lightbox').fadeOut(this.fadetime);
	}
}
jQuery(document).ready(function(){
    jQuery('.blackout,.lightbox').bind('mousewheel DOMMouseScroll', function(e){
        e.preventDefault();
    });
});
*/

jQuery(document).ready(function(){

	jQuery('body').on('click', '#blackout, #blackout .lightbox_close_container a, #blackout a.lightbox_close, #blackout span.close, #blackout_filter, #blackout_filter span.close, #whiteout span.close', function() {
		close_all_lightboxes();
		hide_blackout();
		jQuery('#whiteout').css('display','none');
	});
	jQuery(document).keyup(function(e) { 
        if (e.keyCode == 27) { // esc keycode
			
			if(
				jQuery('#lightbox7').is(':visible') && 
				jQuery('.galleria-lightbox-overlay').is(':visible')
			) {
				var gallerias = Galleria.get();
				gallerias[gallerias.length-1].closeLightbox();
			} else if(
				jQuery('#lightbox7').is(':visible') &&
				(jQuery('#lb7_lightbox1').is(':visible') || jQuery('#lb7_lightbox2').is(':visible'))
			) {
				close_all_sm_lightbox();
			} else {
				close_all_lightboxes();
				hide_blackout();
				jQuery('#whiteout').css('display','none');
        	}
        }
    });
	jQuery('body').on('click', '[id^="lightbox"], .lightbox', function(event) {
		event.stopPropagation();
	});

});

var fadeout_time = 0;
var fadein_time = 200;

function toggle() {
	
	if (document.getElementById("lightbox").style.display=='none') {
		//jQuery('body').scrollTo('#header',{duration:'slow'});
		show_blackout(function() { 
			jQuery('#lightbox').appendTo('#blackout');
			jQuery('#lightbox').fadeIn(fadein_time);
		} );
				
	} else {
		jQuery('#lightbox').fadeOut(fadeout_time);
		hide_blackout();

	}
}

function toggle2() {
	if (document.getElementById("lightbox2").style.display=='none') {
		//document.getElementById("lightbox").style.display='block';
		//jQuery('body').scrollTo('#header',{duration:'slow'});
		jQuery('#lightbox2').removeClass('lightbox6');
		jQuery('.lightbox2_title').show();
		jQuery('.lightbox6_title').hide();
		jQuery('.lightbox2_instructions').show();
		jQuery('.lightbox6_instructions').hide();
		jQuery('.lightbox6_postform').hide();
		
		show_blackout(function() { 
			jQuery('#lightbox2').appendTo('#blackout');
			jQuery('#lightbox2').fadeIn(fadein_time);
		} );

	} else {
		jQuery('#lightbox2').fadeOut(fadeout_time);
		hide_blackout();
	}
	
}

function toggle3(stadium_id) { //seating chart lightbox
	// if(jQuery(window).width() < 426) {
	// 	window.open('https://' + location.hostname + '/all-suites/suite-map/?mode=map&ref='+stadium_id);
	// } else {

		var lightboxElement = jQuery('#lightbox3[data-id="' + stadium_id + '"]');
		if (lightboxElement.css('display') === 'none') {
			show_blackout(function() { 
				lightboxElement.appendTo('#blackout');
				lightboxElement.fadeIn(fadein_time);
			} );
		} else {
			lightboxElement.fadeOut(fadeout_time);
			hide_blackout();
		}
		
	// }
	
}

function toggle4(imageFile, imageName) { //photo lightbox
	
	if(imageFile && imageName) {

		if(jQuery(window).width() < 426) {
			window.open('https://' + location.hostname + '/all-suites/suite-photo/?mode=photo&file='+imageFile+'&desc='+imageName);
		} else {
			imageName = imageName.replace("%26","&");
			imageFile = '../../../wp-content/themes/responsive/images/'+imageFile;
			document.getElementById("lb4_img").src = imageFile;
			document.getElementById("lb4_img").alt = imageName;
			document.getElementById("lb4_img").title = imageName;
			
			document.getElementById("lb4_title").innerHTML = imageName;

		}//not mobile device

	}

	if(jQuery(window).width() >= 426) {

		if (document.getElementById("lightbox4").style.display=='none') {
			show_blackout(function() { 
				jQuery('#lightbox4').appendTo('#blackout');
				jQuery('#lightbox4').fadeIn(fadein_time);
			} );
		} else {
			jQuery('#lightbox4').fadeOut(fadeout_time);
			hide_blackout();
		}
	}
	
}

function toggle5() { //price FAQ lightbox

	if (document.getElementById("lightbox5").style.display=='none') {
		show_blackout(function() { 
			jQuery('#lightbox5').appendTo('#blackout');
			jQuery('#lightbox5').fadeIn(fadein_time);
		} );
	} else {
		jQuery('#lightbox5').fadeOut(fadeout_time);
		hide_blackout();
	}
	
}
function toggle6() { //stadium page book a suite lightbox
	/* toggle6 really toggles lightbox2, and adds the lightbox6 class to morph the lightbox2 look and feel into a larger form */
	if (document.getElementById("lightbox2").style.display=='none') {
		//document.getElementById("lightbox").style.display='block';
		//jQuery('body').scrollTo('#header',{duration:'slow'});
		jQuery('#lightbox2').addClass('lightbox6');
		jQuery('.lightbox2_title').hide();
		jQuery('.lightbox6_title').show();
		jQuery('.lightbox2_instructions').hide();
		jQuery('.lightbox6_instructions').show();
		jQuery('.lightbox6_postform').show();
		jQuery('#lightbox2').fadeIn(fadein_time);
		if(team_name != "" && stadium_name != "") {
			document.getElementById("mc_mv_TEAMEVENT").value = team_name + " / " + stadium_name;
		}
	} else {
		//document.getElementById("lightbox").style.display='none';
		jQuery('#lightbox2').fadeOut(fadeout_time);
	}
	if (document.getElementById("blackout").style.display=='none') {
		//document.getElementById("blackout").style.display='block';
		jQuery('#blackout').height(jQuery(document).height());
		jQuery('#blackout').fadeIn(fadein_time);
		
	} else {
		//document.getElementById("blackout").style.display='none';
		jQuery('#blackout').fadeOut(fadeout_time);
	}
	
}
function close_all_lightboxes() {
	
	if( jQuery('#lightbox7').is(':visible') ) {
				
		galleria_garbage_collection();

		//re-render the main galleria widget
		if( jQuery('.galleria').length ) {
			show_main_galleria();
		}
		//remove the history url param 
		history.replaceState(null, null, ".");

		lb7_close_prep();
	}
	jQuery('.lightbox').fadeOut(fadeout_time);
	jQuery('#lightbox').fadeOut(fadeout_time);
	jQuery('#lightbox2').fadeOut(fadeout_time);
	jQuery('#lightbox3').fadeOut(fadeout_time);
	jQuery('#lightbox4').fadeOut(fadeout_time);
	jQuery('#lightbox5').fadeOut(fadeout_time);
	jQuery('#lightbox6').fadeOut(fadeout_time);
	jQuery('#lightbox7').fadeOut(fadeout_time);
	//jQuery('#blackout').fadeOut(fadeout_time);
}
function show_blackout(callback) {
	//close_all_lightboxes();
	// jQuery('body').css('overflow-x', 'hidden');
	

	jQuery('#blackout').fadeIn(0, function() { 
		jQuery('body').css('overflow', 'hidden');
		jQuery('html').css('overflow', 'hidden');
		if(jQuery(window).width() > 425) { jQuery('body').css('padding-right', '15px'); }
		if(callback && typeof(callback) === "function") { 
			callback();
		} 
	});
}
function hide_blackout() {
	jQuery('#blackout, #blackout_filter').fadeOut(fadeout_time, function() {
		// jQuery('body').css('overflow-x', 'initial');
		jQuery('body').css('overflow', 'visible');
		jQuery('html').css('overflow', 'visible');

		if(jQuery(window).width() > 425) { jQuery('body').css('padding-right', 'initial'); }

	});
}
function show_lightbox(id) {

	if(id != null) {
		show_blackout(function() { 
			jQuery('#'+id).appendTo('#blackout');
			jQuery('#'+id).fadeIn(fadein_time);
		} );
	} 
	
	//TODO: may want to add GA event tracking
}

function lb7_open_prep() {

	//update scrolling and positioning
	$('#lightbox7').css('position', '');

	if(isMobile) {
		$('#blackout span.close').hide();
		if( !$('#lightbox7 .lightbox_title .close').length ) {
			var close = document.createElement("span");
			close.setAttribute("class", "close");
			close.textContent = '×';
			$('#lightbox7 .lightbox_title').prepend(close);
		}
	} else {
		if( $('#lightbox7.no-listings').length ||  $('#lightbox7.listing_details').length ) {
			$('#blackout').css('overflow-y', 'scroll');
		} else if( $('#lightbox7.listing_list').length ) {
			$('#blackout').css('overflow-y', 'hidden');
		}
	
		$('#blackout span.close').css('z-index', '10000');
		$('#blackout span.close').css('display','block');
	}

	lb7_resize();

	if( $('#lightbox7 .listing_list_container').length && !isMobile) {

		//calculate listing list height
		var non_list_container_height = 125 /*lb7 header*/ + 28 /*margins*/ + 158 /*suite expert box*/;
		var list_container_height = 0;
		$('.listing_list_container').children('.listing_list_row').each(function(){
	        list_container_height += $(this).outerHeight();
	    });
	    
		if(list_container_height > (viewport_height-non_list_container_height)) {

			$('.listing_list_container').on('scroll wheel DOMMouseScroll', function(e) { 
				var scroll_pos = $(this).scrollTop();
				var scroll_amount = (-1*e.originalEvent.deltaY);

				// console.log('list_container scroll detected. pos = ' + scroll_pos + ', amount = '+scroll_amount);
				
				if(!isNaN(scroll_amount)) {
					$('.listing_list_container').scrollTop( scroll_pos - scroll_amount ); 
					e.stopPropagation(); 
					e.preventDefault(); 
				}
			});

		}
	}
}

function lb7_resize() {
	// console.log('');
	// console.log('lb7_resize start');
	
	if(isMobile) {
		return;
	}

	if( $('#lightbox7.listing_list').length ) {

		//resize map
		if( $('.map_container').length ) {

			resize_map( $('#lightbox7 .map_container') );
			
		}//if map_container exists

		//resize listing list height
		if( $('.listing_list_container').length && !isMobile ) {
			var non_list_container_height = 125 /*lb7 header*/ + 28 /*margins*/ + 158 /*suite expert box*/;
			var list_container_height = 0;
			$('.listing_list_container').children('.listing_list_row').each(function(){
		        list_container_height += $(this).outerHeight();
		    });
		    
			if(list_container_height > non_list_container_height) {

				$('.listing_list_container').css({
					'max-height': (viewport_height-non_list_container_height) + 'px',
					'overflow-y': 'scroll'
				});
				$('#no-location-msg').css('width', $('.map_container').width() + 'px');

			}

		}//if listing list container exists
	}//if listing list

	if( $('#lightbox7.listing_details').length ) {

		if( $('#lightbox7.listing_details .listing_image').length ) {
			var screen_width = $(window).width();

			var galleria_width = isMobile ? $('#lightbox7 .listing_list_row_details .galleria_container').outerWidth() : get_lb7_galleria_width();
			var galleria_height = isMobile ? $('#lightbox7.listing_details .listing_image').outerHeight() : get_lb7_galleria_height();

			$('#lightbox7.listing_details .listing_image').css({
				'height': '100%',
				'width': '100%'
			});

			if(Galleria && Galleria.get().length > 1)
				Galleria.get(1).resize({'width':galleria_width, 'height': galleria_height});
		}

		if( $('#lightbox7.listing_details .location_container .mini_map_content').length ) {

			var map_height = $('.location_container .mini_map_content img').height();
			var map_width = $('.location_container .mini_map_content img').width();
			var cell_height_after = map_height / 1000;
			var cell_width_after = map_width / 1000;
			
			$('.location_container .mini_map_content').children('.suite_pin_container').each(function() {
			
				if($(this).hasClass('med')) pin_size = 2;
				else if($(this).hasClass('large')) pin_size = 3;
				else if($(this).hasClass('small')) pin_size = 1;

				offset = (pin_size == 1 ? 30 :
							(pin_size == 2 ? 37 :
								(pin_size == 3 ? 47 : 0)));

				var x = $(this).attr('data-x');
				var y = $(this).attr('data-y');
			
				$(this).css({
					'margin-left': x*cell_width_after - offset + 'px',
					'margin-top': -1*(1000-y)*cell_height_after - offset + 'px'
				});
			});
		}
	}//if listing details

	if(!isMobile) {
		var new_lb7_height = 
			$('#lightbox7 .lightbox_content').outerHeight() + +$('#lightbox7 .lightbox_middle').css('margin-top').replace('px','');

		if( +new_lb7_height > +$('#blackout').outerHeight() ) {
			$('#lightbox7').css({
				'position': 'absolute',
				'height': new_lb7_height + 'px'
			});
		} else {
			$('#lightbox7').css({
				'position': 'absolute',
				'height': ''
			});
		}
	} else {
		$('#lightbox7').css({
			'overflow-y': 'scroll !important',
			'height': '100% !important'
		});
		
		//safari
		$('html').addClass('lb7');
	}
}

function lb7_close_prep() {
	$('#blackout').css('overflow-y', 'scroll');
	$('#blackout span.close').css('z-index', '');

	if( $('#lightbox7.listing_details').length ) {
		$('#blackout').unbind('scroll', scroll_listener);
	}
	
	//safari
	$('html').removeClass('lb7');

	$('#non-header .cta_bar').remove();
}

function debouncer( func , timeout ) {
   var timeoutID , timeout = timeout || 200;
   return function () {
      var scope = this , args = arguments;
      clearTimeout( timeoutID );
      timeoutID = setTimeout( function () {
          func.apply( scope , Array.prototype.slice.call( args ) );
      } , timeout );
   }
}

function get_lb7_galleria_width() {
	if($('#lightbox7 .listing_list_row_details').length) {
		return $('#lightbox7 .listing_list_row_details .galleria_container').outerWidth();
	} else {
		return 0;
	}
}

function get_lb7_galleria_height() {
	if($('#lightbox7 .listing_list_row_details').length) {		
		return 500;
	} else {
		return 0;
	}
}
