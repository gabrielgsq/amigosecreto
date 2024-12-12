const { getDB } = require('../config/db');

const getAllGroups = async (req, res) => {
    try {
        const db = getDB();
        const groups = await db.collection('groups').find().toArray();
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar grupos', error });
    }
};

const createGroup = async (req, res) => {
    try {
        const db = getDB();
        const newGroup = req.body;
        const result = await db.collection('groups').insertOne(newGroup);
        res.status(201).json(result.ops[0]);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar grupo', error });
    }
};

module.exports = { getAllGroups, createGroup };
