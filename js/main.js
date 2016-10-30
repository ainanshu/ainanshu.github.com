
var oC1 = document.getElementById('canvas1');
var oC2 = document.getElementById('canvas2');
var oAll = document.getElementById('allcanvas');
var W = document.documentElement.clientWidth;
var H = document.documentElement.clientHeight;

oC1.width=W;
oC1.height=H;
oC2.width=W;
oC2.height=H;
oAll.style.width=W+'px';
oAll.style.height=H+'px';

var can1;
var can2;

var ctx1;
var ctx2;

var lastTime;
var deltaTime;

var ane;

var fruit;
var bgPic = new Image();

var mom;
var mx;
var my;

var baby;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];

var helo;
var dust;
var dustPic = [];

document.body.onload = game;

function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init(){
	can1 = document.getElementById('canvas1');
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById('canvas2');
	ctx2 = can2.getContext('2d');
	//跟随鼠标移动
	can1.addEventListener('mousemove',onMouseMove,false);
	//移动端手指按下移动
	can1.addEventListener('touchmove',function(ev){
		if(!data.gameOver){
			mx = ev.targetTouches[0].pageX;
			my = ev.targetTouches[0].pageY;
		}
	},false);
		
		
	bgPic.src="src/background.jpg";
	
	canWidth = can1.width;
	canHeight = can1.height;
	
	ane = new aneObj();
	ane.init();
	fruit = new fruitObj();
	fruit.init();
	
	mom = new momObj();
	mom.init();
	mx = canWidth/2;
	my = canHeight/2;
	
	baby = new babyObj();
	baby.init();
	
	for(var i = 0; i < 8; i++){
		babyTail[i] = new Image();
		babyTail[i].src = "src/babyTail"+i+".png";
	}
	
	for(var i = 0; i < 2; i++){
		babyEye[i] = new Image();
		babyEye[i].src = "src/babyEye"+i+".png";
	}
	
	for(var i = 0; i < 20; i++){
		babyBody[i] = new Image();
		babyBody[i].src = "src/babyFade"+i+".png";
	}
	
	for(var i = 0; i < 8; i++){
		momTail[i] = new Image();
		momTail[i].src = "src/bigTail"+i+".png";
	}
	
	for(var i = 0; i < 2; i++){
		momEye[i] = new Image();
		momEye[i].src = "src/bigEye"+i+".png"
	}
	
	data = new dataObj();
	for(var i = 0; i < 8; i++){
		momBodyOra[i] = new Image();
		momBodyBlue[i] = new Image();
		momBodyOra[i].src = "src/bigSwim"+i+".png";
		momBodyBlue[i].src = "src/bigSwimBlue"+i+".png";
	}
	
	ctx1.font = "30px Verdana"
	ctx1.textAlign = "center";
	
	wave = new waveObj();
	wave.init();
	helo = new heloObj();
	helo.init();
	
	for(var i = 0; i < 7;i++){
		dustPic[i] = new Image();
		dustPic[i].src = "src/dust"+i+".png";
	}
	dust = new dustObj();
	dust.init();

}

function gameloop(){
	window.requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime > 30) deltaTime = 30;
	
	drawBackground();
	
	ane.draw();
	fruitMonitor();
	fruit.draw();
	
	ctx1.clearRect(0,0,can1.width,can1.height);
	mom.draw();
	baby.draw();
	momBabyCollision();
	momFruitCollision();
	data.draw();
	wave.draw();
	helo.draw();
	dust.draw();

};

function onMouseMove(ev){
	if(!data.gameOver){
		if(ev.offSetX || ev.layerX){
			mx = ev.offSetX == undefined ? ev.layerX : ev.offSetX;
			my = ev.offSetY == undefined ? ev.layerY : ev.offSetY;
			
		};
		
	}
};




















