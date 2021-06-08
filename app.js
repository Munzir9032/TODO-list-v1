const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose');

// console.log(date);
const ejs = require('ejs');

const app = express();

app.use(bodyparser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static('public'));


mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true })

const itemsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
});

const Item = mongoose.model('Item', itemsSchema)

const item1 = new Item({
    name: 'welcome to our todolist'
});
const item2 = new Item({
    name: 'hit the + button to add new item'
});


const defaultitem = [item1, item2];




app.get('/', function(req, res) {

        Item.find().then(function(data) {
            if (data.length === 0) {
                Item.insertMany(defaultitem).then(function() {
                    console.log('successfully inserted default items into Item');
                }).catch(function(e) {
                    console.log(e);
                })
                res.redirect('/')
            } else {
                res.render('list', {
                    listTitle: "today",
                    newListItems: data
                })


            }
        }).catch(function(e) {
            console.log(e);
        })

        // date -->after creating local module

    })
    // express route parameters

app.get('/:users', function(req, res) {
    const customListName = req.params.users;
})

app.get('/about', function(req, res) {
    res.render('about')
})


app.post('/', (req, res) => {

    const itemName = req.body.newItem;
    const temp = new Item({
        name: itemName
    });
    temp.save();
    res.redirect('/')


});

app.post('/delete', (req, res) => {
    Item.deleteOne({ _id: req.body.checkbox }, function(err) {
        if (err) console.log(err);
        console.log("Successful deletion");
    });
    res.redirect('/')
})

// app.post('/work', function(req, res) {
//     item = req.body.newItem;
//     workItems.push(item);
//     res.redirect('/work');
// })
app.listen(3000, function() {
    console.log('listening the port at 3000')
})