import { Resolver, Arg, Query } from 'type-graphql'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

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
export class SwapResolver {
  @Query(() => String)
  async getAddress(@Arg('chain') chain: string): Promise<string> {
    switch (chain) {
      case 'mainchain':
        return await getNewAddress('8332')
      case 'testchain':
        return await getNewAddress('2732')
      case 'thunder':
        return await getNewAddress('2733')
      case 'zside':
        return await getNewAddress('2734')
      default:
        return 'error'
    }
  }
}
