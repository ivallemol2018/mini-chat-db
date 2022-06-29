const express = require('express')
const fetch = require('node-fetch')
const http = require('http')
const keys = require('./config/keys');
const { Server } = require('socket.io')

const apiProduct = require('./routes/productRoutes')
const apiMessage = require('./routes/messageRoutes')

const app = express()
const server = http.createServer(app);
const io = new Server(server)

const PORT = process.env.PORT || 8080

app.use(express.static('./views'))

app.set('views','./views')
app.set('view engine','ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/productos',apiProduct)
app.use('/mensajes',apiMessage)

app.get('/',(request,response)=>{
  response.render('index')
})

app.post('/store',(request,response)=>{
  fetch(`${keys.redirectDomain}/productos`,{method: 'post', body: JSON.stringify(request.body),headers: {'Content-Type': 'application/json'}})
    .then(promesa => promesa.text() )
    .then(data => response.render('index',{isSaved:'saved'}))
})

app.post('/communication',(request,response)=>{
  fetch(`${keys.redirectDomain}/mensajes`,{method: 'post', body: JSON.stringify(request.body),headers: {'Content-Type': 'application/json'}})
    .then(promesa => promesa.text() )
    .then(data => response.render('index'))
})

io.on('connection',socket=>{
  socket.on('loadProducts', (newMessage)=>{
    io.sockets.emit('loadProductClient','messages')
  })

  socket.on('loadMessages', (newMessage)=>{
    io.sockets.emit('loadMessageClient','messages')
  })  

})

server.listen(PORT,()=>{
  console.log(`Server http on ${PORT}...`)
})

server.on('error',error=> console.log('Error on server',error))