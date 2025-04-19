import { UseGuards } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

const createQuestionBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
});

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateQuestionBodySchema) {

    return { message: 'ok' };
  }
}