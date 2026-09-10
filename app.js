const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/TreeShop')
    .then(() => console.log('Ket noi DB thanh cong!'))
    .catch(err => console.log('Loi ket noi DB:', err));
const treeSchema = new mongoose.Schema({
    treename: String,
    description: String,
    image: String
}, { collection: 'TreeCollection' });
const Tree = mongoose.model('Tree', treeSchema);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.get('/', async (req, res) => {
    try {
        let trees = await Tree.find();
        res.render('index', { trees: trees });
    } catch (error) {
        res.send("Loi lay du lieu");
    }
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.post('/add', async (req, res) => {
    try {
        let newTree = new Tree({
            treename: req.body.treename,
            description: req.body.description,
            image: req.body.image
        });
        await newTree.save();
        res.redirect('/');
    } catch (error) {
        res.send("Loi them du lieu");
    }
});

app.listen(3000, () => {
    console.log('Server dang chay o cong 3000');
});