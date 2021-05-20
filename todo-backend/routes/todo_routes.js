const express = require('express');
const {addTodo} = require('../controllers/todo_controller');

const router = express.Router();

router.post('/todo', addTodo);

module.exports = {
    routes: router
}