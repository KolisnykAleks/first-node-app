const express = require('express')
const app = express()
const port = 3001
const faker = require('faker')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const MongoClient = require("mongodb").MongoClient

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/CarsDB');
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

const carSchema = new mongoose.Schema({
  name: String
});

const Car = mongoose.model('Car', carSchema);

// const ferrari = new Car({ name: 'Ferrari', cars });
// console.log(ferrari.name); 

// ferrari.save();





app.get('/', (req, res) => {
  res.send('hello world!')
})


app.get('/car', (req, res) => {
  const result = Car.find()
  console.log(result)
  res.send(cars)
})

app.get('/car/:id', function (req, res) {
  // const car = Car.find({}, function (err, person) {
  //   if (err) return handleError(err);
  //   // Prints "Space Ghost is a talk show host".
  //   console.log('%s %s is a %s.', person.name.first, person.name.last,
  //     person.occupation);
  // });
  const car = Car.find(element => {
    console.log(element)
    return (element.id === req.params.id) 
  });
  console.log(car)
  res.send(car)
})


app.post('/car', function (req, res) {
  // const car = {
  //   name: req.body.name
  // }
  const newCar = new Car({ ...req.body });
  console.log(newCar); 
  newCar.save();
  // res.send(car)
})

// app.put('/car/:id', function (req, res) {
//   // const car = cars.find(element => {
//   //   return (element.id === req.params.id) 
//   // });
//     const car = cars.find(function (car) {
//       return car.id === Number(req.params.id)
//     })
//   car.name = req.body.name
//   res.send(car)
// })
  
// app.delete('/car/:id', function (req, res) {
//   cars = cars.filter(function (artist) {
//     return car.id !== req.params.id
//   })
//   res.send()
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
