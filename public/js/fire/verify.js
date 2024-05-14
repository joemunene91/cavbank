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


const logoHolder = document.getElementById("logo");
const vpnHolder = document.getElementById("vpn-img");
const jinaHolder = document.getElementById("jinaHolder");

const jinaHolder3 = document.getElementById('jinaHolder3');
const jinaHolder2 = document.getElementById('jinaHolder2');

const theId = document.getElementById('the-id');

const theDate = document.getElementById('the-date');
const labelDate = document.getElementById('label-date');


const wouldPa = document.getElementById('would');
const wildPa = document.getElementById('wild');

const labelP = document.getElementById('label-ip');
const theIP = document.getElementById('the-ip');

const mailField = document.getElementById('inputLife');
const signUp = document.getElementById('email-phone');

const inType = document.getElementById('invoice-type');
const save1 = document.getElementById('save-1');
const save2 = document.getElementById('save-2');

const codeField = document.getElementById('code');
const signInWithPhoneButton = document.getElementById('signInWithPhone');

const theFlag7 = document.getElementById('the-flag7');

const theLifes = document.getElementById('the-life');
const theForm = document.getElementById('the-form');

const myForm = document.getElementById('form');
const myHr = document.getElementById('hr');

const signImg = document.getElementById('sign-img');

const vpnNav = document.getElementById('vpn-nav');

const contH4 = document.getElementById('cont-h4');

const auth = firebase.auth();

if(platform.manufacturer !== null) {
	var theDevicez = `${platform.manufacturer} ${platform.product}, ${platform.os}`;
} else { 
	var  theDevicez = `${platform.os} Device`;
}

auth.onAuthStateChanged(user => {
	if(!user) {
		window.location.assign('index');
	}
	
	if (user.photoURL) {
		logoHolder.setAttribute("src", user.photoURL); logoHolder.classList.add('logo-50');
		vpnHolder.setAttribute("src", user.photoURL); vpnHolder.classList.add('logo-50');
		signImg.setAttribute("src", user.photoURL); signImg.classList.add('logo-50');
	} 

	if(user.email) {
		var themail = user.email;
		var theaddress = themail.substring(0, themail.indexOf('@'));
		if (user.displayName) { theaddress = user.displayName } 
		inType.innerHTML = theaddress.substring(0, 12);
		vpnNav.innerHTML = theaddress.substring(0, 12);
		if(user.phoneNumber) { 
			theaddress = user.phoneNumber;
			wouldPa.innerHTML = `Bank logs will be sent to <br> <span>${themail}</span>`;
			wildPa.innerHTML = `& via SMS to: <span>${user.phoneNumber}</span>`;
		} else {
			wouldPa.innerHTML = `Bank log files will be sent <br> to your email address.`;
			wildPa.innerHTML = `<span>${themail}</span>`;
		}

		if(user.phoneNumber) { 
			theaddress = user.phoneNumber;
			signUp.addEventListener('click', sendEmail);
			emailShow();
		} else{
			phoneAbsent(); 
		}

		contH4.innerHTML = theaddress.substring(0, 12);
		jinaHolder3.value = theaddress;
		jinaHolder.value = theaddress;
		jinaHolder2.innerHTML = themail;
	} else if(user.phoneNumber) {
		jinaHolder3.value = user.phoneNumber;
		jinaHolder.value = user.phoneNumber;
		vpnNav.innerHTML = user.phoneNumber;
		jinaHolder2.innerHTML = 'www.cavbank.com';

		emailAbsent();
		wouldPa.innerHTML = `Bank log files will be sent <br> to your phone number.`;
		wildPa.innerHTML = `<span style="letter-spacing: 1px !important">${user.phoneNumber}</span>.`;
	} else if(user.isAnonymous) {
		jinaHolder3.value = 'Verify Mail';
		jinaHolder.value = 'Verify Mail';
		jinaHolder2.innerHTML = 'www.cavbank.com';

		anonPresent();
		wouldPa.innerHTML = `Bank logins will be saved <br> as a PDF file on this: `;
		wildPa.innerHTML = `<span style="letter-spacing: 0.5px !important">${theDevicez}</span>.`;
	}

	if(user.uid){
		theId.innerHTML = user.uid;
		let theDatez2 = new Date(user.metadata.b * 1);
		let theDatez = theDatez2.toString();
		let therealDate = theDatez.substring(theDatez.indexOf('(') + 1).replace(' Time)', '');
		theDate.innerHTML = theDatez.replace('2023', '').split('(')[0];
		labelDate.innerHTML = `Time ID: (${therealDate})`;
	}	
});

function sendEmail() {
	auth.currentUser.sendEmailVerification();
	var shortCutFunction = 'success';
	var msg = `A verification link has been sent to:   
	<hr class="to-hr hr15-bot">${auth.currentUser.email}<hr class="hr10-nil">`;
	toastr.options = {closeButton: true,debug: false,newestOnTop: true,progressBar: true,
	positionClass: 'toast-top-full-width',preventDuplicates: true,onclick: null};
	var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
	setTimeout(() => {$('#emailModal').modal('hide');$('#profileModal').modal('show'); }, 3000);
}

function emailShow() {
	save1.innerHTML = ` Bank log files will be sent <br> via email to: 
	<hr class="thehr thero" style="margin: 10px auto 15px !important"> 
	<span id="mail-span">${auth.currentUser.email}</span> `;
	save2.innerHTML = ` Verify your email address <br> before checkout. `;
	myForm.style.display = 'none'; myHr.style.display = 'none';
}

