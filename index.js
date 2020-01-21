const server = require('./server.js');

const accountRouter = require('./data/seeds/accountsRouter');

const PORT = process.env.PORT || 4000;

server.use('/api/accounts', accountRouter);

server.get('/', (req,res)=>{
  res.json({ Hello: "Welcome to KNEX"})
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});