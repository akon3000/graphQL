const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const app = express()

const v1User = require('./src/v1/user')

app.use('/v1/user', bodyParser.json(), graphqlExpress(v1User))
app.use('/v1/i/user', graphiqlExpress({ endpointURL: '/v1/user' }))

app.listen(4000, () => console.log('GraphQL start server on PORT 4000'))