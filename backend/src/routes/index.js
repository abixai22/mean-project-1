const { Router } = require('express');
const router = Router();

const User = require('../models/User')

const jwt = require('jsonwebtoken');

router.get('/',(req,res)=> res.send('hello world'))

router.post('/signup', async (req,res) =>{

    const { email, password } = req.body; 

    const newUser = new User({email, password});

    await newUser.save();

   /* console.log(newUser) console.log(email) console.log(req.body)*/ /*request body*/

   const token = jwt.sign({_id:newUser._id}, 'secretkey')

   res.status(200).json({token})
    /*res.send('test');*/
})
router.post ('/signin', async (req,res) => {

    const { email, password } = req.body;

    const user = await User.findOne({email})

    if (!user) return res.status(401).send("the email doesn't exists");

    if (user.password !== password) return res.status(401).send('wrong password');

    const token = jwt.sign({_id: user._id}, 'secretkey');

    return res.status(200).json({token});
});
router.get('/tasks', (req,res) => {
    res.json([
        {
             _id: 1,
             name: 'task one',
             description: 'lorem ipsum',
             date: "2020-5-11"

        },
        {
            _id: 2,
            name: 'task one',
            description: 'lorem ipsum',
            date: "2020-5-11"

       },
       {
        _id: 3,
        name: 'task one',
        description: 'lorem ipsum',
        date: "2020-5-11"
       }
    ])
})

router.get('/private-tasks', verifyToken, (req,res) => {
    res.json([
        {
             _id: 1,
             name: 'task one',
             description: 'lorem ipsum',
             date: "2020-5-11"

        },
        {
            _id: 2,
            name: 'task one',
            description: 'lorem ipsum',
            date: "2020-5-11"

       },
       {
        _id: 3,
        name: 'task one',
        description: 'lorem ipsum',
        date: "2020-5-11"
       }
    ])
})

router.get('/profile', verifyToken, (req,res) => {
    res.send(req.userId);
})

module.exports = router;

function verifyToken(req, res, next){

    if (!req.headers.authorization){
        return res.status(401).send('unathorize request');
    }
    const token = req.headers.authorization.split(' ')[1]
     if (token === 'null'){
     return res.status(401).send('unathorize request');
      /*console.log(req.headers.authorization)*/
     }
    const payload = jwt.verify(token,'secretkey')
    req.userId = payload._id;
    next();
}