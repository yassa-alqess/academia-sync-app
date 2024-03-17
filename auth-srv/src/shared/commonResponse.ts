export class CommonResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
  pagination?: {
    pages: number;
    limit: number;
  };
}
