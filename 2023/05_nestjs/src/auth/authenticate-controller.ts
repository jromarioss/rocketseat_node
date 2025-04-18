import { ConflictException, UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { hash } from "bcryptjs";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipe/zod-validation-pipe";
import { JwtService } from "@nestjs/jwt";

// const createAccountBodySchema = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   password: z.string()
// });

//type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller("/sessions")
export class AuthenticateController {
  constructor(private readonly jwt: JwtService) {}

  @Post()
  //@HttpCode(201)
  //@UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle() {
    const token = this.jwt.sign({ sub: 'user-id' });
    return token;
  }
}