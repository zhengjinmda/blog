## ajax
ajax 通过 xmlHttpResqust 向服务器端发起异步请求获取资源，然后通过js来操作dom，更新页面数据。

### XMLHttpRequest
1. XMLHttpRequest() 该构造函数用于构造一个XMLHttpRequest实例对象。
2. onreadystate 当readyState发生改变时，相应也发生改变
3. open() 初始化一个请求。该方法只能在 JavaScript 代码中使用，若要在 native code 中初始化请求，请使用 openRequest()。
4. send() 发送请求。如果请求是异步的（默认），那么该方法将在请求发送后立即返回。
5. onreadystatechange:
0：未初始化
1：open方法成功调用以后
2：服务器已经应答客户端的请求
3：交互中。Http头信息已经接收，响应数据尚未接收。
4：完成。数据接收完成
6. responseText: 获得字符串形式的响应数据。
### 实现
```js
function ajaxFunction (method, url, callback, isAsync) {
  var xhr = null;
  if(window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
  } else {
      xhr = new ActiveXObject('Microsoft.XMLHttp');
  };

  if(method === 'GET') {
      xhr.open(method, `${url}?${data}`, isAsync);
      xhr.send();
  } else if( method === 'POST') {
      xhr.open(method, url, isAsync);
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.send(data);
  };

  xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
          //在状态数值state更新每次都会出发函数
          if(xhr.status === 200) {
              callback(xhr.responseText);
          }
      }
  }
}
```