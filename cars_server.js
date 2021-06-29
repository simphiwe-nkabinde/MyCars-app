const express = require('express')
const fs = require('fs')
const path = require('path')
const {v4: uuidv4} = require('uuid')
const app = express()
const helmet = require('helmet')

app.use(helmet())

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});
app.get('/about', (req,res)=> {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});
app.get('/create', (req,res)=> {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Body-parser middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const PORT = process.env.PORT || 3001



//utility function - gets all cars  
function getUserCars(username) {
    try {
        const content = fs.readFileSync('users/' + username + '.json')
        return JSON.parse(content)
    } catch(e) {
        return null
    }
}

function addCar(username, car) {
    const userCars = getUserCars(username)
    const newID = uuidv4();
    const newCar = {
        id : newID,
        make: car.make,
        model: car.model,
        country: car.country,
        body:car.body,
        drive: car.drive,
        transmission: car.transmission,
        doors: car.doors,
        image: car.image
    }
    userCars.push(newCar)
    fs.writeFileSync('users/' + username + '.json', JSON.stringify(userCars))
}

function deleteCar(username, id) {
    const userCars = getUserCars(username)
    for (i = 0; i < userCars.length; i++) {
        if (userCars[i].id === id) {
            const carMake = userCars[i].make
            const carModel = userCars[i].model
            userCars.splice(i, 1)
            fs.writeFileSync('users/' + username + '.json', JSON.stringify(userCars))
            return carMake + ' '+ carModel +' deleted'
        }  
    }
    return ''
}

function updateCar(username, updatedCar) {
    const id = updatedCar.id
    const userCars = getUserCars(username)
    for (i = 0; i < userCars.length; i++) {
        if (userCars[i].id === id) {
            userCars[i]['country'] = updatedCar.country
            userCars[i]['body'] = updatedCar.body
            userCars[i]['drive'] = updatedCar.drive
            userCars[i]['transmission'] = updatedCar.transmission
            userCars[i]['doors'] = updatedCar.doors
            userCars[i]['image'] = updatedCar.image
            fs.writeFileSync('users/' + username + '.json', JSON.stringify(userCars))
            return userCars[i].make + ' ' + userCars[i].model + ' updated'
        }
    }
    return 'car does not exist'
}

//ROUTES

//check if user exists
app.get('/login/:username', (req, resp) => {
    const username = req.params.username
    const exists = fs.existsSync('users/' + username + '.json')
    resp.send(exists)
})

//create a new user
app.post('/login/:username', (req, resp) => {
    const username = req.params.username
    const exists = fs.existsSync('users/' + username + '.json')
    if (exists) {
        resp.send(false)
    } else {
        fs.writeFileSync('users/' + username+'.json', '[]')
        resp.send('new user Created')
    } 
})

//get all cars for existing user
app.get('/:username', (req, resp) => {
    const username = req.params.username
    const result = getUserCars(username)
    resp.send(result)   //if user does not exist response will be null. frontend will handle error
});

//add a car
app.post('/car/:username', (req, resp) => {
    const username = req.params.username
    const car = req.body
    addCar(username, car)
    resp.send('car successfully added to collection')

})

//update car
app.put('/car/:username', (req,resp) => {
    const username = req.params.username
    const updatedCar = req.body
    resp.send(updateCar(username, updatedCar))
});

//delete car
app.delete('/car/:username', (req, resp) => {
    const username = req.params.username
    const id = req.query.id
    resp.send(deleteCar(username, id))
});


app.listen(PORT, console.log('server running'))