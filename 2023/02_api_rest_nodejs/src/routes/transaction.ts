import { knex } from '../database';
import { z } from 'zod';
import { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import { checkSessionIdExists } from '../middleware/check-session-id-exists';

export async function transactionsRoutes(app: FastifyInstance) {
  // app.addHook('preHandler', async(request, reply) => {
  //   await checkSessionIdExists(request, reply);
  // });

  app.get('/', async (request, reply) => {
    const { sessionId } = request.cookies;

    const transactions = await knex('transactions')
      .where('session_id', sessionId)
      .select();
    return { transactions };
  });

  app.get('/:id', async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid()
    });

    const { id } = getTransactionParamsSchema.parse(request.params);
    const { sessionId } = request.cookies;

    const transaction = await knex('transactions')
      .where({ id, session_id: sessionId })
      .first();
    return { transaction };
  });

  app.get('/summary', async () => {
    const summary = (await knex('transactions').sum('amount', { as: 'amount'}).first());
    return { summary };
  });

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    });

    const { amount, title, type } = createTransactionBodySchema.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 100 * 60 * 60 * 24 * 7
      });
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId
    });
  
    return reply.status(201).send();
  });
}