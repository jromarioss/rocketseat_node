import { UseGuards } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from "zod";
import { JwtAuthGuard } from "@/infra/auth/jwt-auth.guard";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipe/zod-validation-pipe";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private readonly createQuestion: CreateQuestionUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@CurrentUser() user: UserPayload, @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBodySchema) {
    const { content, title } = body;
    const { sub: userId } = user;

    await this.createQuestion.execute({
      content,
      title,
      authorId: userId,
      attachmentsId: []
    });

    return { message: "Successful question" };
  }
}