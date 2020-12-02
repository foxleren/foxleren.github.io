/*возврат burger в исходное положение из меню*/

var wrapperMenu = document.querySelector('.wrapper-menu');

wrapperMenu.addEventListener('click', function () {
	wrapperMenu.classList.toggle('open');
})
var sideButton2 = document.querySelector('.side-button-2');

sideButton2.addEventListener('click', function () {
	wrapperMenu.classList.remove('open');
})
var abMe = document.querySelector('.my-pr');

abMe.addEventListener('click', function () {
	$('.side-button-2').trigger('click');
})
var abMe = document.querySelector('.ab-me');

abMe.addEventListener('click', function () {
	$('.side-button-2').trigger('click');
})
/*вкладки about me*/
var acInput1 = document.querySelector('#ac-1');


acInput1.addEventListener('click', function () {
	acInput1.classList.toggle('open');
})


var acInput2 = document.querySelector('#ac-2');


acInput2.addEventListener('click', function () {
	acInput2.classList.toggle('open');
})


var acInput3 = document.querySelector('#ac-3');


acInput3.addEventListener('click', function () {
	acInput3.classList.toggle('open');
})


var acInput4 = document.querySelector('#ac-4');


acInput4.addEventListener('click', function () {
	acInput4.classList.toggle('open');
})

var acInput5 = document.querySelector('#ac-5');


acInput5.addEventListener('click', function () {
	acInput5.classList.toggle('open');
})



/*открытие и закрытие*/
$('#ac-2').on('click', function () {
	if ($('#ac-1').is('.open') && $('#ac-2').is('.open')) {
		// checkbox checked 
		acInput1.classList.remove('open');
	} else if ($('#ac-3').is('.open') && $('#ac-2').is('.open')) {
		acInput3.classList.remove('open');
	}
})

$('#ac-1').on('click', function () {
	if ($('#ac-1').is('.open') && $('#ac-2').is('.open')) {
		// checkbox checked 
		acInput2.classList.remove('open');
	} else if ($('#ac-1').is('.open') && $('#ac-3').is('.open')) {
		acInput3.classList.remove('open');
	}
})

$('#ac-3').on('click', function () {
	if ($('#ac-1').is('.open') && $('#ac-3').is('.open')) {
		// checkbox checked 
		acInput1.classList.remove('open');
	} else if ($('#ac-3').is('.open') && $('#ac-2').is('.open')) {
		acInput2.classList.remove('open');
	}
}) 





var body = document.querySelector('body');
var sideMenu = document.querySelector('.side-panel');

var servItem = document.querySelector('.service_items');

var accord1 =document.querySelector('.accord1');
var accord2 =document.querySelector('.accord2');
var accord3 =document.querySelector('.accord3');
var accord4 =document.querySelector('.accord4');
var accord5 =document.querySelector('.accord5');

var acCont1 =document.querySelector('.ac-cont1');
var acCont2 =document.querySelector('.ac-cont2');
var acCont3 =document.querySelector('.ac-cont3');
var acCont4 =document.querySelector('.ac-cont4');
var acCont5 =document.querySelector('.ac-cont5');

var acP1 =document.querySelector('.p1');
var acP2 =document.querySelector('.p2');
var acP3 =document.querySelector('.p3');

var acP4 =document.querySelector('.p1-4');
var acP5 =document.querySelector('.p1-5');

var captA1 = document.querySelector('.captA1');
var captA2 = document.querySelector('.captA2');
var captA3 = document.querySelector('.captA3');
var captA4 = document.querySelector('.captA4');
var captA5 = document.querySelector('.captA5');
var captA6 = document.querySelector('.captA6');




var servItemStrike = document.querySelector('.service_items-strike');
var servStrikeP = document.querySelector('.service_strike p');

var descrSpan = document.querySelector('.wwd-descr span');

var  servDescrH = document.querySelector('.service_descr h2');
var  descrH = document.querySelector('.wwd-descr h2 ');

var lineMenu = document.querySelector('.line-menu');
var lineMenuHs = document.querySelector('.line-menu half start');
var lineMenuHe = document.querySelector('.line-menu half end');


var logo = document.querySelector('.logo');

