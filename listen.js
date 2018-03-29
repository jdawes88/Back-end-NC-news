const {PORT} = process.env || require('./config/index');
const app = require('./app');


app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`listening on port ${PORT}`)
})