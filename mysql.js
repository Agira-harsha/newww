    // const exp=require('express')
    //  const app=exp();





    //  app.listen(2333,()=>{
    //     console.log("server running........");
    //  })
    //import index from '../nodeJs/calculator/index.html';
    const express=require('express')
    const path=require('http')
    const paths=require('path')
    const bodyParser = require('body-parser')
    const mysql=require('mysql2')
    const app=express()
    app.use(express.static('forms'))
    app.use(express.static('calculator'))
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    


    const connecton=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'Kohlianu@645',
        database:'details'
    });
    connecton.connect((err)=>{
        if(err){
            console.log("not conneted",err)
        }
        console.log("conneted to databse success")
    });

    app.post('/submit',(req,res)=>
    {
        const {name,email,number,password} =req.body;

        connecton.query('insert into fromdetails(name,email,number,password) values(?,?,?,?)',[name,email,number,password],(err,result)=>{
            if(err)
            {
                console.log("insert problem",err)
                res.status(500).send('internal server error');
                return
            }
            console.log("insertion succes",result)
            res.redirect('/caculator')
        })
        

    })
    
    app.get('/caculator' ,(req,res)=> {
        const filepath=paths.join(__dirname ,'calculator' ,'index.html')
        res.sendFile(filepath);
      
    });


    app.get('/data',(req,res)=>{
        const query = 'SELECT * FROM fromdetails';
        connecton.query(query, (err, result) => {
            if (err) {
              console.error('Error executing MySQL query:', err);
              res.status(500).json({ error: 'Internal Server Error' });
            } else {
              res.json(result);
            }
        });
    })
    app.post('/calculate', (req, res) => {
        const { expression, result } = req.body;
      
        // Process the data as needed
        console.log('Expression received:', expression);
        console.log('Result received:', result);
      
        // Example: Store the data in a database
        connecton.query('insert into calculator(expression,result) values(?,?)',[expression,result],(err,result)=>{
            if(err)
            {
                console.log("insert problem",err)
                res.status(500).send('internal server error');
                return
            }
            console.log("insertion succes")
            // res.redirect('/caculator')
        })
        // ...
      
        res.json({ message: 'Data received successfully' });
      });
  
    app.listen(3000 ,()=> {
        console.log("server running")

    })
    