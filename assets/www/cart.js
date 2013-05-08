cartValue = 0;

function debit_tag(credit){
	creditAvail = parseFloat(credit);
	if (creditAvail<cartValue)
		{
			navigator.notification.alert("Not enough balance, please top-up");
		}
		else
		{
			newCredit = creditAvail - cartValue;
			payload = newCredit.toString();
			writeTag(payload);
			navigator.notification.alert("Amount Debited: "+ cartValue + "\n" + "Initial Credit: "+creditAvail+"\n"+"Total Available Credit: "+newCredit);		
		}


}


function current_credit(nfcEvent){
	try{
		tag_payload = nfcEvent.tag.ndefMessage[0]['payload'];
		credit = nfcTagStringTasks(tag_payload);
		debit_tag(credit);
		}
	catch(e)
		{
		navigator.notification.alert("Error Found" + e);
		}		
}



function onDeviceReady(){
	pay.onclick = function(){nfc.addNdefListener(current_credit,successTagRead,failedTagRead);}
}




function add_to_cart(increment){  	
  cartValue = cartValue +parseFloat(increment);
  cartBox = document.getElementById('cartValue');
  cartBox.innerHTML = "Total= " + cartValue.toString();
}


function initialiseIds()
{

	beers = document.getElementById('beers');
	pizza = document.getElementById('pizza');
	burger = document.getElementById('burger');
	pay= document.getElementById('pay')
	
	}
	
function registerEvents() {
	
	beers.onclick = function(){add_to_cart(beers.getAttribute('data-value'));}
	pizza.onclick = function(){add_to_cart(pizza.getAttribute('data-value'));}
	burger.onclick = function(){add_to_cart(burger.getAttribute('data-value'));}
	sausage.onclick = function(){add_to_cart(sausage.getAttribute('data-value'));}
	document.addEventListener("deviceready", onDeviceReady, true);


}



window.onload = function ()
 {
   
	initialiseIds();
	registerEvents();
}


