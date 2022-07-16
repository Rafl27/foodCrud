import './App.css'
import { GrUpdate } from 'react-icons/gr'
import { AiFillDelete } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)
  const [foodList, setFoodList] = useState([])
  const [newFoodName, setNewFoodName] = useState('')
  const [newDay, setNewDay] = useState(0)

  //CREATE
  const addToList = () => {
    axios.post('http://localhost:3001/insert', {
      foodName: foodName,
      daysSinceIAte: days,
    })
    window.alert('Food added')
  }
  //UPDATE
  const updateFood = (id) => {
    axios.put('http://localhost:3001/update', {
      newFoodName: newFoodName,
      id: id,
    })
    window.alert('Food name updated')
    window.location.reload();
  }

  const updateDay = (id) => {
    axios.put('http://localhost:3001/updateday', {
      newDay : newDay,
      id: id,
    })
    window.alert('Day changed')
    window.location.reload();
  }
  //DELETE
  const deleteFood = (id) => {
    console.log(`http://localhost:3001/delete/${id}`)
    axios.delete(`http://localhost:3001/delete/${id}`)
    window.alert('Food deleted')
  }
  //READ
  useEffect(() => {
    //get all food
    axios.get('http://localhost:3001/read').then((response) => {
      setFoodList(response.data)
    })
  }, [])

  return (
    <div className="App">
      <h1>Food MERN</h1>

      <label>Food Name</label>
      <input
        type="text"
        onChange={(event) => {
          setFoodName(event.target.value)
        }}
      />

      <label>Days since you ate it</label>
      <input
        type="number"
        onChange={(event) => {
          setDays(event.target.value)
        }}
      />

      <button onClick={addToList}>Add to list</button>

      <h1>Food List</h1>
      {foodList.map((food, index) => {
        return (
          <div key={index} className="food">
            <h2>{food.foodName}</h2>
            {/* <h3>Last eaten {food.daysSinceIAte} days ago.</h3> */}
            <h3>
              {food.daysSinceIAte === 1 ? (
                <p>Last eaten yesterday</p>
              ) : (
                <p>Last eaten {food.daysSinceIAte} days ago.</p>
              )}
            </h3>
            <input
              type="text"
              placeholder="new food name"
              onChange={(event) => {
                setNewFoodName(event.target.value)
              }}
            />
            <button onClick={() => updateFood(food._id)}>
              Change Name <GrUpdate />
            </button>
            <input
              type="number"
              placeholder="new day"
              onChange={(event) => {
                setNewDay(event.target.value)
              }}
            />
            <button onClick={() => updateDay(food._id)}>
              Change Days <GrUpdate />
            </button>
            <button class="deleteButton" onClick={() => deleteFood(food._id)}>
              Delete <AiFillDelete />
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default App
