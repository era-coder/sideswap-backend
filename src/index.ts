import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { SwapResolver } from './resolvers/swap'

const main = async (): Promise<void> => {
  const app = express()

  app.get('/', (_, res) => {
    res.json({ msg: 'backend works' })
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [SwapResolver],
      validate: false,
    }),
  })

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((err) => {
  console.log(err)
})
