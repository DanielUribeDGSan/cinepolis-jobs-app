export interface GeneralResponse<T> {
  success: boolean;
  error: string;
  dataError: string;
  data: T;
}
