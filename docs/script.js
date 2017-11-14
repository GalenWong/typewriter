var stop=false;

var typerID=0;
var reduceID=0;
var data=['Hi, this is Galen. ','And I code. '];

var i=0;
var char=0;

var typePeriod = 100;
var reducePeriod = 100;
var blinkPeriod = 500;

$(function(){
	attachEventHandlers();
	typerID=setInterval(typer,typePeriod);
});



function attachEventHandlers(){
	$('.stop').on('click',handleStopClick);
	$('.resume').on('click',handleResumeClick);
}

function handleStopClick(){	
	$('.resume').show();
	$('.stop').hide();
	stop=true;
	clearInterval(id);
	id=setInterval(blink,2*blinkPeriod);
}

function handleResumeClick(){
	$('.resume').hide();
	$('.stop').show();

	stop=false;
	typer();
}



function typer(){
	if(stop) return 0;

	clearInterval(id);
	
	if(char===data[i].length){
		id=setInterval(blink,2*blinkPeriod);
		i++;

		if(i===data.length){
			clearInterval(id);
			clearInterval(typerID);
			id=setInterval(blink,2*blinkPeriod);
			setTimeout(function(){reduceID=setInterval(reduce,reducePeriod);},4000+blinkPeriod);

			return 0;
		}

		clearInterval(typerID);
		char=0;
		setTimeout(function(){typerID=setInterval(typer,typePeriod)},2000+blinkPeriod);
	}
	else if(char<data[i].length && i<data.length){
		document.getElementById('Text').innerHTML+=data[i][char];
		char++;

	}
}

var id=0;


function blink(){
	$('.navigator').addClass('transparent');
	setTimeout(function(){$('.navigator').removeClass('transparent');},blinkPeriod);
}

function reduce(){
	
	if(stop) return 0;
	clearInterval(id);
	var txt=document.getElementById('Text').innerHTML;
	
	if(txt!==""){
		document.getElementById('Text').innerHTML=txt.substring(0,txt.length -1);
	}
	else{
		clearInterval(reduceID);
		char=0;
		i=0;
		id=setInterval(blink,2*blinkPeriod);
		setTimeout(function(){typerID=setInterval(typer,typePeriod);},3000+blinkPeriod);
	}
}
