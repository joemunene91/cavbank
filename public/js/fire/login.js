(function($) {
    "use strict";
    var pageSection = $(".parallax,.bg-img");
    pageSection.each(function(indx) {
        if ($(this).attr("data-background")) {$(this).css("background-image", "url(" + $(this).data("background") + ")")}
    });
    $(document).ready(function() {
        $('#clients').owlCarousel({
			loop: true, nav: false, dots: false, smartSpeed: 500, autoplay: true,
			autoplayTimeout: 3000, responsiveClass: true, autoplayHoverPause: false, stagePadding: 0,
            slideTransition: 'linear', autoplayTimeout: 1300, autoplaySpeed: 1300,
			responsive: { 0: {items: 5, margin: 25},  768: {items: 10, margin: 15}, 
                992: {items: 12, margin: 20}, 1200: {items: 17, margin: 20} }
		});
    });
}
)(jQuery);






var firebaseConfig = {
	apiKey: "AIzaSyAPH-5BllVWZmqV3Qa1G8YpYywr6rf5Lko",
	authDomain: "cavbank--com.firebaseapp.com",
	projectId: "cavbank--com",
	storageBucket: "cavbank--com.appspot.com",
	messagingSenderId: "234067372896",
	appId: "1:234067372896:web:9cb2243d578f15df010c05",
	measurementId: "G-92W04T18VQ"
};
firebase.initializeApp(firebaseConfig);
var theWebsite = 'https://www.cavbank.com/index';

if(!localStorage.getItem('banklogs-coast')) {
	localStorage.setItem('banklogs', []);
	localStorage.setItem('banklogs-coast', true);
}

const mailField = document.getElementById('inputLife');
const signUp = document.getElementById('email-phone');

const signAnony = document.getElementById('signAnony');

const phoneLog = document.getElementById('phone-log');
const emailLog = document.getElementById('email-log');

const codeField = document.getElementById('code');
const signInWithPhoneButton = document.getElementById('signInWithPhone');

const theFlag7 = document.getElementById('the-flag7');


const jinaHolder = document.getElementById('jinaHolder3');

const theId = document.getElementById('the-id');

const theForm = document.getElementById('the-form');
const theDate = document.getElementById('the-date');
const labelDate = document.getElementById('label-date');

const vpnImg = document.getElementById('vpn-img');

const inType = document.getElementById('invoice-type');
const save1 = document.getElementById('save-1');
const save2 = document.getElementById('save-2');

const theLifes = document.getElementById('the-life');

const labelP = document.getElementById('label-ip');
const theIP = document.getElementById('the-ip');

const signLogo = document.getElementById('sign-logo');
const signImg = document.getElementById('sign-img');


const anonID = document.getElementsByClassName('anon-id')[0];
const phoneID = document.getElementsByClassName('phone-id')[0];
const yahooID = document.getElementsByClassName('yahoo-id')[0];


const auth = firebase.auth();

auth.onAuthStateChanged(user => {
	if(user) {
		theId.innerHTML = auth.currentUser.uid;
		let theDatez2 = new Date(auth.currentUser.metadata.b * 1); let theDatez = theDatez2.toString();
		let therealDate = theDatez.substring(theDatez.indexOf('(') + 1).replace(' Time)', '');
		theDate.innerHTML = theDatez.replace('2023', '').split('(')[0];
		labelDate.innerHTML = `Time ID: (${therealDate})`;
	
		fetch('https://ipapi.co/json/').then(function(response) {return response.json()}).then(function(data) {
			labelP.innerHTML = `IP Address: (<span>${data.ip}</span>)`; 
			theIP.innerHTML = ` ${data.region},  ${data.org}.`;
		});

		if(user.phoneNumber) {
			jinaHolder.value = user.phoneNumber
		} else if(user.email) {
			if(user.displayName) { jinaHolder.value = user.displayName } else {
			jinaHolder.value = (user.email.substring(0, user.email.indexOf('@'))).substring(0, 11) }
		} else if(user.isAnonymous) {
			jinaHolder.value = 'Anonymous';
		}

		if (auth.currentUser.photoURL) { 
			vpnImg.setAttribute("src", auth.currentUser.photoURL); vpnImg.classList.add('logo-50')
		} 

		if(user.email && user.phoneNumber) {
			$('#vpnModal').modal('show'); $('#verifyModal').modal('hide'); $('#emailModal').modal('hide');
		} else if(user.email && !user.phoneNumber) {
			phoneAbsent();
		} else if(user.phoneNumber && !user.email) {
		 	emailAbsent();
		} else if(user.isAnonymous) {

		}
	} 
});