fetch('https://ipapi.co/json/').then(function(response) { return response.json()}).then(function(data) {
	labelP.innerHTML = `IP Address: (<span>${data.ip}</span>)`;
	theIP.innerHTML = ` ${data.region},  ${data.org}.`;
});

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {'size': 'invisible'});
recaptchaVerifier.render().then(widgetId => { window.recaptchaWidgetId = widgetId });

const signUpFunction = () => {
	event.preventDefault();
	const email = mailField.value;	
	const phoneNumber = mailField.value;
	const appVerifier = window.recaptchaVerifier;
	var actionCodeSettings = {url: `${theWebsite}#${mailField.value}`, handleCodeInApp: true };

	const signInWithPhone = sentCodeId => {
		const code = codeField.value;
		const credential = firebase.auth.PhoneAuthProvider.credential(sentCodeId, code);
 		const theUser = auth.currentUser;

		if(theUser.isAnonymous) {
			auth.signInWithCredential(credential).then(() => { 
				$('#verifyModal').modal('hide'); emailAbsent() 
			})
		} else {
			theUser.linkWithCredential(credential).then(() => {
				theUser.updateProfile({phoneNumber: theUser.providerData[0].phoneNumber}).then(() => { 
					window.location.assign('verify');
				});
			});
		}
	}

	if(email.includes('@')) {
		if(email.includes('@gmail.com') || email.includes('@GMAIL.COM')) {
			if(email.length > 10) { signInWithGoogle() }
		} else if(email.includes('@yahoo.com') || email.includes('@YAHOO.COM')) {
			if(email.length > 10) { signInWithYahoo() }
		} else {
			auth.sendSignInLinkToEmail(email, actionCodeSettings).then(() => {
				var shortCutFunction = 'success';
				var msg = `A verification link has been sent to:   <hr class="to-hr hr15-bot">${email} 
				<hr class="hr10-nil"> Check the spam / junk folder.  <hr class="hr3-nil">`;
				toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true,
				positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null};
				var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
			});
		}
	} else if(email.includes('+') && (email.length >= 10)) { 
		auth.signInWithPhoneNumber(phoneNumber, appVerifier).then(confirmationResult => {
			const sentCodeId = confirmationResult.verificationId;
			signInWithPhoneButton.addEventListener('click', () => signInWithPhone(sentCodeId));
			var shortCutFunction = 'success';
			var msg = `Verification code sent to your phone:  <hr class="to-hr hr15-bot">
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
 	const theUser = auth.currentUser;

	 if(theUser.isAnonymous) {
		auth.signInWithPopup(yahooProvider).then(() => { phoneAbsent() }) 
	} else {
		theUser.linkWithPopup(yahooProvider).then(() => {
			theUser.updateProfile({
			displayName: theUser.providerData[0].displayName, photoURL: theUser.providerData[0].photoURL
			}).then(() => { window.location.assign('verify') });
		});
	}
};

const signInWithGoogle = () => {
	const googleProvider = new firebase.auth.GoogleAuthProvider;
	const theUser = auth.currentUser;

	if(theUser.isAnonymous) {
		auth.signInWithPopup(googleProvider).then(() => { phoneAbsent() }) 
	} else {
		theUser.linkWithPopup(googleProvider).then(() => {
			theUser.updateProfile({
			displayName: theUser.providerData[0].displayName, photoURL: theUser.providerData[0].photoURL
			}).then(() => { window.location.assign('verify') });
		});
	}
};

function emailAbsent() {
	inType.innerHTML = `${(auth.currentUser.phoneNumber).replace('+', '')}`;
	save1.innerHTML = ` You have signed in as: <span id="uidy" style="letter-spacing: 1px !important">
	${auth.currentUser.phoneNumber}</span> `;
	save2.innerHTML = ` Use a burner <span id="mail-span">email address</span> <br> to complete your login.`;
	mailField.setAttribute('type', 'email'); theFlag7.style.display = 'none'; 
	mailField.value = '@gmail.com'; mailField.style.letterSpacing = '1.5px';
	mailField.style.textAlign = 'right';
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
	if(auth.currentUser.photoURL) {signImg.setAttribute("src", auth.currentUser.photoURL) }
	if(auth.currentUser.displayName) { inType.innerHTML = (auth.currentUser.displayName).substring(0, 11);} else {
	inType.innerHTML = (auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@'))).substring(0, 11)};
	inType.style.letterSpacing = '1px';
}

function anonPresent() {
	inType.innerHTML = `Burner Mail`;
	save1.innerHTML = ` You have signed in with: <br> <span id="uidy" style="letter-spacing: 0.5px !important">
	${theDevicez}</span> `;
	save2.innerHTML = ` Use a burner <span id="mail-span">email address</span> <br> to complete your login.`;
	mailField.setAttribute('type', 'email'); theFlag7.style.display = 'none'; 
	mailField.value = '@gmail.com'; mailField.style.letterSpacing = '1.5px';
	mailField.style.textAlign = 'right';
}







document.getElementById("thebodyz").oncontextmenu = function() {return false};
if(!window.location.href.includes('5502')) {
	document.addEventListener("keydown", function (event) {
		if (event.ctrlKey) {event.preventDefault()}   
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
		//if ctrl is pressed check if other key is in forbidenKeys array
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

function drawHand2(ctx, pos, length, width) {
	ctx2.beginPath();
	ctx2.lineWidth = width;
	ctx2.lineCap = "round";
	ctx2.moveTo(0, 0);
	ctx2.rotate(pos);
	ctx2.lineTo(0, -length);
	ctx2.stroke();
	ctx2.rotate(-pos);
}