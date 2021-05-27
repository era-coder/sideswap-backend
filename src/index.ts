import 'reflect-metadata'
import 'dotenv-safe/config'
import express from 'express'
import { schedule } from 'node-cron'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { SwapResolver } from './resolvers/swap'
import { createConnection } from 'typeorm'
import { Invoice } from './entities/Invoice'
import { InvoiceResolver } from './resolvers/invoice'

const main = async (): Promise<void> => {
  const conn = await createConnection({
    type: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: process.env.DB_LOGGING === 'true' ? true : false,
    synchronize: process.env.DB_SYNC === 'true' ? true : false,
    entities: [Invoice],
  })

  const app = express()

  app.get('/', (_, res) => {
    res.json({ msg: 'backend works' })
  })

  // check balances every 30 sec
  schedule('*/30 * * * * *', async () => {
    console.log('running a task every 30 seconds')
    const unpaidInvoices = await Invoice.find({
      where: { hasDeposited: false },
    })
    unpaidInvoices.forEach((invoice) => {
      console.log(`checking balance for ${invoice.depositAddress}`)
      // TODO balance = RPC get balance (invoice.depositAddress)
      // if balance > 0.1
      console.log(
        `sending tx to ${invoice.receiveAddress} on ${invoice.receiveChain}`
      )
      // TODO send tx to invoice.receiveAddress
      conn
        .createQueryBuilder()
        .update(Invoice)
        .set({ hasDeposited: true })
        .where('id = :id', { id: invoice.id })
        .execute()
    })
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [SwapResolver, InvoiceResolver],
      validate: false,
    }),
  })

  apolloServer.applyMiddleware({ app, cors: true })

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((err) => {
  console.log(err)
})
