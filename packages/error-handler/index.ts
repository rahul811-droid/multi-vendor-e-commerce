export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;

  constructor(
    message: string,
    statusCode: number,
    isOperational = true,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this);
  }
}

// Not found error

export class NotFoundError extends AppError {
  constructor(message = "Resources not found") {
    super(message, 404);
  }
}

// validation Error (use for Joi/zod/react-hook-form)

export class ValidationError extends AppError {
  constructor(message = "Invalid request data", details?: any) {
    super(message, 400, true, details);
  }
}

// Authentication Error ()

export class AuthError extends AppError {
  constructor(message: "UnAuthorizes") {
    super(message, 401, true);
  }
}

// Forbidden Error (For Insufficient Permission)

export class Forbidden extends AppError {
  constructor(message = "Forbidden access") {
    super(message, 403);
  }
}

// Databse Error (For mongodb/Postgres Errors)

export class DatabaseError extends AppError {
  constructor(message = "Database error", details?: any) {
    super(message, 500, true, details);
  }
}


export class RateLimitError extends AppError{
    constructor(message = "Too many request,please try again later"){
        super(message,429)
    }
}