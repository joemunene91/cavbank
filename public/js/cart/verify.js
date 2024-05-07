let items = [];
var table3 = jQuery('#example1').DataTable();

var theLogo = document.getElementById('logo');
var theLogo2 = document.getElementById('vpn-img');

var btcChecks = document.getElementById('btc-check');
var cartLength = document.getElementById('cartlength');


if(localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)){
    cartLength.innerText = (JSON.parse(localStorage.getItem('banklogs')).length);

    updateCartTotal();
} else {
    cartLength.style.display = 'none';
    btcChecks.innerHTML = `Home Page ID`;
    btcChecks.setAttribute('href', 'home');
}



function updateCartTotal() {
    let items3 = (JSON.parse(localStorage.getItem('banklogs')));
    var total = 0;
    items3.map(data=>{
        var price4 = data.price.replace('Price: ','').replace(',','').replace('$','');
        total = total + (price4 * 1);
    });
    
    document.getElementById('thetot').innerHTML = `Cart:  <span>$${total.toLocaleString()}</span>`;

    btcChecks.innerHTML = `Checkout <span class="muher">$${total.toLocaleString()}</span>`;

    if(localStorage.getItem('timez-set')) {
        localStorage.removeItem('timez-set');
    }
}