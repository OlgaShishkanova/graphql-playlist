const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

//allow cross-origin requests
app.use(cors())

// connect to mlab database

mongoose.connect('mongodb+srv://Olga:mIDHfs6JD09LDSRm@test-db-o6s7l.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })

mongoose.connection.once('open', () => {
    console.log('connected to database')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log('now listening for requests on port 3000')
})