const express = require('express')
const app = express()
const port = 3005
const faker = require('faker')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


main().catch(err => console.log(err));

//We put 'listen' function after 'connect' so that our project does not
//start before the connection to the database is established
async function main() {
  await mongoose.connect('mongodb://localhost:27017/CarsDB');
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

const carSchema = new mongoose.Schema({
  name: String,
  ownerFirstName: String,
  imageUrl: String,
  ownerLastName: String,
  model: String,
  type: String,
  fuelType: String,
  vin: String,
  color: String
});

const CarModel = mongoose.model('Car', carSchema);


app.get('/', (req, res) => {
  res.send('hello world!')
})

//get all the elements 
app.get('/cars', (req, res) => {
    // CarModel.find({}, function(err, cars) {   //both options work
    //     res.send(cars)
    // })
    CarModel.find({}, function (err, docs) {
      if(err) {
          console.log(err)
          res.sendStatus(500)
      }
      res.send(docs)
  })
})

//get the element by id
app.get('/cars/:id', (req, res) => {
    console.log(req.body)
      CarModel.findOne({_id: req.params.id}, (err, doc) => {

      res.send(doc)
    })
})

//create a new element
app.post('/cars', function (req, res) { 
    // let dataCar = req.body
    let dataCar = {
      name: req.body.name,
      ownerFirstName: req.body.ownerFirstName,
      imageUrl: req.body.imageUrl,
      ownerLastName: req.body.ownerLastName,
      model: req.body.model,
      type: req.body.type,
      fuelType: req.body.fuelType,
      vin: req.body.vin,
      color: req.body.color
    };
    // const newCar = new CarModel({ ...req.body }); 
    const newCar = new CarModel(dataCar); 

  newCar.save(function (err) {
      console.log(err)
  });
  res.send("200")
})

//change the properties of the element by id
app.put('/cars/:id', function (req, res) {

    CarModel.updateOne(
        {_id: req.params.id},
        // {name: req.body.name},
        req.body,
        function(err, result) {
            if(err) {
                console.log(err)
                return res.sendStatus(500)
            }
            res.sendStatus(200)
        }
    )
})

//remove element by id
app.delete('/cars/:id', function (req, res) {     
    console.log(req.body)
    CarModel.deleteOne(
        {_id: req.params.id},
        function(err, result) {
            if (err) {
                console.log(err) 
                return res.sendStatus(500)
            }
            res.sendStatus(200)
        }
    )
})

//remove or change pice of the element by id(in this case "name")
app.patch('/cars/:id',(req,res)=>{
  console.log(req.body);
  CarModel.findByIdAndUpdate({
      _id:req.params.id
  },{
      name:req.body.name
  }).then(()=>{
      res.sendStatus(200);
  }).catch(err => {
     res.status(500);
  })
});

const cars = [];

for(let i = 0; i < 3; i++) {
  const car = {
    id: faker.datatype.uuid(),
    photo: faker.image.image(),
    ownerFirstName: faker.name.firstName(),
    ownerlastName: faker.name.lastName(),
    name: faker.vehicle.vehicle(),
    model: faker.vehicle.model(),
    type: faker.vehicle.type(),
    fuelType: faker.vehicle.fuel(),
    vin: faker.vehicle.vin(),
    color: faker.vehicle.color(),
  } 

  cars.push(car);
}
// console.log(cars)
