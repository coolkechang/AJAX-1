var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

    if (path === '/index.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        let string = fs.readFileSync('public/index.html').toString()
        //把 public 的 index.html 文件读成字符串
        let page1 = fs.readFileSync('db/page1.json').toString()
        //page1是字符串（将 db/page1.json 文件读成字符串）
        const array = JSON.parse(page1) //将字符串变成数组
        const result = array.map((item) => `<li>${item.id}</li>`).join('')
        //将数组里所有元素用 li 包裹。
        string = string.replace('{{page1}}', `<ul id="xxx">${result}</ul>`)
        //把HTML里的{{page1}}变成从 result ,同时用ul包裹；也就是page.json里的内容
        //这样改不是直接改string，而是产生一个新的string，所以要声明一下
        response.write(string)
        response.end()
    } else if (path === '/main.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/main.js'))
        response.end()
    } else if (path === '/style.css') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(fs.readFileSync('public/style.css'))
        response.end()
    } else if (path === '/javascript.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/javascript.js'))
        response.end()
    } else if (path === '/html.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync('public/html.html'))
        response.end()
    } else if (path === '/4.xml') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/xml;charset=utf-8')
        response.write(fs.readFileSync('public/4.xml'))
        response.end()
    } else if (path === '/5.json') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        //在这里 'text/json; 也可以写成 'application/json;
        response.write(fs.readFileSync('public/5.json'))
        response.end()
    } else if (path === '/page2') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.write(fs.readFileSync('db/page2.json'))
        response.end()
    } else if (path === '/page3') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.write(fs.readFileSync('db/page3.json'))
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你输入的路径不存在对应的内容`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log(
    '监听 ' +
        port +
        ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' +
        port
)
