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


const theId = document.getElementById('the-id');
const theDate = document.getElementById('the-date');
const labelDate = document.getElementById('label-date');

const logoHolder = document.getElementById("logo");
const vpnHolder = document.getElementById("vpn-img");

const jinaHolder = document.getElementById("jinaHolder");
const jinaHolder2 = document.getElementById('jinaHolder2');
const jinaHolder3 = document.getElementById("jinaHolder3");

const labelP = document.getElementById('label-ip');
const theIP = document.getElementById('the-ip');



const vpnNav = document.getElementById('vpn-nav');

const auth = firebase.auth();


auth.onAuthStateChanged(user => {
	if(!user) {
		window.location.assign('index');
	}

	if (user.photoURL) {
		logoHolder.setAttribute("src", user.photoURL);
		logoHolder.classList.add('logo-50');
		vpnHolder.setAttribute("src", user.photoURL);
		vpnHolder.classList.add('logo-50');
	} 

	if(user.email) {
		var theaddress = (user.email).substring(0, (user.email).indexOf('@'));
		if (user.displayName) { theaddress = user.displayName } 
		jinaHolder3.value = theaddress.substring(0, 12);
        jinaHolder.value = theaddress.substring(0, 12);
		vpnNav.innerHTML = theaddress.substring(0, 12);
	} else if(user.phoneNumber) {
		jinaHolder3.value = user.phoneNumber;
		vpnNav.innerHTML = user.phoneNumber;
        jinaHolder.value = user.phoneNumber;
	} else if(user.isAnonymous) {
		jinaHolder3.value = 'Anonymous';
		vpnNav.innerHTML = 'Anonymous';
        jinaHolder.value = 'Anonymous';
	}

	theId.innerHTML = user.uid;
	let theDatez2 = new Date(user.metadata.b * 1);
	let theDatez = theDatez2.toString();
	let therealDate = theDatez.substring(theDatez.indexOf('(') + 1).replace(' Time)', '');
	theDate.innerHTML = theDatez.replace('2023', '').split('(')[0];
	labelDate.innerHTML = `Time ID: (${therealDate})`;
});




fetch('https://ipapi.co/json/').then(function(response) { return response.json()}).then(function(data) {
labelP.innerHTML = `IP Address: (<span>${data.ip}</span>)`;theIP.innerHTML = ` ${data.region},  ${data.org}.`;
});


















document.getElementById('photo2').addEventListener('change', (event) => {
	const file = event.target.files[0];
	const storageRef = firebase.storage().ref('images/images' + file.name);
	storageRef.put(file).on('state_changed', (snapshot) => {
		const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		const progressBar_2 = document.getElementById("upload-pic");
		progressBar_2.style.width = progress + '%';
		document.getElementById('escoz-3').innerHTML = 'Upload Progress: ' + progress + '%';
	}, (err) => {
		console.log('an error has occurred')
	}, async () => {
		const url = await storageRef.getDownloadURL();

		var carRow = document.createElement('a');
		carRow.setAttribute('data-src', `${url}`);
		carRow.setAttribute('data-sub-html', `<h4 class='wh'> #100 </h4>`)
		var carItems = document.getElementById('the-gal');
		var carRowContents = `
			<div class="masonry-item">
				<img alt="project" src=${url}>
				<div class="masonry-item-overlay"> <ul>
						<li> #100 </li>
				</ul></div>
			</div>
		`;
		carRow.innerHTML = carRowContents;
		carItems.append(carRow);
	});
});
var storageRef2 = firebase.storage().ref();
var i = 0;
storageRef2.child('images/').listAll().then(function(result) {
	result.items.forEach(function(imageRef) {
		i++;
		displayImage(i, imageRef);
	})
})

function displayImage(row, images) {
	images.getDownloadURL().then(function(url) {
		var carRow = document.createElement('a');
		carRow.setAttribute('data-src', `${url}`);
		carRow.setAttribute('data-sub-html', `<h4 class='wh'> #100 </h4>`)
		var carItems = document.getElementById('the-gal');
		var carRowContents = `
			<div class="masonry-item">
				<img alt="project" src=${url}>
				<div class="masonry-item-overlay"> <ul>
						<li> #100 </li>
				</ul></div>
			</div>
		`;
		carRow.innerHTML = carRowContents;
		carItems.append(carRow);
	})
}




var d = new Date();
var n = d.getMonth() + 1;
var y = d.getFullYear();
var m = d.getDate();



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


















