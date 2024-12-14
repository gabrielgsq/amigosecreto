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

const checkGroup = async (req, res) => {
    const rawId = req.body.id
    console.log(rawId)
    const id = new ObjectId(rawId);

    const dbResponse = await global.connection.collection("groups").find({ _id: id }).toArray();
    // const responseJson = await dbResponse.json()
    console.log(dbResponse)

    const resposta = {
         message: "ok", 
         open: dbResponse[0]?.open, 
         groupName: dbResponse[0]?.groupName
        }
    return res.status(200).send(resposta)
};

const participar = async (req, res) => {
    const rawId = req.body.id
    console.log(rawId)
    const id = new ObjectId(rawId);

    const dbResponse = await global.connection.collection("groups").find({ _id: id }).toArray();

    // const responseJson = await dbResponse.json()
    console.log(dbResponse)
    if (!dbResponse[0].open){
        return res.status(401).send({message: "closed group"})
    }

    const participante = { 
        email: req.body.email, 
        nome: req.body.nome,
        gostos: req.body.gostos,

    };
    const addUser = await global.connection.collection("groups").updateOne(
        { 
          _id: new ObjectId(id), 
          "participantes.email": { $ne: participante.email } // Verifica se o email NÃO existe
        },
        { $push: { participantes: participante } } // Adiciona o participante ao array
      );
      
      const resposta = {
        message: "ok", 
        open: dbResponse[0]?.open, 
        groupName: dbResponse[0]?.groupName
       }
      if (addUser.modifiedCount > 0) {
        resposta.message = "Cadastro Realizado com Sucesso"
        return res.status(200).send(resposta)
      } else {
        resposta.message = "Email já cadastrado"
        return res.status(200).send(resposta)
      }
};
//myGroups

module.exports = { 
    myGroups,
    createGroup,
    delGroup,
    sortearGroup,
    checkGroup,
    participar,
 };
