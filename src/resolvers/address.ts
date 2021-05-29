import 'dotenv-safe/config'
import { Resolver, Arg, Query } from 'type-graphql'
import { getNewAddress, getPort } from '../utils/rpc'

// for testing purposes

@Resolver()
export class AddressResolver {
  @Query(() => String)
  async getAddress(@Arg('chain') chain: string): Promise<string> {
    switch (chain) {
      case 'mainchain':
      case 'testchain':
      case 'thunder':
      case 'zside':
        return await getNewAddress(getPort(chain))
      default:
        return 'error'
    }
  }
}
