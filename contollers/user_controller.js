const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
    login(req, res, next){
        User.findOne({email : req.body.email})
        .then((user)=> {
            if (user.isValid(req.body.password)){
                try{
                    let token = jwt.sign({email: user.email, userId: user._id }, 'secret', {expiresIn: '1d'})
                    return res.status(200).json(token);
                }
                catch(error){
                next(error);
                }
            }
            else{
                res.status(401).send({error: 'Invalid login credentials'})
            }
        }).catch(()=> res.status(404).send({error : 'User not found'}));
    },

    register(req, res, next){
        User.findOne({email: req.body.email})
        .then((userFound) => {
            if(!userFound){
                const user = new User({
                    email: req.body.email,
                    name: req.body.name,
                    password: User.hashPassword(req.body.password)
                })
                user.save()
                .then((SavedUser)=> res.status(200).send(SavedUser))
                .catch(next);
            }
            else{
                res.status(401).send({error: 'User is already taken'})
            }
        })
        
    }

}