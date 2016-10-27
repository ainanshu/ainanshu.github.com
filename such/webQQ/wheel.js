'use strict'
function addEvent(obj,sEv,fn)
{
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}

/*
** addWheel 		添加滚轮事件
** params
** 		obj	[object] 		哪个元素加
** 		fn 	[funtion] 		执行什么函数
** 		fn(bDir)	bDir [boolean] 	滚动方向
*/
function addWheel(obj,fn){
	//2.判断滚轮滚动方向
	function fnDir(ev){
		//保存方向  下true  上false
		var bDir = true;
		var oEvent = ev||event;
		//判断浏览器用什么属性
		
		bDir = oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
		
		//执行函数,不一定有。要判断
		fn&&fn(bDir);
		//阻止默认事件
		//addEventListener用不了return false；
		oEvent.preventDefault&&oEvent.preventDefault();
		return false;
	}
	//1.判断浏览器是否是火狐
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		addEvent(obj,'DOMMouseScroll',fnDir);
	}else{
		addEvent(obj,'mousewheel',fnDir);
	}
}
