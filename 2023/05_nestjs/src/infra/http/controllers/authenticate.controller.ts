import { UnauthorizedException, UsePipes } from "@nestjs/common";
import { Body, Controller, Post } from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { compare } from "bcryptjs";
import { z } from "zod";
import { ZodValidationPipe } from "@/infra/http/pipe/zod-validation-pipe";
import { JwtService } from "@nestjs/jwt";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string()
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller("/sessions")
export class AuthenticateController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) throw new UnauthorizedException('User credentials do not math.')
      
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('User credentials do not math.')

    const accessToken = this.jwt.sign({ sub: user.id });

    return { access_token: accessToken };
  }
}