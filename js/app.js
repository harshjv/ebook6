
	var Web3 = require('web3');
if (typeof web3 !== 'undefined') {
  var web3 = new Web3(web3.currentProvider);
} else {
var web3 = new Web3(new Web3.providers.HttpProvider("http://65.52.189.129:8545"));

}
web3.eth.defaultAccount = web3.eth.accounts[0];
var ABI=[{"constant":true,"inputs":[{"name":"bookID","type":"uint256"}],"name":"verifyLicense","outputs":[{"name":"license","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"listingID","type":"uint256"}],"name":"getListing","outputs":[{"name":"bookID","type":"uint256"},{"name":"isNew","type":"bool"},{"name":"price","type":"uint256"},{"name":"seller","type":"address"},{"name":"bookName","type":"string"},{"name":"authorName","type":"string"},{"name":"imageURL","type":"string"},{"name":"bookURL","type":"string"},{"name":"numOwners","type":"uint256"},{"name":"numLicensees","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"books","outputs":[{"name":"bookName","type":"string"},{"name":"authorName","type":"string"},{"name":"imageURL","type":"string"},{"name":"bookURL","type":"string"},{"name":"price","type":"uint256"},{"name":"owner","type":"address"},{"name":"publisher","type":"address"},{"name":"numOwners","type":"uint256"},{"name":"numLicensees","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"bookID","type":"uint256"}],"name":"list","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfBooks","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfListings","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"listingID","type":"uint256"}],"name":"buyUsed","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"listingID","type":"uint256"}],"name":"buy","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"bookName","type":"string"},{"name":"authorName","type":"string"},{"name":"imageURL","type":"string"},{"name":"bookURL","type":"string"},{"name":"price","type":"uint256"},{"name":"publisher","type":"address"}],"name":"register","outputs":[{"name":"bookID","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"bookID","type":"uint256"}],"name":"verifyOwnership","outputs":[{"name":"ownership","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"listings","outputs":[{"name":"bookID","type":"uint256"},{"name":"isNew","type":"bool"},{"name":"price","type":"uint256"},{"name":"seller","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"bookID","type":"uint256"}],"name":"getBook","outputs":[{"name":"bookName","type":"string"},{"name":"authorName","type":"string"},{"name":"imageURL","type":"string"},{"name":"bookURL","type":"string"},{"name":"price","type":"uint256"},{"name":"numOwners","type":"uint256"},{"name":"numLicensees","type":"uint256"},{"name":"owner","type":"address"},{"name":"publisher","type":"address"}],"type":"function"},{"inputs":[{"name":"platformCommission","type":"uint256"}],"type":"constructor"}]
;
var Dindle = web3.eth.contract(ABI);
var dindle = Dindle.at("0x38c8dff976205c8512dc69c23303d034a278da33");	
var i=0;

function selectAccount(id)
{
	 var popovers = $('#myPopover');
     $(popovers).removeClass('visible');
     $(popovers).removeClass('active');
     $(popovers).hide();
     $("div.backdrop").remove();
	 web3.eth.defaultAccount = web3.eth.accounts[id];
	 document.getElementById('account_id').innerText = String(id); //web3.eth.defaultAccount;
	 document.getElementById('account_balance').innerText = Math.round(web3.fromWei(web3.eth.getBalance(web3.eth.defaultAccount),"finney")*100)/100;
}

function showBalances() {
	document.getElementById('account_id').innerText = "0"; //web3.eth.defaultAccount;
	document.getElementById('account_balance').innerText = Math.round(web3.fromWei(web3.eth.getBalance(web3.eth.defaultAccount),"finney")*100)/100;
	document.getElementById('account_balance0').innerText = Math.round(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]),"finney")*100)/100;
	document.getElementById('account_balance1').innerText = Math.round(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[1]),"finney")*100)/100;
	document.getElementById('account_balance2').innerText = Math.round(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[2]),"finney")*100)/100;

}
function listBooks()
{
  var totalBooks = dindle.getNumberOfListings().toNumber();
  //console.log(totalBooks);
    res=dindle.getListing(i);
    // //console.log(res);
    //if (res[1]==true){
    for(var i=0; i<totalBooks; i++) {
    getListing(i);
  
}
}
function getListing(bookID,isUsed) {

    var res = dindle.getListing(bookID);
    //   document.getElementById("books").insertAdjacentHTML( 'afterbegin', '<div id="booklist" class="col-sm-2 col-lg-2 col-md-2"/><img height="200px" width="120px" src="'+
    // res[2]+'" alt=""><input type="button" class="btn" onclick="listy('+bookID+');" value="List for sale"></div>' );
    //console.log(res);
    if (res[1]==false){
    	condition="";
    }
    else
    {
    	condition="Used";
    }
    $("#bookList").append('<li class="table-view-cell media">'+
      '<img class="media-object pull-left bookCover" src="'+res[6]+
'"      <div class="media-body">'+
		res[4]+
'        <p><b>by '+res[5]+'</b></p>'+
'        <p><button class="btn btn-primary"onclick="buy('+i+','+res[2].toNumber()+');">E '+res[2]+' Buy</button></p>'+
'      </div><i>'+condition+'</i>'+
'  </li>')

}

function buy(listingID,price) {
	//console.log(web3.toWei(price,'finney'));
  var res = dindle.buy(listingID,{value: web3.toWei(price,'finney'), gas: 2000000});
  //console.log(res);
  //console.log(this);
  //document.getElementById('result').innerText = res.toString(10);
  $(".content-padded").append('<div id="message"><div style="padding: 5px;"><div class="alert alert-success"><strong>Success!</strong>');
}



$( document ).ready(function() {
showBalances();
listBooks();
});