var App1 = {
	createView1: function (){
		this.toggleM = document.getElementsByClassName( "toggle-m" )[0];
		this.itemM = document.getElementsByClassName( "item-m" )[0];
		this.stateM = false;
	},

	toggleIt1: function ( ev ) {
		if( App1.stateM ){
			App1.itemM.style.left = "3px";
			App1.itemM.style.animation= "moveL .4s";
			App1.stateM = false;
			body.classList.remove('dm');
			sideMenu.classList.remove('dm');
			image.classList.remove('dm');
			document.getElementById("image").src="css/images/image.png";
			accord1.style.backgroundColor = "#ffff";
			accord2.style.backgroundColor = "#ffff";
			accord3.style.backgroundColor = "#ffff";
			accord4.style.backgroundColor = "#ffff";
			accord5.style.backgroundColor = "#ffff";



			acCont1.style.backgroundColor = "#ffff";
			acCont2.style.backgroundColor = "#ffff";
			acCont3.style.backgroundColor = "#ffff";
			acCont4.style.backgroundColor = "#ffff";
			acCont5.style.backgroundColor = "#ffff";



			acP1.style.borderTop = "3px solid #EAEEFA"
			acP2.style.borderTop = "3px solid #EAEEFA";
			acP3.style.borderTop = "3px solid #EAEEFA";
			acP4.style.borderTop = "3px solid #EAEEFA";
			acP5.style.borderTop = "3px solid #EAEEFA";
/*
			accord1.style.color = "#605c88";
			accord2.style.color = "#605c88";
			accord3.style.color = "#605c88";
*/

			servItemStrike.style.backgroundColor = "#EAEEFA";	
			
			servStrikeP.style.backgroundColor = "#ffff";

			descrSpan.style.backgroundColor = "#ffff";


			servDescrH.style.color = "#424071";

			descrH.style.color = "#424071";
/*
			captA1.style.color = "#333";
			captA2.style.color = "#333";
			captA3.style.color = "#333";
			captA4.style.color = "#333";
			captA5.style.color = "#333";
			captA6.style.color = "#333";
*/
			logo.style.color = "#424071";
		servItem.classList.remove('dm');
			accord4.classList.remove('dm');
			accord5.classList.remove('dm');
		}else{
			App1.itemM.style.left = "46px"; /*начало*/
			App1.itemM.style.animation= "move .5s";
			App1.stateM = true;
			
			body.classList.toggle('dm');
			sideMenu.classList.toggle('dm');
			image.classList.toggle('dm');
			document.getElementById("image").src="css/images/image_dm.png";
			accord4.classList.toggle('dm');
			accord5.classList.toggle('dm');
			/*
			accord1.style.color = "#605c88";
			accord2.style.color = "#605c88";
			accord3.style.color = "#605c88";
			*/
			accord1.style.backgroundColor = "#292929";
			accord2.style.backgroundColor = "#292929";
			accord3.style.backgroundColor = "#292929";
			accord4.style.backgroundColor = "#292929";
			accord5.style.backgroundColor = "#292929";

			acCont1.style.backgroundColor = "#292929";
			acCont2.style.backgroundColor = "#292929";
			acCont3.style.backgroundColor = "#292929";
			acCont4.style.backgroundColor = "#292929";
			acCont5.style.backgroundColor = "#292929";

			acP1.style.borderTop = "3px solid #b7b7b7";
			acP2.style.borderTop = "3px solid #b7b7b7";
			acP3.style.borderTop = "3px solid #b7b7b7";
			acP4.style.borderTop = "3px solid #b7b7b7";
			acP5.style.borderTop = "3px solid #b7b7b7";
			servItem.classList.toggle('dm')

			/*captA1.style.color = "#999";
			captA2.style.color = "#999";
			captA3.style.color = "#999";
			captA4.style.color = "#999";
			captA5.style.color = "#999";
			captA6.style.color = "#999";
			*/
			servItemStrike.style.backgroundColor = "#b7b7b7";	
			
			servStrikeP.style.backgroundColor = "#b7b7b7";

			descrSpan.style.backgroundColor = "#b7b7b7";

			servDescrH.style.color = "#999";

			descrH.style.color = "#999";

			logo.style.color = "#bebbce";
			
			
		}
	},

	bindEv1: function () {
		this.toggleM.addEventListener( 'click', this.toggleIt1 );
	},

	init1: function (){
		this.createView1();
		this.bindEv1();
	}
};
App1.init1(); 

var App2 = {
	createView2: function (){
		this.toggleL = document.getElementsByClassName( "toggle-l" )[0];
		this.itemL = document.getElementsByClassName( "item-l" )[0];
		this.stateL= false;
	},

	toggleIt2: function ( ev ) {
		if( App2.stateL ){
			App2.itemL.style.left = "3px";
			App2.itemL.style.animation= "moveL .4s";
			App2.stateL = false;
		}else{
			App2.itemL.style.left = "46px";
			App2.itemL.style.animation= "move .5s";
			App2.stateL = true;
		}
	},

	bindEv2: function () {
		this.toggleL.addEventListener( 'click', this.toggleIt2 );
	},

	init2: function (){
		this.createView2();
		this.bindEv2();
	}
};
App2.init2(); 

