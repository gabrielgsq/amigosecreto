const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const nodemailer = require('nodemailer');
require('dotenv').config();

const loginUser = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await global.connection.collection("users").findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Senha inválida" });
        }

        // Gerar o token JWT
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES,
        });

        // Salvar o token no banco de dados
        await global.connection.collection("users").updateOne(
            { email },
            { $set: { token } }
        );

        // Retornar o token para o frontend
        return res.status(200).send({ message: "Login realizado com sucesso", token });
    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).send({ message: "Erro interno do servidor" });
    }
};

const getAllUsers = async (req, res) => {    
    return res.status(200).send("ok-users-get")
};

const createUser = async (req, res) => {
    const { email , senha } = req.body
    
    // const bcrypt = require('bcrypt');

    const findEmail = await global.connection.collection("users").find({email:email}).toArray()
    if(!findEmail.length){
        const newUser = {
            email,
            senha: await bcrypt.hash(senha, 12)
        }
        await global.connection.collection('users').insertOne(newUser)
        return res.status(200).send({menssage:"Cadastro realizado com sucesso"})
    }else{
        return res.status(409).send({menssage:"E-mail já cadastrado"})
    }    
};

const isAuth = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Token vindo do header Authorization: Bearer <token>
    
        if (!token) {
            return res.status(403).send({ message: "Token não fornecido" });
        }
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Adiciona os dados do usuário no objeto `req`
            return res.status(200).send({ message: "Autorizado" });
        } catch (error) {
            return res.status(401).send({ message: "Token inválido ou expirado" });
        }
        
};

const changePass = async (req, res) => {
    const findEmail = await global.connection.collection("users").find({email:req.user.email}).toArray()

    const oldPasswordFromForm = req.body.oldPassword
    const oldPasswordFromDB = findEmail[0].senha
    const corresponde = await bcrypt.compare(oldPasswordFromForm, oldPasswordFromDB);
    try {
        if (corresponde) {
            const novaSenhaCrypt = await bcrypt.hash(req.body.newPassword, 12)
            await global.connection.collection("users").updateOne({email:req.user.email}, {$set: {senha: novaSenhaCrypt}})
            return res.status(200).send({ message: 'Senha atualizada' });
        } else {
            return res.status(200).send({ message: 'Senha incorreta!' });
        }
    } catch (erro) {
        return res.status(403).send({ message: 'Erro ao verificar a senha:' });
    }
};

const ExcluirConta = async (req, res) => {
    const findUserByEmail = await global.connection.collection("users").find({email:req.user.email}).toArray()
    const rawId = req?.user?.id
    const id = new ObjectId(rawId);
    try{
        const dbResponse = id && await global.connection.collection("users").deleteOne({ _id: id });
        return res.status(200).send({ message: 'Excluído' });
    }catch {
        return res.status(200).send({ message: 'Erro ao excluir' });
    }
};

function gerarSenhaFraca() {
    const caracteres = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz123456789';
    const tamanho = 6;
    let senha = '';

    for (let i = 0; i < tamanho; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indiceAleatorio];
    }

    return senha;
}


const recuperarSenha = async (req, res) => {
    const email = req.body.email
    const findUserByEmail = await global.connection.collection("users").find({ email }).toArray()
    try{
        if (findUserByEmail.length>0){
            const novaSenha = gerarSenhaFraca()
            const novaSenhaCrypt = await bcrypt.hash(novaSenha, 12)
            await global.connection.collection("users").updateOne({email}, {$set: {senha: novaSenhaCrypt}})
            const mailOptions = {
                from: process.env.EMAIL,
                to: findUserByEmail[0].email, // O email do presenteador
                subject: 'Amigo Secreto 2024 - Senha Redefinida',
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
                        <h1 style="color: #ff4500; text-align: center;">🎄 Amigo Secreto 2024 🎄</h1>
                        <p>Olá, <b>${findUserByEmail[0].email}</b>!</p>
                        <p>Está é uma mensagem do sistema Amigo Secreto 2024,</p>
                        <p>Informamos que sua senha foi redefinida para: <b>${novaSenha}</b>.</p>                        
                        <p style="text-align: center; color: #888; font-size: 12px; margin-top: 40px;">
                            Este email foi enviado automaticamente pelo sistema do Amigo Secreto 2024.
                        </p>
                    </div>
                `
            };
            try {
                // Enviar o email
                const transporter = nodemailer.createTransport({
                    host: 'smtp.hostinger.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.SENHA
                    },
                    // logger: true, // Habilita logs detalhados
                    // debug: true   // Habilita modo de depuração
                });
                const info = await transporter.sendMail(mailOptions);
                return res.status(200).send({ message: `Email encontrado` });
            } catch (erro) {
                console.error('Erro ao enviar email:', erro);
            }
        }else{
            return res.status(403).send({ message: `Email não cadastrado` });
        }
        
    }catch {
        return res.status(403).send({ message: 'Não foi possível' });
    }
};

module.exports = { 
    getAllUsers,
    createUser,
    loginUser,
    isAuth,
    changePass,
    ExcluirConta,
    recuperarSenha,
 };
