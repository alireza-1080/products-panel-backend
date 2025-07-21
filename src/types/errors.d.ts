export interface PrismaError extends Error {
  code: string;
  meta?: {
    target?: string[];
    cause?: string;
  };
}

export interface DatabaseError extends Error {
  code: string;
  meta?: Record<string, unknown>;
}
