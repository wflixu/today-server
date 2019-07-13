var btn = document.getElementById('btn');
btn.addEventListener('click', function () {
    console.log('get data ......');
    axios.get('/api/user')
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
})

var btn2 = document.getElementById('btn2');
btn2.addEventListener('click', function () {
    console.log('get data ......');
    axios.get('/api/users/wfllixu')
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
})



var btn3 = document.getElementById('btn3');
btn3.addEventListener('click', function () {
    console.log('get data ......');
    axios.get('/api/repos/wfllixu')
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
})

var btn4 = document.getElementById('btn4');
btn4.addEventListener('click', function () {
    console.log('get data ......');
    axios.get('/api/repo/274417')
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
})


//获取仓库得文档列表
var btn5 = document.getElementById('btn5');
btn5.addEventListener('click', function () {
    console.log('get data ......');
    axios.get('/api/docs/274417')
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
})
//获取文档详情
var btn6 = document.getElementById('btn6');
btn6.addEventListener('click', function () {
    console.log('get data ......');
    axios.get('/api/repos/274417/docs/1568661')
        .then(function (response) {

            var container = document.getElementById('cont');
            container.innerHTML = response.data.data.body_html;
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
})