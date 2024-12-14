const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const nodemailer = require('nodemailer');
const { sortearAmigoOculto } = require("./sorteio")

const createGroup = async (req, res) => {
    const { obs, groupName } = req.body
    const {id, email} = req.user
    const newGroup = {
        groupName,
        ownerId: id,
        ownerEmail: email,
        obs,
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
    const findGroups = await global.connection.collection("groups").find({ ownerId: id }).toArray()
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

    //reativar abaixo para desativar grupo
    const dbResponse = await global.connection.collection("groups").updateOne({ _id: id }, { $set: {open: false} });
    // Sistema de envio de email
    async function enviarEmail() {
        // Configurar o transportador (transporter)
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com', // Servidor SMTP da Hostinger
            port: 465, // Use 587 para STARTTLS ou 465 para SSL
            secure: true, // true para SSL, false para STARTTLS
            auth: {
                user: process.env.EMAIL, // Seu email
                pass: process.env.SENHA // Sua senha
            }
        });
        // Configurar o email
        const group = await global.connection.collection("groups").find({ _id: id }).toArray()
        const obsToGpt = await global.connection.collection("groups").find({ _id: id }).toArray();
        const sorteioRealizado = await sortearAmigoOculto(group[0].participantes,obsToGpt[0].obs)
        const obs = obsToGpt[0].obs || null
        sorteioRealizado.forEach(async (destinatario)=>{
            const mailOptions = {
                from: process.env.EMAIL,
                to: destinatario.presentedorData.email, // O email do presenteador
                subject: '🎁 Amigo Secreto 2024 - Seu Sorteio 🎉',
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
                        <h1 style="color: #ff4500; text-align: center;">🎄 Amigo Secreto 2024 🎄</h1>
                        <p>Olá, <b>${destinatario.presentedorData.nome}</b>!</p>
                        <p>Você foi sorteado para presentear <b>${destinatario.sorteadoData.nome}</b>.</p>
                        
                        <p><b>Preferências do sorteado:</b> ${destinatario.sorteadoData.gostos}</p>
                        
                        <p>Na esperança de ajudá-lo(a) na escolha, preparamos algumas sugestões de presentes para você:</p>
                        <ul style="list-style-type: disc; padding-left: 20px;">
                            ${destinatario.sorteadoData.dicasDaIa.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        
                        ${obs ? `
                        <p style="margin-top: 20px;"><b>Observação do organizador do evento:</b></p>
                        <p style="background-color: #f9f9f9; border-left: 4px solid #ff4500; padding: 10px;">${obs}</p>
                        ` : ''}
                        
                        <p style="text-align: center; margin-top: 30px;">
                            🎁 Aproveite a oportunidade para surpreender e alegrar seu amigo secreto! 🎉
                        </p>
                        
                        <p style="text-align: center; color: #888; font-size: 12px; margin-top: 40px;">
                            Este email foi enviado automaticamente pelo sistema do Amigo Secreto 2024. 
                            Caso tenha dúvidas, entre em contato com o organizador.
                        </p>
                    </div>
                `
            };
            
            try {
                // Enviar o email
                const info = await transporter.sendMail(mailOptions);
                console.log('Email enviado com sucesso:', info.response);
            } catch (erro) {
                console.error('Erro ao enviar email:', erro);
            }
        })

        
    }
    
    enviarEmail();
    // fim do sistema de envio de email
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
        obs:dbResponse[0].obs
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
