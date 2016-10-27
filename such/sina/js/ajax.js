//版权zl

function json2data(json)
{
	json.t=Math.random();//防止ie缓存问题
	var arr=[];
	
	for (var name in json)
	{
		arr.push(name+'='+json[name]);
	}
	
	return arr.join('&');
}

function ajax(json)
{
	// 默认值
	json=json || {};
	if ( ! json.url) return;
	var url=json.url;
	var timeout=json.timeout || 3000;
	var data=json.data || {};
	var type=json.type || 'get';
	
	// 创建ajax对象
	//oAjax 一般公司写成xhr  XML HTTP request的缩写
	if (window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		//兼容ie6
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	var timer=setTimeout(function (){
		json.error && json.error('网络超时！');
		oAjax.abort();//终止ajax请求
		oAjax.onreadystatechange=null;
	}, timeout);
	
	//打开连接 open send
	switch (type.toLowerCase())
	{
		case 'get':
			//alert( url+'?'+json2data(data)); 调试时可以看看传的值
			oAjax.open('GET', url+'?'+json2data(data), true);//true 异步  false同步  不写默认是true
			oAjax.send();
			break;
		
		case 'post':
			oAjax.open('POST', url, true);
			oAjax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');//设置一个载体（请求头）
			oAjax.send(json2data(data));
			break;
	}
	
	// 接收
	oAjax.onreadystatechange=function (){
		if (oAjax.readyState == 4)
		{
			// 请求完成
			clearTimeout(timer);
			if (oAjax.status>=200 && oAjax.status<300 || oAjax.status==304)
			{
				json.success && json.success(oAjax.responseText);//oAjax.responseText 成功后获取到的数据
													//responseText如果是responseXML的时候返回的是一个document对象
			}
			else
			{
				json.error && json.error(oAjax.status);//oAjax.status 发生错误的状态码
			}
		}
	};
}















