let items = [];

if(localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)){

    items = JSON.parse(localStorage.getItem('banklogs'));
    document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('banklogs')).length);


    updateCartTotal();


    for(var i = 0; i < items.length; i++) {

        var cartCol = document.createElement('div');
        cartCol.classList.add('alert','alert-warning','alert-dismissible');
        var cartColItems = document.getElementsByClassName('cart-alerts')[0];
        var cartColContents = `
        <i class="fas fa-spin fa-sync-alt spinner-bordez"></i> 
        Pending Sale <strong>${items[i].account}</strong>, ${items[i].balance}
            <button type="button" class="btn-close" data-bs-dismiss="alert">&times;</button>
        `


        var cartRow = document.createElement('tr');
        var cartRow2 = document.createElement('li');
        cartRow.classList.add('table-warning');

        cartRow2.classList.add('total','bg-black');
        var cartItems =  document.getElementsByClassName('champez3')[0];

        var cartRowContents = `
            <td><img src=${items[i].image}></td>       
            <td>
                WAIT
                <i class="fas fa-spin fa-sync-alt spinner-bordez"></i>
                <hr id="hr-pend">
                <span>${(items[i].balance).replace('Balance: ','')}</span> 
            </td>
            <td id=${'name-on-table' + items.indexOf(items[i])} style="filter: blur(0px); white-space: normal !important;"></td>  
            <td>${items[i].account}</td>
            <td>${(items[i].price).replace('Price: ', '')}</td>
            <td>${items[i].info1}</td>
            <td>${items[i].info2}</td>
            <td>${items[i].info3}</td>
            <td>${items[i].info4}</td>
            <td>${items[i].info5}</td>
            <td>${items[i].info6}</td>
            <td>${items[i].website}</td>
        `;
        cartRow.innerHTML = cartRowContents;

        cartCol.innerHTML = cartColContents;
        
        cartColItems.prepend(cartCol);

        cartItems.prepend(cartRow);

    }
} else {
    document.getElementById('cartlength').style.display = 'none';

    document.getElementById('thetot').setAttribute('data-bs-target', '#vpnModal');
}


document.getElementById('balance1').innerHTML = '$6,425';
document.getElementById('balance2').innerHTML = '$6,384';
document.getElementById('balance3').innerHTML = '$5,290';
document.getElementById('balance4').innerHTML = '$6,285';
document.getElementById('balance5').innerHTML = '$4,402';
document.getElementById('balance6').innerHTML = '$4,940';
document.getElementById('balance7').innerHTML = '$6,087';
document.getElementById('balance8').innerHTML = '$4,259';
document.getElementById('balance9').innerHTML = '$6,820';

document.getElementById('balance10').innerHTML = '$4,705';
document.getElementById('balance11').innerHTML = '$6,214';
document.getElementById('balance12').innerHTML = '$6,390';
document.getElementById('balance13').innerHTML = '$6,832';
document.getElementById('balance14').innerHTML = '$4,439';
document.getElementById('balance15').innerHTML = '$4,228';
document.getElementById('balance16').innerHTML = '$4,910';
document.getElementById('balance17').innerHTML = '$6,104';
document.getElementById('balance18').innerHTML = '$6,724';
document.getElementById('balance19').innerHTML = '$4,825';

document.getElementById('balance20').innerHTML = '$6,270';
document.getElementById('balance21').innerHTML = '$4,309';
document.getElementById('balance22').innerHTML = '$6,183';
document.getElementById('balance23').innerHTML = '$6,704';
document.getElementById('balance24').innerHTML = '$4,860';
document.getElementById('balance25').innerHTML = '$6,904';
document.getElementById('balance26').innerHTML = '$4,329';
document.getElementById('balance27').innerHTML = '$6,608';

var jobs = document.getElementsByClassName('prized');
for(j=0; j< jobs.length; j++) {
    var theJob = jobs[j];
    var thePrize = theJob.parentElement.children[1].children[2].innerText;
    
    var thePr = parseFloat((thePrize.replace("$", "").replace(",", "") / 57).toFixed(0)).toLocaleString();

    theJob.innerHTML = '$'+ thePr;
}

function updateCartTotal() {
    
    let items3 = (JSON.parse(localStorage.getItem('banklogs')));
    var total = 0;
    items3.map(data=>{
        var price4 = data.price.replace('Price: ','').replace(',','').replace('$','');
        total = total + (price4 * 1);
    });

    document.getElementById('thetot').innerHTML = `Cart:  <span>$${total.toLocaleString()}</span>`;

    var bankLog = (JSON.parse(localStorage.getItem('banklogs'))[0].account);
    
    if(JSON.parse(localStorage.getItem('banklogs')).length == 1) {
        if(bankLog.includes('Huntington')) {
            document.getElementsByClassName('huntington')[0].style.display = 'block';
        } else if(bankLog.includes('America')) {
            document.getElementsByClassName('bankofamerica')[0].style.display = 'block';
        } else if(bankLog.includes('Chime')) {
            document.getElementsByClassName('chime')[0].style.display = 'block';
        } else if(bankLog.includes('Chase') || bankLog.includes('Truist')) {
            document.getElementsByClassName('achtransfer')[0].style.display = 'block';
        } else if(bankLog.includes('Citi')) {
            document.getElementsByClassName('wiretransfer')[0].style.display = 'block';
        } else if(bankLog.includes('Federal')) {
            document.getElementsByClassName('navyfederal')[0].style.display = 'block';
        } else if(bankLog.includes('P.N.C') || bankLog.includes('R.B.C')) {
            document.getElementsByClassName('coinbase')[0].style.display = 'block';
        } else if(bankLog.includes('Fargo')) {
            document.getElementsByClassName('wellsfargo')[0].style.display = 'block';
        } else if(bankLog.includes('Woodforest')) {
            document.getElementsByClassName('woodforest')[0].style.display = 'block';
        }

    } 
}