const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

const createGroup = async (req, res) => {
    const { groupName } = req.body
    const {id, email} = req.user
    const newGroup = {
        groupName,
        ownerId: id,
        ownerEmail: email,
        open: true
    }
    await global.connection.collection('groups').insertOne(newGroup)
    return res.status(200).send({ message: "Grupo Criado!" })
        // const bcrypt = require('bcrypt');
    
        // const findEmail = await global.connection.collection("users").find({email:email}).toArray()
        // if(!findEmail.length){
        //     const newUser = {
        //         email,
        //         senha: await bcrypt.hash(senha, 12)
        //     }
        //     await global.connection.collection('users').insertOne(newUser)
        //     return res.status(200).send({menssage:"Cadastro realizado com sucesso"})
        // }else{
        //     return res.status(409).send({menssage:"E-mail já cadastrado"})
        // }    
};

const myGroups = async (req, res) => {
    const {id, email} = req.user
    const findGroups = await global.connection.collection("groups").find({ownerEmail:email}).toArray()
    return res.status(200).send({ message: "ok",groups: findGroups})
};

const delGroup = async (req, res) => {
    const rawId = req.body.id
    const id = new ObjectId(rawId);

    const dbResponse = await global.connection.collection("groups").deleteOne({ _id: id });
    return res.status(200).send({ message: "ok"})
};

const sortearGroup = async (req, res) => {
    const rawId = req.body.id
    const id = new ObjectId(rawId);

    const dbResponse = await global.connection.collection("groups").updateOne({ _id: id }, { $set: {open: false} });
    return res.status(200).send({ message: "ok"})
};
//myGroups

module.exports = { 
    myGroups,
    createGroup,
    delGroup,
    sortearGroup,
 };
