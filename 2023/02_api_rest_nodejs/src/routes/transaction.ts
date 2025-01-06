import { knex } from '../database';
import { z } from 'zod';
import { FastifyInstance } from 'fastify';
import crypto from 'node:crypto';

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    });

    const { amount, title, type } = createTransactionBodySchema.parse(request.body);

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    });
  
    return reply.status(201).send();
  });
}