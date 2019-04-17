const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT || 3000, () => {
    console.log(`Running on port 3000`);
});