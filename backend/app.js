const app = require("express")()
let bodyParser = require('body-parser')
let database = require('./model')    


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});





// app.post('/signup',async function(req,res){
//   await database.insert(req.body.user)
//   res.send('sda')
// })
// app.post('/login',async function(req,res){
 
//   res.send(await database.get_where(req.body.user))
// })

app.post('/signup',async function(req,res){
  await database.insert(req.body.table, req.body.user)
  res.send('sda')
})

app.post('/login',async function(req,res){
 
  res.send(await database.get_where(req.body.user,req.body.table))
})

app.post('/addTask',async function(req,res){
  await database.insert(req.body.table, req.body.data)
  res.send('sda')
})

app.post('/tasks',async function(req,res){
 
  res.send(await database.get(req.body.table))
})

app.post('/myTasks',async function(req,res){
  
  res.send(await database.get_where(req.body.data,req.body.table))

})

app.post('/delete',async function(req,res){
 
  res.send(await database.delete(req.body.table,{id:req.body.id}))
})

app.post('/changeStatus',async function(req,res){
 
  res.send(await database.update(req.body.table, req.body.data, {id:req.body.id}))
})

app.listen(4000)