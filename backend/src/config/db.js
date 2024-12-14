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