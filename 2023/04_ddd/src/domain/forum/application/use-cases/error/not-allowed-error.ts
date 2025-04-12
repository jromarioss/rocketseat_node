import { UseCaseError } from "@/core/errors/use-case";

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super("Not allowed");
  }
}