const express = require('express')
const bodyParser = require('body-parser')
const { Client } = require('pg')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const v1User = require('./src/v1/user')
const v2Article = require('./src/v2/article')
const v3Article = require('./src/v3/article')

const start = async () => {
  const limit = 10
  const pgClient = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'graphQL'
  })
  await pgClient.connect()

  const app = express()

  app.use('/v1/user', bodyParser.json(), graphqlExpress({
    schema: v1User
  }))
  app.use('/v1/i/user', graphiqlExpress({ endpointURL: '/v1/user' }))

  app.use('/v2/article', bodyParser.json(), graphqlExpress({
    schema: v2Article,
    context: { pgClient, limit }
  }))
  app.use('/v2/i/article', graphiqlExpress({ endpointURL: '/v2/article' }))

  app.use('/v3/article', bodyParser.json(), graphqlExpress({
    schema: v3Article,
    context: { pgClient, limit }
  }))
  app.use('/v3/i/article', graphiqlExpress({ endpointURL: '/v3/article' }))

  app.listen(4000, () => console.log('GraphQL start server on PORT 4000'))

}

start()