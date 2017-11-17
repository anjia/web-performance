var express = require('express');
var router = express.Router();
var path = require('path');
var option = { root: path.join(__dirname, '../views') };


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.html', option);
});
router.get('/index.html', function(req, res, next) {
    res.sendFile('index.html', option);
});


let myRouter = [
    'tree',
    'tree-body',
    'hello-plaintext',
    'hello-inline',
    'hello-inline-large',
    'hello-inline-large-source',
    'hello-js',
    'hello-css',
    'render'
];
myRouter.forEach(item => {
    router.get('/' + item + '.html', function(req, res, next) {
        res.sendFile(item + '.html', option);
    });
});



// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;