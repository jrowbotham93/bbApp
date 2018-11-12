const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const pg = require('pg');
const {Pool, Client} = require('pg')
const connectionString ='postgresql://admin:admin@localhost:5432/bbapplication'

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

const pool = new Pool({ connectionString: connectionString 
});

app.get('/', function (req, res){


     res.render('index') 
})

app.get('/feed', function (req, res){


const empty = [];
const allText = ('SELECT * FROM messages')
  
   pool.query(allText, empty, (err,response) => {
    if(err){
        console.log(err.stack);
    } else{
        console.log(res.rows);   
    
    
    let result = response.rows;
    empty.push(result)


  res.render('feed', {empty: result})}
 })})
      
app.post('/feed', function (req, res){

    var input = [ 
        req.body.title,
        req.body.body,]

    const text = ('INSERT INTO messages (title, body) values ($1 , $2)')

        pool.query(text, input ,(err, res) => {
            if (err) {
               console.log(err.stack)
            } else {
               console.log(res.rows[0]);       
            }   
         
       })
       res.redirect('feed')
    })

app.listen(port, () => console.log(`Example ${port}!`))

