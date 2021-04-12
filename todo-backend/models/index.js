const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://juancho9300:juancho9300@valhimardb.jaybb.mongodb.net/todo-apps?retryWrites=true&w=majority',{
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('debug', true);
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");