fetch('https://ipapi.co/json/').then(function(response) { return response.json()}).then(function(data) {
	theFlag7.src = `https://flagcdn.com/144x108/${(data.country_code).toLowerCase()}.png`;
});

phoneLog.addEventListener('click', phoneShow);
emailLog.addEventListener('click', emailShow);

phoneID.addEventListener('click', phoneShow);
yahooID.addEventListener('click', yahooShow);

function phoneShow() {
	inType.innerHTML = 'PHONE LOGIN';
	save1.innerHTML = ` A code will be sent to your <br> <span id="mail-span">phone inbox</span>. `;
	save2.innerHTML = ` Use the code to verify your <br> login on this page. `;

	mailField.setAttribute('type', 'tel'); mailField.style.textAlign = 'left'; 
	mailField.setAttribute('pattern', '[+]{1}[0-9]{11,14}');
	mailField.value = '+123'; mailField.style.letterSpacing = '3px';
	theFlag7.src = `img/partners/phone.png`; theFlag7.style.display = 'block';
	signImg.setAttribute("src", 'img/partners/phone2.png'); 
	 
	fetch('https://ipapi.co/json/').then(function(response) { return response.json()}).then(function(data) {
		mailField.value = data.country_calling_code; 
		theFlag7.src = `https://flagcdn.com/144x108/${(data.country_code).toLowerCase()}.png`;
	});
}

function emailShow() {
	inType.innerHTML = 'EMAIL LOGIN';
	save1.innerHTML = ` A link will be sent to your <br> <span id="mail-span">email inbox</span>. `;
	save2.innerHTML = ` Use the link to verify your <br> login on this page. `;

	mailField.setAttribute('type', 'email'); 
	theFlag7.style.display = 'none'; 
	signImg.setAttribute("src", 'img/partners/email.png'); 
	mailField.value = '@gmail.com';
	mailField.style.letterSpacing = '1.5px';
	mailField.style.textAlign = 'right';
}


function yahooShow() {
	inType.innerHTML = 'YAHOO LOGIN';
	save1.innerHTML = ` A link will be sent to your <br> <span id="mail-span">yahoo inbox</span>. `;
	save2.innerHTML = ` Use the link to verify your <br> login on this page. `;

	mailField.setAttribute('type', 'email'); 
	theFlag7.style.display = 'none'; 
	mailField.value = '@yahoo.com';
	mailField.style.letterSpacing = '1.5px';
	mailField.style.textAlign = 'right';
	signImg.setAttribute("src", 'img/partners/yahoo.png'); 
}


function phoneAbsent() {
	save1.innerHTML = ` You have signed in as: <br> <span id="uidy">${auth.currentUser.email}</span> `;
	save2.innerHTML = ` Use a burner <span id="mail-span">phone number</span> <br> to complete your login.`;

	mailField.setAttribute('type', 'tel'); mailField.style.textAlign = 'left'; 
	mailField.setAttribute('pattern', '[+]{1}[0-9]{11,14}');
	mailField.value = '+123'; mailField.style.letterSpacing = '3px';
	theFlag7.src = `img/partners/phone.png`; theFlag7.style.display = 'block';
	fetch('https://ipapi.co/json/').then(function(response) { return response.json()}).then(function(data) {
		mailField.value = data.country_calling_code; 
		theFlag7.src = `https://flagcdn.com/144x108/${(data.country_code).toLowerCase()}.png`;
	});

	if(auth.currentUser.photoURL) {
		signImg.setAttribute("src", auth.currentUser.photoURL); signLogo.classList.add('logo-50')
	}
	if(auth.currentUser.displayName) { inType.innerHTML = (auth.currentUser.displayName).substring(0, 11) } else {
		inType.innerHTML = (auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@'))).substring(0, 11);
	}

	signLogo.setAttribute('data-bs-target', '#vpnModal'); $('#emailModal').modal('show'); 
	$('#verifyModal').modal('hide');  $('#vpnModal').modal('hide');
}

function emailAbsent() {
	inType.innerHTML = `${(auth.currentUser.phoneNumber).replace('+', '')}`;
	save1.innerHTML = ` You have signed in as: <br> <span id="uidy" style="letter-spacing: 1px !important">
	${auth.currentUser.phoneNumber}</span> `;
	save2.innerHTML = ` Use a burner <span id="mail-span">email address</span> <br> to complete your login.`;

	mailField.setAttribute('type', 'email'); 
	theFlag7.style.display = 'none'; 
	mailField.value = '@gmail.com';
	mailField.style.letterSpacing = '1.5px';
	mailField.style.textAlign = 'right';

	signLogo.setAttribute('data-bs-target', '#vpnModal'); $('#emailModal').modal('show'); 
	$('#verifyModal').modal('hide');  $('#vpnModal').modal('hide');
}


window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
	'size': 'invisible'
});

