import "dotenv/config";
import {} from "@prisma/client";
import { PrismaClient } from "generated/prisma";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";

const prisma = new PrismaClient();

function generateUniqueDatabaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provider a DATABASE_URL environment variable");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schemaId);

  return url.toString();
}

const schemaId = randomUUID();

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseUrl(schemaId);
  process.env.DATABASE_URL = databaseURL;

  execSync("npx prisma migrate deploy")
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});