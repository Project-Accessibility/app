export interface IApiResponse {
  status: number;
  error: boolean;
  message?: string;
  data?: any;
}