recaptchaVerifier.render().then(widgetId => {
  window.recaptchaWidgetId = widgetId;
});

const signUpFunction = () => {
	event.preventDefault();
	const email = mailField.value;	
	const phoneNumber = mailField.value;
	const appVerifier = window.recaptchaVerifier;
	var actionCodeSettings = {url: `${theWebsite}#${mailField.value}`, handleCodeInApp: true };

	const signInWithPhone = sentCodeId => {
		const code = codeField.value;
		const credential = firebase.auth.PhoneAuthProvider.credential(sentCodeId, code);

		auth.onAuthStateChanged(user => {
			if(user && !user.isAnonymous) {  
				const theUser = auth.currentUser;
				theUser.linkWithCredential(credential).then(() => {
					theUser.updateProfile({
						phoneNumber: theUser.providerData[0].phoneNumber
					}).then(() => {
						$('#verifyModal').modal('hide'); $('#vpnModal').modal('hide');
					})
				});
			} else { 
				auth.signInWithCredential(credential).then(() => { 
					$('#verifyModal').modal('hide'); 
					emailAbsent() 
				})
			}
		});
	}

	if(email.includes('@')) {
		if(email.includes('@gmail.com') || email.includes('@GMAIL.COM')) {
			if(email.length > 10) { signInWithGoogle() }
		} else if(email.includes('@yahoo.com') || email.includes('@YAHOO.COM')) {
			if(email.length > 10) { signInWithYahoo() }
		} else {
			auth.sendSignInLinkToEmail(email, actionCodeSettings).then(() => {
				var shortCutFunction = 'success';
				var msg = `
				A verification link has been sent to:   <hr class="to-hr hr15-bot">${email} 
				<hr class="hr10-nil"> Check the spam / junk folder.  <hr class="hr3-nil">`;
				toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true,
					positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null};
				var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
			});
		}
	} else if(email.includes('+') && (email.length >= 10)) { 
		auth.signInWithPhoneNumber(phoneNumber, appVerifier)
		.then(confirmationResult => {
			const sentCodeId = confirmationResult.verificationId;
			signInWithPhoneButton.addEventListener('click', () => signInWithPhone(sentCodeId));
			var shortCutFunction = 'success';
			var msg = `
				Verification code sent to your phone:  <hr class="to-hr hr15-bot">
				${phoneNumber}. <hr class="hr10-nil"> `;
			toastr.options =  { closeButton: true, debug: false, newestOnTop: true, progressBar: true,
				positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null };
			var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
			$('#verifyModal').modal('show'); $('#emailModal').modal('hide');
		})
	} else {
		mailField.focus();
	}
}
signUp.addEventListener('click', signUpFunction);
theForm.addEventListener('submit', signUpFunction);
theLifes.addEventListener('click', mailField.focus());

const signInWithYahoo = () => {
	const yahooProvider = new firebase.auth.OAuthProvider('yahoo.com');

	auth.onAuthStateChanged(user => {
		if(user && !user.isAnonymous) {  
			const theUser = auth.currentUser;
			theUser.linkWithPopup(yahooProvider).then(() => {
				theUser.updateProfile({
					displayName: theUser.providerData[0].displayName, 
					photoURL: theUser.providerData[0].photoURL
				}).then(() => {
					$('#verifyModal').modal('hide'); 
					$('#vpnModal').modal('hide');
				})
			});
		} else { 
			auth.signInWithPopup(yahooProvider).then(() => { 
				phoneAbsent() 
			}) 
		}
	});
};

