const express = require('express')
const bodyparser = require('body-parser')
const date = require(__dirname + '/date.js')
    // console.log(date);
const ejs = require('ejs');

const app = express();

var Items = ['buy food', 'cook food', 'Eat food'];
var workItems = []
app.use(bodyparser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res) {
    // date -->after creating local module
    res.render('list', {
        listTitle: date,
        newListItems: Items
    })
})

app.get('/work', function(req, res) {
    res.render('list', {
        listTitle: "Work list",
        newListItems: workItems
    });
})

app.get('/about', function(req, res) {
    res.render('about')
})


app.post('/', (req, res) => {

    Item = req.body.newItem;
    if (req.body.list === 'Work') {
        workItems.push(Item)
        res.redirect('/work')
    } else {
        Items.push(Item);
        res.redirect('/')

    }
})

// app.post('/work', function(req, res) {
//     item = req.body.newItem;
//     workItems.push(item);
//     res.redirect('/work');
// })
app.listen(3000, function() {
    console.log('listening the port at 3000')
})