const PORT = process.env.PORT || require('./config/index').PORT;
const app = require('./app');


app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`listening on port ${PORT}`)
})