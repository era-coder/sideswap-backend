import 'dotenv-safe/config'
import { Resolver, Arg, Mutation } from 'type-graphql'
import { Invoice } from '../entities/Invoice'
import { getConnection } from 'typeorm'
import { getNewAddress, getPort } from '../utils/rpc'

@Resolver()
export class InvoiceResolver {
  @Mutation(() => Invoice)
  async createInvoice(
    @Arg('depositChain') depositChain: string,
    @Arg('receiveChain') receiveChain: string,
    @Arg('receiveAddress') receiveAddress: string
  ): Promise<Invoice> {
    const depositAddress = await getNewAddress(getPort(depositChain))
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Invoice)
      .values({
        depositChain: depositChain,
        depositAddress: depositAddress,
        receiveChain: receiveChain,
        receiveAddress: receiveAddress,
      })
      .returning('*')
      .execute()
    const invoice = result.raw[0]
    return invoice
  }
}
