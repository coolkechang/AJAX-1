console.log('我是main.js')

//AJAX请求CSS的过程如下：

getCSS.onclick = () => {
    const request = new XMLHttpRequest()
    //创建 HttpRequest 对象
    //readystate = 0
    request.open('GET', 'style.css')
    //调用对象的 open 方法。（可查MDN中 XMLHttpRequest open 的用法）; 注意：只用两个参数。第一个参数是选择用哪个请求（get/post）；第二个参数是URL
    //readystate = 1
    request.onreadystatechange = () => {
        console.log(request.readyState)
        if (request.readyState === 4) {
            //request.readyState === 4 表示下载完成（注意：并不确定下载完成的是成功的路径还是失败的，需要在进行下面的判断）
            if (request.status >= 200 && request.status < 300) {
                //只读属性 XMLHttpRequest.status 返回了 XMLHttpRequest 响应中的数字状态码。status 200-299 代表一个成功的请求。（如果服务器响应中没有明确指定 status 码，默认为 200）
                const style = document.createElement('style')
                //创建 style 标签
                style.innerHTML = request.response
                //填写 style 内容
                document.head.appendChild(style)
                //将 style 插入到 head 里面
            } else {
                alert('CSS加载失败')
            }
        }
    }
    request.send()
    //调用对象的 send 方法（发送请求）
    //readystate = 2
}

//AJAX请求JS的过程如下：

getJS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', 'javascript.js')
    request.onreadystatechange = () => {
        console.log(request.readyState)
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const javascript = document.createElement('javascript')
                javascript.innerHTML = request.response
                document.head.appendChild(javascript)
            } else {
                alert('JS加载失败')
            }
        }
    }
    request.send()
}

//AJAX请求HTML的过程如下：

getHTML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', 'html.html')
    request.onreadystatechange = () => {
        console.log(request.readyState)
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const div = document.createElement('div')
                div.innerHTML = request.response
                document.body.appendChild(div)
            } else {
                alert('HTML加载失败')
            }
        }
    }
    request.send()
}

//AJAX请求XML的过程如下：

getXML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '4.xml')
    request.onreadystatechange = () => {
        if (
            request.readyState === 4 &&
            request.status >= 200 &&
            request.status < 300
        ) {
            const dom = request.responseXML
            // request 自带一个属性：responseXML 。这个属性是一个只读值，它返回一个包含请求检索的 HTML 或 XML 的Document。即responseXML会自动的将得到的信息变成一个dom对象。
            const text = dom.getElementsByTagName('warning')[0].textContent
            //获取dom中warning标签的文本内容
            console.log(text.trim())
        }
    }
    request.send()
}

//AJAX请求JSON的过程如下：

getJSON.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '5.json')
    request.onreadystatechange = () => {
        if (
            request.readyState === 4 &&
            request.status >= 200 &&
            request.status < 300
        ) {
            const object = JSON.parse(request.response)
            //JSON.parse() 将符合 JSON 语法的字符串转换成 JS 对应类型的数据，（在这里是对象）
            myName.textContent = object.name
            //这个可实现我们进入网页时出现“欢迎 xxx”的那个情况
        }
    }
    request.send()
}

//AJAX请求 page2 和 page3 的过程如下：

let n = 1
getPage.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', `/page${n + 1}`)
    request.onreadystatechange = () => {
        if (
            request.readyState === 4 &&
            request.status >= 200 &&
            request.status < 300
        ) {
            const array = JSON.parse(request.response)
            array.forEach((item) => {
                const li = document.createElement('li')
                li.textContent = item.id
                xxx.appendChild(li)
            })
            n += 1
        }
    }
    request.send()
}
