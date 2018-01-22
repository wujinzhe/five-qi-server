const Koa = require('koa')
const app = new Koa()
var server = require('http').createServer(app.callback)
const Router = require('koa-router')
const router = new Router()
const io = require('socket.io')(server)
const util = require('./util')
const static = require('koa-static')

var sockets = []

var Rooms = {} // 每个房间的信息

var pointInfo = {} // 保存棋子的信息
// var conSockets = []
io.on('connection', function (socket) {

  var url = socket.request.headers.referer
  if (url.substr(url.lastIndexOf('/') + 1) === 'computer') {
    socket.emit('computer', 'white')
    socket.isComputer = true
    socket.role = 'white'
  }

  // 接收用户消息,发送相应的房间
  socket.on('play', point => {
    pointInfo[socket.roomID][socket.role].push(`${point.x}/${point.y}`)
    if (util.judge(pointInfo[socket.roomID][socket.role], point)) {
      socket.emit('winRole', socket.role)
      socket.to(socket.roomID).emit('winRole', socket.role)
    }
    socket.to(socket.roomID).emit('otherPlay', point)
  })

  socket.on('joinRoom', id => {

    if (Rooms[id] && Rooms[id].length === 2) return;

    if (!Rooms[id]) {
      socket.role = 'white'
      Rooms[id] = []
      Rooms[id].push(socket.role)

      pointInfo[id] = {} // 
      
    } else {
      socket.role = 'black'
      Rooms[id].push(socket.role)
    }

    pointInfo[id][socket.role] = []  // 将黑棋，白棋的坐标存放数组初始化

    socket.roomID = id
    socket.emit('init', socket.role)
    socket.join(id)

    console.log(`用户 ${socket.role} 加入了房间 ${id}`)
  })
  
})

app.use(router.routes()).use(router.allowedMethods())



server.listen(8081)