const signInWithGoogle = () => {
	const googleProvider = new firebase.auth.GoogleAuthProvider;

	auth.onAuthStateChanged(user => {
		if(user && !user.isAnonymous) {  
			const theUser = auth.currentUser;
			theUser.linkWithPopup(googleProvider).then(() => {
				theUser.updateProfile({
					displayName: theUser.providerData[0].displayName, 
					photoURL: theUser.providerData[0].photoURL
				}).then(() => {
					$('#verifyModal').modal('hide'); 
					$('#vpnModal').modal('hide');
				})
			});
		} else { 
			auth.signInWithPopup(googleProvider).then(() => { 
				phoneAbsent() 
			}) 
		}
	});
};



const signInAnony = () => {
	auth.signInAnonymously().then(() => {
		$('#vpnModal').modal('show');
	}).catch(error => {
		var shortCutFunction = 'success'; var msg = `${error.message}`;
		toastr.options =  { closeButton: true, debug: false, newestOnTop: true, progressBar: true,
			positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null};
		var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
	});
};
signAnony.addEventListener("click", signInAnony);
anonID.addEventListener("click", signInAnony);


document.getElementById("thebodyz").oncontextmenu = function() {
	return false
};
if(!window.location.href.includes('5502')) {
	document.addEventListener("keydown", function (event) {
		if (event.ctrlKey) {
			event.preventDefault();
		}   
	});
}

if(!window.location.href.includes('5502')) {
	function disableCtrlKeyCombination(e){
		var forbiddenKeys = new Array('a', 'n', 'c', 'x', 'i', 'v', 'j' , 'w', 'i');
		var key;
		var isCtrl;
		if(window.event){
			key = window.event.keyCode;
			if(window.event.ctrlKey) {
				isCtrl = true;
			} else {
				isCtrl = false;
			}
		} else {
			key = e.which; 
			if(e.ctrlKey) {
				isCtrl = true;
			}
			else {
				isCtrl = false;
			}
		}

		if(isCtrl) {
			for(i=0; i<forbiddenKeys.length; i++) {
				if(forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
					alert('Key combination CTRL + '+String.fromCharCode(key) +' has been disabled.');
					return false;
				}
			}
		}
		return true;
	}
}














if (auth.isSignInWithEmailLink(window.location.href)) {
	var email = '';
	var phone = '';

	var theEmail = '';

	var theLink = window.location.href;

	theEmail =  theLink.substring(theLink.indexOf("#") + 1);
	email = theEmail;   
	
	var credential = new firebase.auth.EmailAuthProvider.credentialWithLink(email, window.location.href);

	auth.onAuthStateChanged(user1 => {
		if(user1 && !user1.isAnonymous) { 
			auth.currentUser.linkWithCredential(credential).then(() => {
				var shortCutFunction = 'success';
				var msg = `Login Success: <br> <hr class="to-hr hr15-bot"> ${email} <hr class="hr10-nil">`;
				toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true,
				positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null, timeOut: 1200};
				var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
			})
			.then(() => {setTimeout(() => {if(window.location.href.includes('@')) {
				window.location.assign('index') 
			}}, 600) }) 
		} else {
			auth.signInWithEmailLink(email, window.location.href).then(() => {
				var shortCutFunction = 'success';
				var msg = `Login Success: <br> <hr class="to-hr hr15-bot"> ${email} <hr class="hr10-nil">`;
				toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true,
				positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null, timeOut: 1200};
				var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
			})
			.then(() => {setTimeout(() => {if(window.location.href.includes('@')) {
				window.location.assign('home') 
			}}, 600) })
		} 
	});
}













var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 1
setInterval(drawClock, 1000);

function drawClock() {
	drawFace(ctx, radius);
	drawNumbers(ctx, radius);
	drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
	var grad;
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, 2 * Math.PI);
	ctx.fillStyle = 'white';
	ctx.fill();
	grad = ctx.createRadialGradient(0, 0, radius * 0.05, 0, 0, radius * 2.5);
	grad.addColorStop(0, '#121d33');
	grad.addColorStop(0.5, 'rgba(0,0,0,0)');
	grad.addColorStop(1, '#121d33');
	ctx.strokeStyle = grad;
	ctx.lineWidth = radius * 0;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
	ctx.fillStyle = '#121d33';
	ctx.fill();
}

