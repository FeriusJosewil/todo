const express = require("express");
const cors = require("cors");
const Todo = require('../todo-backend/models/todo');
const firebase = require('../todo-backend/db');
const app = express();
const firestore = firebase.firestore();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/',(req, res) => {
  res.send('<html><body><form action="/todo" method="post"><input name="title" /><input name="time" /><input name="status" /><button>Add</button></form></body></html>');
});

app.get('/todo', async(req, res, next) => {
    try {
        const todos = await firestore.collection('todos');
        const data = await todos.get();
        const todosArray = [];
        if (data.empty) {
            res.status(404).send('No todos found.')
        } else {
            data.forEach(doc => {
                const todo = new Todo(
                    doc.id,
                    doc.data().title,
                    doc.data().time,
                    doc.data().status
                );
                todosArray.push(todo)
            });
            // res.send(todosArray.map(({id, title, time, status}) => `${id}${title} ${time} ${status}`).join("<br>"));
            res.send(todosArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
  });

app.post('/todo', async(req, res) => {
    try {
        var data = JSON.parse(JSON.stringify(req.body));
        console.log(data);
        await firestore.collection('todos').doc().set(data);
        res.send('Todo listed successfully.')
        
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.delete('/todo/:id', function (req, res) {
    firestore.collection('todos').doc(req.params.id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  });

app.listen(port, function(){
    console.log(`Server running - port: ${port}`);
})