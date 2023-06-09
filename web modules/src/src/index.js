const express=require('express');
const app=express();
const path=require('path');
const hbs=require('hbs');
const templatePath=path.join(__dirname,'../sof_eng_project');
const collection=require('./mongo'); //mongodb.js dosyasından dönen collection buradan çağırılıyor

app.use(express.json());
app.set('view engine','hbs');//görüntü motorunun hbs olduğu tanımlanıyor
app.set("views",templatePath);//templetePath değişkeni views klasörünün yolu
app.use(express.urlencoded({extended:false}));
app.use(express.static(templatePath));
app.get('/',(req,res)=>{
    res.sendFile(templatePath+'/index.html');
});



//post kısmı
app.post('/signup', async (req, res) => {
    const data={
        name:req.body.name,
        phone_number:req.body.phone_number,
        email:req.body.email,
        password:req.body.password
    }
    console.log('Kullanıcı adı:', data.name);
    console.log('E-posta:', data.email);
    console.log('Şifre:', data.password);
    await collection.insertMany([data])
    // Verileri kullanarak istediğiniz işlemleri gerçekleştirin
    
    //res.sendFile(templatePath+'/index.html');
    res.send("You have been succesfully signed up");
});



app.post('/login', async (req, res) => {
    try {
      const user = await collection.findOne({ email: req.body.email});
      if (user && user.password === req.body.password) {
        res.sendFile(templatePath + '/index.html');
      } else {
        res.send('Wrong password');
      }
    } catch (error) {
      res.send('User not found');
    }
  });

app.listen(3000,()=>{
    console.log('Server is running at port 3000');
});


