var container = document.getElementsByClassName('container')[0];
var count = 1;

var getUserAction = function () {
    container.innerHTML = count++;
};

// 使用时间戳
// var throttle = function(func, wait) {
//     var context, args;
//     var previous = 0;

//     return function() {
//         var now = +new Date();
//         context = this;
//         args = arguments;
//         if(now - previous > wait) {
//             func.apply(context, args);
//             previous = now;
//         }
//     }
// }

// 使用定时器
// var throttle = function(func, wait) {
//     var context, args;
//     var timeout;
    
//     return function() {
//         context = this;
//         args = arguments;
//         if(!timeout) {
//             timeout = setTimeout(function() {
//                 func.apply(this, args);
//                 timeout = null;
//             }, wait);
//         };
//     };
// };


// 结合时间戳和定时器，升级节流功能，实现刚触发和结束都执行func的功能
var throttle = function(func, wait) {
    var timeout, context, args, result;
    var previous = 0;

    var later = function() {
        previous = +new Date();
        timeout = null;
        func.apply(context, args);
    }

    var throttled = function() {
        var now = +new Date();
        // 下次触发 func 剩余的时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 如果没有剩余时间了或你更改了系统时间
        if(remaining < 0 || remaining > wait) {
            // if(timeout) {
            //     clearTimeout(timeout);
            //     timeout = null;
            // }
            previous = now;
            func.apply(context, arguments);

        } else if(!timeout) {
            timeout = setTimeout(later, remaining);
        }
    }

    return throttled;
}

// 第四版
// function throttle(func, wait, options) {
//     var timeout, context, args, result;
//     var previous = 0;
//     if (!options) options = {};

//     var later = function() {
//         previous = options.leading === false ? 0 : new Date().getTime();
//         timeout = null;
//         func.apply(context, args);
//         if (!timeout) context = args = null;
//     };

//     var throttled = function() {
//         var now = new Date().getTime();
//         if (!previous && options.leading === false) previous = now;
//         var remaining = wait - (now - previous);
//         context = this;
//         args = arguments;
//         if (remaining <= 0 || remaining > wait) {
//             if (timeout) {
//                 clearTimeout(timeout);
//                 timeout = null;
//             }
//             previous = now;
//             func.apply(context, args);
//             if (!timeout) context = args = null;
//         } else if (!timeout && options.trailing !== false) {
//             timeout = setTimeout(later, remaining);
//         }
//     };
//     return throttled;
// }

container.onmousemove = throttle(getUserAction, 1000, {leading: false, trailing: false});