
const getAllUsers = async (req, res) => {
    
    
    return res.status(200).send("ok-users-get")
};

const createUser = async (req, res) => {
    req && console.log(req.body)
    return res.status(200).send("ok-users-post")
};

module.exports = { getAllUsers, createUser };
