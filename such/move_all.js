
function getStyle(obj,name) {
    return (obj.currentStyle || getComputedStyle(obj,false))[name];
}

function move(obj,json,options) {
    // 先判断当前options有没有传, 如果没有undefined,默认设置空json
    options = options || {};
    // 判断总时间有没有, 如果没有undefined,默认设置500ms
    options.duration = options.duration || 500;
    // 判断运动形式有没有, 如果没有undefined,默认设置'ease-out'
    options.easing = options.easing || 'ease-out';

    // 先关后开
    clearInterval(obj.timer);
    // 总次数
    var count = Math.floor(options.duration/30);
    // 获取起点 ，终点
    var start = {};
    var dis = {};
    for (var name in json) {
        start[name] = parseFloat(getStyle(obj,name));
        dis[name] = json[name] - start[name];
    }
    var n = 0; // 当前走的次数
    obj.timer = setInterval(function(){
        n++;
        for (var name in json) {
            switch(options.easing) {
                case 'linear': // 匀速
                    var a = n/count;
                    var cur = start[name] + dis[name] * a;
                    break;
                case 'ease-in': // 加速
                    var a = n/count;
                    var cur = start[name] + dis[name] *a*a*a;
                    break;
                case 'ease-out': // 减速
                    var a = 1-n/count;
                    var cur = start[name] + dis[name]*(1-a*a*a);
                    break;
            }

            // 设置每一个属性
            if (name == 'opacity') {
                obj.style.opacity = cur;
                obj.style.filter = 'alpha(opacity:'+cur*100+')';
            } else {
                obj.style[name] = cur + 'px';
            }
        }
        if (n == count) {
            clearInterval(obj.timer);
            options.complete && options.complete();
        }
    },30);

}