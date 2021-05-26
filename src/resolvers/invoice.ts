import 'dotenv-safe/config'
import { Resolver, Arg, Mutation } from 'type-graphql'
import axios from 'axios'
import { Invoice } from '../entities/Invoice'
import { getConnection } from 'typeorm'

const USER = process.env.RPC_USER
const PASS = process.env.RPC_PASSWORD
const IP = process.env.RPC_IP

const getNewAddress = async (port: string): Promise<string> => {
  let address = ''
  try {
    const resp = await axios.post(`http://${USER}:${PASS}@${IP}:${port}/`, {
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'getnewaddress',
      params: ['', 'legacy'],
    })
    address = resp.data.result
  } catch (err) {
    console.log(err)
  }
  return address
}

@Resolver()
export class InvoiceResolver {
  @Mutation(() => Invoice)
  async createInvoice(
    @Arg('depositChain') depositChain: string,
    @Arg('receiveChain') receiveChain: string,
    @Arg('receiveAddress') receiveAddress: string
  ): Promise<Invoice> {
    let depositAddress = ''
    switch (depositChain) {
      case 'mainchain':
        depositAddress = await getNewAddress('8332')
        break
      case 'testchain':
        depositAddress = await getNewAddress('2732')
        break
      case 'thunder':
        depositAddress = await getNewAddress('2733')
        break
      case 'zside':
        depositAddress = await getNewAddress('2734')
        break
    }
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
