// 通过CORS方法访问
// const request = new XMLHttpRequest();
// request.open('GET','http://qq.com:8888/friends.json');
// request.onreadystatechange = () =>{
//     if(request.readyState === 4 && request.status === 200){
//         console.log(request.response);
//     }
// };
// request.send();

//通过JSONP方式
//基本用法
// const random = 'flightyang'+Math.random();
// console.log(random);
// window[random] = (data)=>{
//     console.log(data);
// }
// const script = document.createElement('script');
// script.src = `http://qq.com:8888/friends.js?functionName=${random}`
// script.onload = ()=>{
//     script.remove();
// }
// document.body.appendChild(script)

// 封装JSONP用Promise
function jsonp(url) {
    return new Promise((resolve,reject) =>{
        const random = 'flightyang'+Math.random();  //随机生成回调名字
        console.log(random);
        window[random] = (data)=>{
            resolve(data); //成功获取到另一个网站的数据
        };
        const script = document.createElement('script');
        script.src = `${url}?callback=${random}`;
        script.onload = ()=>{  //成功后执行
            script.remove();  //删除掉script标签，我们主要目的是为了获取数据，让首页更加简洁
        };
        script.onerror = ()=>{ //失败
            reject();
        };
        document.body.appendChild(script);
    });
};

jsonp('http://qq.com:8888/friends.js')
    .then((data)=>{
        console.log(data);
    })