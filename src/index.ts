import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const USER = process.env.RPC_USER
const PASS = process.env.RPC_PASSWORD

const main = async (): Promise<void> => {
  const app = express()

  app.get('/mainchain/getblockchaininfo', (_, res) => {
    axios
      .post(`http://${USER}:${PASS}@127.0.0.1:8332/`, {
        jsonrpc: '1.0',
        id: 'curltext',
        method: 'getblockchaininfo',
      })
      .then(function (response) {
        res.json(response.data)
      })
      .catch(function (error) {
        console.log(error)
        res.json({ msg: 'error' })
      })
  })

  app.get('/mainchain/getnewaddress', (_, res) => {
    axios
      .post(`http://${USER}:${PASS}@127.0.0.1:8332/`, {
        jsonrpc: '1.0',
        id: 'curltext',
        method: 'getnewaddress',
        params: ['', 'legacy'],
      })
      .then(function (response) {
        res.json(response.data)
      })
      .catch(function (error) {
        console.log(error)
        res.json({ msg: 'error' })
      })
  })

  app.get('/', (_, res) => {
    res.json({ msg: 'backend works' })
  })

  app.get('/testchain/getblockchaininfo', (_, res) => {
    axios
      .post(`http://${USER}:${PASS}@127.0.0.1:2732/`, {
        jsonrpc: '1.0',
        id: 'curltext',
        method: 'getblockchaininfo',
      })
      .then(function (response) {
        res.json(response.data)
      })
      .catch(function (error) {
        console.log(error)
        res.json({ msg: 'error' })
      })
  })

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((err) => {
  console.log(err)
})
