import { knex } from '../database';
import { FastifyInstance } from 'fastify';

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/hello', async () => {
    const transation = await knex('transactions').where('amount', 1000).select('*');
  
    return transation;
  });
}