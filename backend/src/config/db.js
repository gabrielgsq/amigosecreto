const { MongoClient } = require('mongodb');

let db;

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        db = client.db(process.env.DB_NAME || 'mydatabase');
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
};

const getDB = () => {
    if (!db) {
        throw new Error('Banco de dados não conectado. Chame connectDB primeiro.');
    }
    return db;
};

module.exports = { connectDB, getDB };
