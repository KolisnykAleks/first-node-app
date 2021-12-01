const express = require('express')
const app = express()
const port = 3005
const faker = require('faker')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ObjectID = require('mongodb').ObjectID

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/CarsDB');
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

const carSchema = new mongoose.Schema({
  name: String,
  ownerFirstName: String,
  imageUrl: String
});

const CarModel = mongoose.model('Car', carSchema);


app.get('/', (req, res) => {
  res.send('hello world!')
})

app.get('/cars', (req, res) => {
    CarModel.find({}, function(err, cars) {
        res.send(cars)
    })
    // CarModel.find().toArray(function (err, docs) {
    //     if(err) {
    //         console.log(err)
    //         res.sendStatus(500)
    //     }
    //     res.send(docs)
    // })
})

app.get('/cars/:id', (req, res) => {
    console.log(req.body)
    //   const foundCar = CarModel.findOne({_id: req.params.id}, req.body, (err, doc) => {

    //     res.send(doc)
    // })
        const foundCar = CarModel.findOne({_id: req.params.id}, (err, doc) => {

        res.send(doc)
    })
})

app.post('/cars', function (req, res) {
    // const newCar = new CarModel({...req.body})
    // newCar.save((err, cars) => {
    //     if(err)
    //     res.status(400).send("There is an error while adding new user")
    //     else
    //         res.status(200).json(cars)
    // })
    console.log(req.body)
    // let dataCar = req.body;
    const newCar = new CarModel({ ...req.body }); 
    // const newCar = new CarModel(dataCar); 

  newCar.save(function (err) {
      console.log(err)
  });
  res.send("200")
})


app.put('/cars/:id', function (req, res) {

    const updateCar = CarModel.updateOne(
    // CarModel.updateOne(
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

app.delete('/cars/:id', function (req, res) {
    console.log(req.body)
    const deleteCar = CarModel.deleteOne(
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
// app.delete('cars/:id', function (req, res) {
//     CarModel.deleteOne({_id: req.params.id}, req.body, function(err) {
//         console.log(err)
//     })
//     res.send("ok")
// })


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
