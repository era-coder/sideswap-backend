# Sideswap Backend

## Stack
- Apollo Server Express
- Axios
- Dotenv
- Eslint
- Express
- GraphQL
- Node.js
- Prettier
- Typescript

## TO DO
- [ ] create swap table: id, deposit address, receive address, amount, deposited(true/false), created_at
- [ ] handle swap request
  - [x] generate deposit address
  - [ ] create swap table entry w/ receive address, deposit address, amount, deposited=false, created_at (auto now)
  - [ ] response: deposit address (+ created_at, id, receive address, deposited and amount for swap status page)
- [ ] periodically check tx history for swap table entries where desposited=false
  - [ ] if balance of deposit address = amount, set deposited=true
    - [ ] send coin to receive address