async function connection() {
    try{
        const uri = process.env.MONGO_URI;
        const { MongoClient } = require("mongodb")
        const client = new MongoClient(uri);
        await client.connect()
        global.connection = client.db(process.env.DB_NAME)
        console.log("Data base: UP!")
    } catch (error) {
        console.error('Data base: Error on StartUP: ', error);
    }
}

connection()






// const { MongoClient } = require('mongodb');

// let db;

// const connectDB = async () => {
//     const uri = process.env.MONGO_URI;
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();
//         db = client.db(process.env.DB_NAME);
//         console.log('Conectado ao MongoDB com autenticação');
//     } catch (error) {
//         console.error('Erro ao conectar ao MongoDB:', error);
//         process.exit(1);
//     }
// };

// const getDB = () => {
//     if (!db) {
//         throw new Error('Banco de dados não conectado. Chame connectDB primeiro.');
//     }
//     return db;
// };

// module.exports = { connectDB, getDB };
