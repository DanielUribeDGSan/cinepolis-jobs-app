export interface ErrorMessage {
  status: number;
  data: {
    success: boolean;
    error: string;
    dataError: string;
    data: boolean;
  };
}
