export interface ErrorMessage {
  status: number;
  data: {
    success: boolean;
    error: string;
    dataError: string | null;
    data: boolean | null;
  };
}
