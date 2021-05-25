# Sideswap Backend

## Stack
- Apollo Server Express
- Axios
- Dotenv
- ESLint
- Express
- GraphQL
- Node.js
- Postgres
- Prettier
- TypeORM
- Typescript

## TO DO
- [x] create invoice table: id, deposit chain, deposit address, receive chain, receive address, deposited(true/false), created_at
- [ ] handle swap request
  - [x] generate deposit address
  - [ ] create invoice entry w/ receive chain+address, deposit chain+address, deposited=false, created_at (auto now)
  - [ ] response: deposit address
- [ ] periodically check tx history for swap table entries where desposited=false
  - [ ] if created_at older than x days and deposited==false, delete invoice
  - [ ] if balance of deposit address = amount, set deposited=true
    - [ ] send coin to receive address