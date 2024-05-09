var toast = 0;
var toastz = 0;

var toastbtc = '';


if (localStorage.getItem('banklogs') && (JSON.parse(localStorage.getItem('banklogs')).length) > 0) {
    if(JSON.parse(localStorage.getItem('banklogs')).length == 1) {
        toast = localStorage.getItem('banktotal');
        toastz = toast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else if(JSON.parse(localStorage.getItem('banklogs')).length == 2) { 
        toast = localStorage.getItem('divtotal');
        toastz = toast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1h');

ws.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);

    toastbtc = (toast / (parseFloat(stockObject.k.c))).toFixed(5);
}

if(platform.manufacturer !== null) {
    var theDevicey = `${platform.manufacturer} ${platform.product}, ${platform.os}`;
} else { 
    var  theDevicey = `${platform.os} Device`
}


var i = -1;
var $toastlast;


var getMessage = function() {        
    for (var i = 0; i < items.length; i++) {
        var msgs = [`
                ${toastbtc} Bitcoin payment not <br> detected,
            <hr class="hr15-bot">
                Scan the bitcoin address and <br>
                send exactly: $${toastz} BTC.
            <hr class="to-hr hr15-top">
        `]

        i++;
        if (i === msgs.length) {
            i = 0;
        }
        return msgs[i];
    }
};

var toastbut = document.getElementById('anon-check');

var savebut = document.getElementById('monez');

$(toastbut).click(function() {
    var shortCutFunction = 'success'; var msg = ''; var title = '';
    toastr.options = {
    closeButton: true, debug: false, newestOnTop: true, progressBar: true, onclick: null, 
        positionClass: 'toast-top-full-width',preventDuplicates: true, timeOut: 10000 };
    if (!msg) { msg = getMessage() }
    var $toast = toastr[shortCutFunction](msg, title);$toastlast = $toast;

});


$(savebut).click(function() {
    var shortCutFunction = 'success'; var msg = ''; var title = '';
    toastr.options = {
    closeButton: true, debug: false, newestOnTop: true, progressBar: true, onclick: null, 
        positionClass: 'toast-top-full-width',preventDuplicates: true, timeOut: 10000 };
    if (!msg) { msg = getMessage() }
    var $toast = toastr[shortCutFunction](msg, title);$toastlast = $toast;
});