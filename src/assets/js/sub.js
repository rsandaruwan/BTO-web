// Init all plugin when document is ready 
if (window.innerWidth > 600) {
$(document).on('ready', function () {
	// 0. Init console to avoid error

	var contextWindow = $(window);
	var $root = $('html, body');

	var pageSectionDivs = $('.fullpg .section');

	var headerContainer = $('.hh-header');
	var slideElem = $('.slide');
	var arrowElem = $('.p-footer .arrow-d');
	var pageElem = $('.section');
	var pageSections = [];
	var pageAnchors = [];

	var mainPage = $('#mainpage');

	var scrollOverflow = true;
	// disable scroll overflow on small device
	if (contextWindow.width() < 601) {
		scrollOverflow = false;
	}
	else {
		scrollOverflow = true;
	}
	// Get sections name
	for (var i = 0; i < pageSectionDivs.length; i++) {
		pageSections.push(pageSectionDivs[i]);
	}
	window.asyncEach(pageSections, function (pageSection, cb) {
		var anchor = pageSection.getAttribute('data-section');
		pageAnchors.push(anchor + "");
		cb();
	}, function (err) {
		// Init plugin
		if (mainPage.height()) {
			// config fullpage.js
			mainPage.fullpage({
				menu: '#qmenu',
				anchors: pageAnchors,
				verticalCentered: false,
				css3: true,
				navigation: true,
				responsiveWidth: 601,
				responsiveHeight: 401,
				scrollOverflow: scrollOverflow,
				scrollOverflowOptions: {
					click: true,
					submit: true,
				},
				afterRender: function () {
					// Fix video background
					videoBg.maximage('maxcover');

					// Fix for internet explorer : adjust content height
					// Detect IE 6-11
					var isIE = /*@cc_on!@*/false || !!document.documentMode;
					if (isIE){
						var contentColumns = $('.section .content .c-columns');
						contentColumns.height(contextWindow.height())
						for (var i = 0; i < contentColumns.length; i++) {
							if (contentColumns[i].height <= contextWindow.height()) {
								contentColumns[i].style.height = "100vh";
							}
						}
					}

				

				},
				afterResize: function () {
					var pluginContainer = $(this);
					$.fn.fullpage.reBuild();
				},
				onLeave: function (index, nextIndex, direction) {
					// Behavior when a full page is leaved
					arrowElem.addClass('gone');
					pageElem.addClass('transition');
					slideElem.removeClass('transition');
					pageElem.removeClass('transition');
				},
				afterLoad: function (anchorLink, index) {
					// Behavior after a full page is loaded
					// hide or show clock
					if ($('.section.active').hasClass('hide-clock')) {
						headerContainer.addClass('gone');
						
					} else {
						headerContainer.removeClass('gone');
					}
				}
			});

		}
	});
	// Scroll to fullPage.js next/previous section
	$('.scrolldown a').on('click', function () {
		try {
			// fullpage scroll
			$.fn.fullpage.moveSectionDown();
		} catch (error) {
			// normal scroll
			$root.animate({
				scrollTop: window.innerHeight
			}, 400, function () {
			});
		}
		
	});

	

});
}