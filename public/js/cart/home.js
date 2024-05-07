let items = [];

if(localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)){

    items = JSON.parse(localStorage.getItem('banklogs'));
    document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('banklogs')).length);

    updateCartTotal();


    for(var i = 0; i < items.length; i++) {
        var cartRow2 = document.createElement('li');
        cartRow2.classList.add('total','bg-black');
        var cartItems =  document.getElementsByClassName('champez')[0];

        updateCartTotal();
    }
} else {
    document.getElementById('cartlength').style.display = 'none';
    document.getElementById('vpn').style.display = 'none';
}

function updateCartTotal() {
    
    let items3 = (JSON.parse(localStorage.getItem('banklogs')));
    var total = 0;
    items3.map(data=>{
        var price4 = data.price.replace('Price: ','').replace(',','').replace('$','');
        total = total + (price4 * 1);
    });

    document.getElementById('thetot').innerHTML = `Cart:  <span>$${total.toLocaleString()}</span>`;
}