// NAVIGATION LOGO SCROLL TOP
$('.logo').on('click', function (e) {
	e.preventDefault();
	$('.nav-toggle').removeClass('open');
	$('.menu-left').removeClass('collapse');
	$('html, body').animate({
		scrollTop: 0
	}, 750, 'easeInOutQuad')
});
// LINKS TO ANCHORS
$('a[href^="#"]').on('click', function (event) {

	var $target = $(this.getAttribute('href'));

	if ($target.length) {
		event.preventDefault();
		$('html, body').stop().animate({
			scrollTop: $target.offset().top
		}, 750, 'easeInOutQuad');
	}
});

// TOGGLE HAMBURGER & COLLAPSE NAV
$('.nav-toggle').on('click', function () {
	$(this).toggleClass('open');
	$('.menu-left').toggleClass('collapse');
});
// REMOVE X & COLLAPSE NAV ON ON CLICK
$('.menu-left a').on('click', function () {
	$('.nav-toggle').removeClass('open');
	$('.menu-left').removeClass('collapse');
});

// SHOW/HIDE NAV

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function (event) {
	didScroll = true;
});

setInterval(function () {
	if (didScroll) {
		hasScrolled();
		didScroll = false;
	}
}, 250);

function hasScrolled() {
	var st = $(this).scrollTop();

	// Make sure they scroll more than delta
	if (Math.abs(lastScrollTop - st) <= delta)
		return;

	// If they scrolled down and are past the navbar, add class .nav-up.
	// This is necessary so you never see what is "behind" the navbar.
	if (st > lastScrollTop && st > navbarHeight) {
		// Scroll Down
		$('header').removeClass('show-nav').addClass('hide-nav');
		$('.nav-toggle').removeClass('open');
		$('.menu-left').removeClass('collapse');
	} else {
		// Scroll Up
		if (st + $(window).height() < $(document).height()) {
			$('header').removeClass('hide-nav').addClass('show-nav');
		}
	}

	lastScrollTop = st;
}











/*----------------------- */


let fields = document.querySelectorAll('.upload-file-input');
    Array.prototype.forEach.call(fields, function (input) {
      let label = input.nextElementSibling,
        labelVal = label.querySelector('.upload-file-status').innerText;
 
      input.addEventListener('change', function (e) {
        let countFiles = '';
        if (this.files && this.files.length >= 1)
          countFiles = this.files.length;
 
        if (countFiles)
          label.querySelector('.upload-file-status').innerText = 'Выбрано файлов: ' + countFiles;
        else
          label.querySelector('.upload-file-status').innerText = labelVal;
      });
    });