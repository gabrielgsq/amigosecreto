const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    console.log("req.user: ",req.user)
    console.log("req.body: ",req.body)
    
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


module.exports = { 
    getAllUsers,
    createUser,
    loginUser,
    isAuth,
    changePass,
 };
