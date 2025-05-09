export interface VansType {
    description: string;
    _id?: string;
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