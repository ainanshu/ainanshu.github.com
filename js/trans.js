//rem标准
	(function(win,doc){
		win.addEventListener('resize',fontSize,false);
		fontSize();
		function fontSize(){
			doc.documentElement.style.fontSize=doc.documentElement.clientWidth/25+'px';
		}
	})(window,document)
 
        window.onload = function() {
            var oBox = document.getElementById('box');
            var oPrev = oBox.children[0];
            var oNext = oBox.children[1];
            var oUl = oBox.children[2];
            var oOl = oBox.children[3];
            var aLi = oUl.children;
            var aBtn = oOl.children;
            var iNow = 0;

            oBox.onmouseover = function() {
                moveAll(oPrev, {opacity: 1});
                moveAll(oNext, {opacity: 1});
            };
            oBox.onmouseout = function() {
                moveAll(oPrev, {opacity: 0});
                moveAll(oNext, {opacity: 0});
            };

            // 复制一份内容
            oUl.innerHTML += oUl.innerHTML;
            // 重新计算宽度
            oUl.style.width = aLi[0].offsetWidth*aLi.length + 'px';

            oPrev.onclick = function() {
                iNow--;
                tab();
            };

            // 下一个
            oNext.onclick = function() {
                iNow++;
                tab();
            };

            // 选项卡
            for (var i = 0; i < aBtn.length; i++) {
                (function(index){
                    aBtn[i].onclick = function() {
                        // 清空所有
                        iNow = Math.floor(iNow/aBtn.length)*aBtn.length + index;
                        tab();
                    };
                })(i);
            }

            function tab() {
                for (var i = 0; i < aBtn.length; i++) {
                    aBtn[i].className = '';
                }
                if (iNow > 0) {
                    aBtn[iNow%aBtn.length].className = 'active';
                } else {
                    aBtn[(iNow%aBtn.length+aBtn.length)%aBtn.length].className = 'active';
                }

                startMove(oUl,-iNow*aLi[0].offsetWidth);
            }

            var left = 0;
            var timer = null;
            var W = oUl.offsetWidth/2;
            function startMove(obj,iTarget) {
                clearInterval(timer);
                var start = left; // 起点
                var dis = iTarget - start; // 总距离
                var count = Math.floor(700/30);// 总次数

                var n = 0; // 当前走了几次了
                timer = setInterval(function() {
                    n++;
                    var a = 1-n/count;
                    left = start + dis*(1-Math.pow(a,3));
                    if (left < 0) {
                        obj.style.left = left%W + 'px';
                    } else {
                        obj.style.left = (left%W-W)%W + 'px';
                    }
                    if (n == count) {
                        clearInterval(timer);
                    }
                },30);
            }
        };

//导航栏
function getPos(obj) {
	var l = 0;
	var t = 0;
	while (obj) {
		l += obj.offsetLeft;
		t += obj.offsetTop;

		obj = obj.offsetParent;
	}
	return {left:l, top:t};
}

var oDiv = document.getElementById('header');
var iDivT = getPos(oDiv).top;

window.onscroll = function() {
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	
	if (scrollTop >= iDivT) {
		if (window.navigator.userAgent.indexOf('MSIE 6.0') != -1) {
			oDiv.style.position = 'absolute';
			oDiv.style.top = scrollTop + 'px';
4		} else {
			oDiv.style.position = 'fixed';
			oDiv.style.top = 0;
		}
		oDiv.style.left = 0;
	} else {
		oDiv.style.position = '';
	}
};

//穿墙
function getDir(obj,ev){
	var x=obj.getBoundingClientRect().left+obj.offsetWidth/2-ev.clientX;
	var y=obj.getBoundingClientRect().top+obj.offsetHeight/2-ev.clientY;
	
	return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
}
function through(obj){
	obj.onmouseenter=function (ev){
		var oLi=obj.children[0];
		var oEvent=ev||event;
		var dir=getDir(obj,oEvent);
		switch(dir){
			case 0:
				oLi.style.left='4rem';
				oLi.style.top=0;
				break;
			case 1:
				oLi.style.left=0;
				oLi.style.top='4rem';
				break;
			case 2:
				oLi.style.left='-4rem';
				oLi.style.top=0;
				break;
			case 3:
				oLi.style.left=0;
				oLi.style.top='-4rem';
				break;
		}
		move(oLi,{left:0,top:0})
	};
	obj.onmouseleave=function (ev){
		var oLi=obj.children[0];
		var oEvent=ev||event;
		var dir=getDir(obj,oEvent);
		switch(dir){
			case 0:
				move(oLi,{top:0,left:200});
				break;
			case 1:
				move(oLi,{top:200,left:0});
				break;
			case 2:
				move(oLi,{top:0,left:-200});
				break;
			case 3:
				move(oLi,{top:-200,left:0});
				break;
		}
	};
}
	var oUl = document.getElementById('ul');
	 var aUl=oUl.getElementsByTagName('ul');
	 for(var i=0; i<aUl.length; i++){
		 through(aUl[i]);
	 }
