import 'reflect-metadata'
import 'dotenv-safe/config'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { AddressResolver } from './resolvers/address'
import { InvoiceResolver } from './resolvers/invoice'
import { Invoice } from './entities/Invoice'
import { checkInvoices } from './cron'

const main = async (): Promise<void> => {
  await createConnection({
    type: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: process.env.DB_LOGGING === 'true' ? true : false,
    synchronize: process.env.DB_SYNC === 'true' ? true : false,
    entities: [Invoice],
  })

  const app = express()

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  )

  app.get('/', (_, res) => {
    res.json({ msg: 'backend works' })
  })

  // check unpaid invoices every 30 sec
  checkInvoices('*/30 * * * * *')

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AddressResolver, InvoiceResolver],
      validate: false,
    }),
  })

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((err) => {
  console.log(err)
})