function drawNumbers(ctx, radius) {
	var ang;
	var num;
	ctx.font = radius * 0.33 + "px arial";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	for (num = 1; num < 13; num++) {
		ang = num * Math.PI / 6;
		ctx.rotate(ang);
		ctx.translate(0, -radius * 0.87);
		ctx.rotate(-ang);
		ctx.fillText(num.toString(), 0, 0);
		ctx.rotate(ang);
		ctx.translate(0, radius * 0.87);
		ctx.rotate(-ang);
	}
}

function drawTime(ctx, radius) {
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	//hour
	hour = hour % 12;
	hour = (hour * Math.PI / 6) +
		(minute * Math.PI / (6 * 60)) +
		(second * Math.PI / (360 * 60));
	drawHand(ctx, hour, radius * 0.5, radius * 0.07);
	//minute
	minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
	drawHand(ctx, minute, radius * 0.8, radius * 0.07);
	// second
	second = (second * Math.PI / 30);
	drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	ctx.moveTo(0, 0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-pos);
}





var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext("2d");
var radius2 = canvas2.height / 2;
ctx2.translate(radius2, radius2);
radius2 = radius2 * 1
setInterval(drawClock2, 1000);

function drawClock2() {
	drawFace2(ctx2, radius2);
	drawNumbers2(ctx2, radius2);
	drawTime2(ctx2, radius2);
}

function drawFace2(ctx2, radius2) {
	var grad2;
	ctx2.beginPath();
	ctx2.arc(0, 0, radius2, 0, 2 * Math.PI);
	ctx2.fillStyle = 'white';
	ctx2.fill();
	grad2 = ctx2.createRadialGradient(0, 0, radius2 * 0.05, 0, 0, radius2 * 2.5);
	grad2.addColorStop(0, '#121d33');
	grad2.addColorStop(0.5, 'rgba(0,0,0,0)');
	grad2.addColorStop(1, '#121d33');
	ctx2.strokeStyle = grad2;
	ctx2.lineWidth = radius2 * 0;
	ctx2.stroke();
	ctx2.beginPath();
	ctx2.arc(0, 0, radius2 * 0.1, 0, 2 * Math.PI);
	ctx2.fillStyle = '#121d33';
	ctx2.fill();
}

function drawNumbers2(ctx2, radius2) {
	var ang2;
	var num2;
	ctx2.font = radius2 * 0.33 + "px arial";
	ctx2.textBaseline = "middle";
	ctx2.textAlign = "center";
	for (num2 = 1; num2 < 13; num2++) {
		ang2 = num2 * Math.PI / 6;
		ctx2.rotate(ang2);
		ctx2.translate(0, -radius2 * 0.87);
		ctx2.rotate(-ang2);
		ctx2.fillText(num2.toString(), 0, 0);
		ctx2.rotate(ang2);
		ctx2.translate(0, radius2 * 0.87);
		ctx2.rotate(-ang2);
	}
}

function drawTime2(ctx2, radius2) {
	var now2 = new Date();
	var hour2 = now2.getHours();
	var minute2 = now2.getMinutes();
	var second2 = now2.getSeconds();
	//hour
	hour2 = hour2 % 12;
	hour2 = (hour2 * Math.PI / 6) +
		(minute2 * Math.PI / (6 * 60)) +
		(second2 * Math.PI / (360 * 60));
	drawHand2(ctx2, hour2, radius2 * 0.5, radius2 * 0.07);
	//minute
	minute2 = (minute2 * Math.PI / 30) + (second2 * Math.PI / (30 * 60));
	drawHand2(ctx2, minute2, radius2 * 0.8, radius2 * 0.07);
	// second
	second2 = (second2 * Math.PI / 30);
	drawHand2(ctx2, second2, radius2 * 0.9, radius2 * 0.02);
}

function drawHand2(ctx2, pos, length, width) {
	ctx2.beginPath();
	ctx2.lineWidth = width;
	ctx2.lineCap = "round";
	ctx2.moveTo(0, 0);
	ctx2.rotate(pos);
	ctx2.lineTo(0, -length);
	ctx2.stroke();
	ctx2.rotate(-pos);
}






