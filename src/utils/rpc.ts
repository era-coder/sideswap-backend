import axios from 'axios'

const USER = process.env.RPC_USER
const PASS = process.env.RPC_PASSWORD
const IP = process.env.RPC_IP
const MIN_CONF = parseInt(process.env.RPC_MIN_CONF)

export const getPort = (chain: string): string => {
  let port = '8332'
  switch (chain) {
    case 'mainchain':
      port = '8332'
      break
    case 'testchain':
      port = '2732'
      break
    case 'thunder':
      port = '2733'
      break
    case 'zside':
      port = '2734'
      break
  }
  return port
}

export const getNewAddress = async (port: string): Promise<string> => {
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

export const getReceivedByAddress = async (
  address: string,
  port: string
): Promise<number> => {
  let amount = 0
  try {
    const resp = await axios.post(`http://${USER}:${PASS}@${IP}:${port}/`, {
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'getreceivedbyaddress',
      params: [address, MIN_CONF],
    })
    amount = resp.data.result
    if (typeof amount !== 'number') {
      amount = 0
    }
  } catch (err) {
    console.log(err)
  }
  return amount
}

export const sendToAddress = async (
  port: string,
  address: string,
  amount: number
): Promise<void> => {
  if (amount > 1.0) amount = 1.0
  try {
    await axios.post(`http://${USER}:${PASS}@${IP}:${port}/`, {
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'sendtoaddress',
      params: [address, amount],
    })
  } catch (err) {
    console.log(err)
  }
}
