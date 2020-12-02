var acInput1 = document.querySelector('#ac-1');


acInput1.addEventListener('click', function () {
	acInput1.classList.toggle('open');
})

if ($('#ac-1').is('.open')) {

	acInput1.classList.remove('open');
}


if (document.querySelector('#canvas').clientWidth > 830) {
	$('#canvas').on('mouseenter', function (event) {
		$("body").css("overflow", "hidden");
	}).on('mouseleave', function () {
		$("body").css("overflow", "auto");
	});
}