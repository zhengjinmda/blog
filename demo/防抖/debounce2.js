var count = 1;
var container = document.getElementsByClassName('container')[0];

var getUserAction = function(e) {
    console.log(e);
    console.log(this);
    container.innerHTML = count++;
 }
 
 var debounce = function(func, wait) {
     var timeout;
     return function() {
         var context = this;
         var args = arguments;
         clearTimeout(timeout);
         timeout = setTimeout(function() {func.apply(context, args)}, wait);
     }
 }
container.onmousemove = debounce(getUserAction, 1000);