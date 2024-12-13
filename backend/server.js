require('dotenv').config();
const app = require('./src/app');
const { connection } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

console.clear();

(async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server:    UP! (http://localhost:${PORT})`);
        });
    } catch (error) {
        console.error('Server Error: ', error);
    }
})();
