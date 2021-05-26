import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { SwapResolver } from './resolvers/swap'
import { createConnection } from 'typeorm'
import { Invoice } from './entities/Invoice'
import { InvoiceResolver } from './resolvers/invoice'

const main = async (): Promise<void> => {
  //const conn =
  await createConnection({
    type: 'postgres',
    database: 'sideswap',
    username: 'postgres',
    password: '',
    logging: false,
    synchronize: true,
    entities: [Invoice],
  })

  const app = express()

  app.get('/', (_, res) => {
    res.json({ msg: 'backend works' })
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [SwapResolver, InvoiceResolver],
      validate: false,
    }),
    // context: ({ req, res }) => ({ req, res }),
  })

  apolloServer.applyMiddleware({ app, cors: true })

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((err) => {
  console.log(err)
})
