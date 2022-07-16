const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const FoodModel = require('./models/Food')


//Middlewares
app.use(express.json()); //This allows me to get information from the front end in json format
app.use(cors()); //cors allows me to use my own apis

mongoose.connect('mongodb+srv://user1:123@crudmern.ltafk.mongodb.net/food?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

//CREATE
app.post('/insert', async (req, res) => {
    const foodName = req.body.foodName
    const daysSinceIAte = req.body.daysSinceIAte

    const food = new FoodModel({ foodName: foodName, daysSinceIAte: daysSinceIAte });

    try {
        await food.save();
        res.send("data inserted")
    } catch (error) {
        console.log(error)
    }
})

//READ
app.get('/read', (req, res) => {
    //If I wanted to find an spefic food
    // const found = FoodModel.find( { $where: {foodName: "apple"}})
    // {} when left empty it filters everything 
    FoodModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        }
        res.send(result)
    }
    )

})

//UPDATE
app.put('/update', async (req, res) => {
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

    try {
        //once it finds the food by its Id, 
        await FoodModel.findById(id, (error, foodFound) => {
            foodFound.foodName = newFoodName;
            foodFound.save();
            res.send('update successful');
        });
    } catch (error) {
        console.log(error);
    }
})

app.put('/updateday', async (req, res) => {
    const newDay = req.body.newDay;
    const id = req.body.id;

    try {
        //once it finds the food by its Id, 
        await FoodModel.findById(id, (error, foodFound) => {
            foodFound.daysSinceIAte = newDay;
            foodFound.save();
            res.send('update successful');
        });
    } catch (error) {
        console.log(error);
    }
})

//DELETE
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await FoodModel.findByIdAndRemove(id).exec();
    res.send('deleted')
})

app.listen(3001, () => console.log("Server running on PORT 3001"))