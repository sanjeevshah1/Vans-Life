export interface VansType {
    description: string;
    id: string;
    imageUrl: string;
    name: string;
    price: number;
    type: string;
  }
  
export type FormType = {
  email: string;
  password: string;
}

export type ErrorType = {
  message: string;
  statusText: string;
  status: string;
}