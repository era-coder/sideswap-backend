import { schedule } from 'node-cron'
import { Invoice } from './entities/Invoice'
import { getPort, getReceivedByAddress, sendToAddress } from './utils/rpc'
import { getConnection } from 'typeorm'

export const checkInvoices = (seconds: string): void => {
  schedule(seconds, async () => {
    console.log('running task every 30 seconds')
    const unpaidInvoices = await Invoice.find({
      where: { hasDeposited: false },
    })
    unpaidInvoices.forEach(async (invoice) => {
      console.log(
        `checking balance for ${invoice.depositAddress} on ${invoice.depositChain}`
      )
      const balance = await getReceivedByAddress(
        invoice.depositAddress,
        getPort(invoice.depositChain)
      )
      if (balance >= 0.1) {
        console.log(
          `sending tx to ${invoice.receiveAddress} on ${invoice.receiveChain}`
        )
        sendToAddress(
          getPort(invoice.receiveChain),
          invoice.receiveAddress,
          balance
        )
        console.log('setting invoice status to hasDeposited=true')
        getConnection()
          .createQueryBuilder()
          .update(Invoice)
          .set({ hasDeposited: true })
          .where('id = :id', { id: invoice.id })
          .execute()
      }
      if (balance < 0.1) {
        console.log('received insufficient amount')
      }
      // TODO remove unpaid invoices after x days
    })
  })
}
