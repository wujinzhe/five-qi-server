const Koa = require('koa')
const app = new Koa()
var server = require('http').createServer(app.callback)
const Router = require('koa-router')
const router = new Router()
const io = require('socket.io')(server)

router.get('/api', async (ctx, next) => {
  ctx.body = 'hello world'
})

var sockets = []

var Rooms = {}
// var conSockets = []
io.on('connection', function (socket) {
  var url = socket.request.headers.referer

  var roomID = ''
  
  if (url.split('=')[1]) {
    roomID = url.split('=')[1]
    var user = ''
  
    // socket.on('join', function (userName) {
    // if (!Rooms[roomID]) {
    //   Rooms[roomID] = []
    //   socket.role = 'white'
    //   socket.play = true
    //   Rooms[roomID].push(socket)
    // }
    // else {
    //   socket.play = false
    //   if(!socket.startGame) {
    //     socket.role = 'black'
    //   }
    //   else {
    //     socket.role = 'passenger'
    //   }
    //   Rooms[roomID].push(socket)
    //   if(!socket.startGame){
    //     socket.startGame = true
    //     Rooms[roomID][0].emit('startGame')
    //     Rooms[roomID][1].emit('startGame')
    //   }
    // }
    
    // socket.emit('init', {role: socket.role,play: socket.play})
    // console.log(`用户 ${user} 加入了房间 ${roomID}`)
    if (Rooms[roomID].length === 0) {
      user = 'white'
      socket.emit('init', user)
      socket.join(roomID)
      console.log(`用户 ${user} 加入了房间 ${roomID}`)
    } else if (Rooms[roomID].length === 1) {
      Rooms[roomID].push('black')
      user = 'black'
      console.log(`用户 ${user} 加入了房间 ${roomID}`)
      socket.emit('init', user)
      socket.join(roomID)
    }
  }

  // 接收用户消息,发送相应的房间
  socket.on('play', function (point) {
    // 验证如果用户不在房间内则不给发送
    // if (Rooms[roomID].indexOf(user) === -1) {  
    //   return false;
    // }
    Rooms[roomID].forEach('play', player => {
      if(player.role != point.role) {
        player.emit('play', point)
      }
    })
    // socket.broadcast.to(roomID).emit('otherPlay', point);
  });
  

})

// io.sockets.socket().on('play', function (data) {
//   io.sockets.emit('otherPlay', { hello: socket.id })
// })
app.use(router.routes()).use(router.allowedMethods())



server.listen(8081)