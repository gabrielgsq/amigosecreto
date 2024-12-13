

const getAllUsers = async (req, res) => {    
    return res.status(200).send("ok-users-get")
};

const createUser = async (req, res) => {
    const { email , senha } = req.body
    const bcrypt = require('bcrypt');

    const findEmail = await global.connection.collection("users").find({email:email}).toArray()
    if(!findEmail.length){
        const newUser = {
            email,
            senha: bcrypt.hash(senha, 12)
        }
        await global.connection.collection('users').insertOne(newUser)
        return res.status(200).send({menssage:"Cadastro realizado com sucesso"})
    }else{
        return res.status(409).send({menssage:"E-mail já cadastrado"})
    }    
};

module.exports = { getAllUsers, createUser };
