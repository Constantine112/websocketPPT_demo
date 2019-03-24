var WebSocketServer = require('ws').Server;

// 客户端的任务队列
var queue = [];

//控制端
var wssController = new WebSocketServer({ port: 8181 });
wssController.on('connection', function (ws) {
    console.log('wssController connected');
    ws.on('message', function (message) {
        for (let i of queue) {
            // console.log(i)
            i.send(message);
        }
    });
});

//客户端
var wssClinet = new WebSocketServer({ port: 3030 });
wssClinet.on('connection', function (ws) {
    console.log('wssClinet connected');
    queue.push(ws);
    ws.on('close', function (message, s) {
        for (let i = 0; i < queue.length; i++) {
            // console.log(i)
            if (ws == queue[i]) {
                queue.splice(i, 1);
                console.log('删除成功');
                break;

            }
        }

    });
});