import fastify from 'fastify';
import { knex } from './database';
import crypto from 'node:crypto';
import { env } from './env';

const app = fastify();

app.get('/hello', async () => {
  // const transation = await knex('transactions').insert({
  //   id: crypto.randomUUID(),
  //   title: 'Transação de teste',
  //   amount: 1000
  // }).returning('*');

  //const transation = await knex('transactions').select('*');
  const transation = await knex('transactions').where('amount', 1000).select('*');

  return transation;
});

app.listen({
  port: env.PORT
}).then(() => {
  console.log('HTTP Server Running!')
});
