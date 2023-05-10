const express=require('express');
const app=express();
const path=require('path');
const hbs=require('hbs');
const templatePath=path.join(__dirname,'../templates');
const collection=require('./mongo'); //mongodb.js dosyasından dönen collection buradan çağırılıyor

app.use(express.json());
app.set('view engine','hbs');//görüntü motorunun hbs olduğu tanımlanıyor
app.set("views",templatePath);//templetePath değişkeni views klasörünün yolu
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('login'); //login.hbs
});
app.get('/signup',(req,res)=>{
    res.render('signup'); //signup.hbs
});

//post kısmı
app.post('/signup',async(req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
    }
    await collection.insertMany([data])
    res.render("home") 
});

app.post('/login',async(req,res)=>{

    try{
        const check=await collection.findOne({name:req.body.name})   
        if(check.password==req.body.password){     
            res.render("home")
        }
        else{
            
            res.send("wrong password")
        }
    }
    catch{
        res.send("user not found")
    }

});

app.listen(3000,()=>{
    console.log('Server is running at port 3000');
});


