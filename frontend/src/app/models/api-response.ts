import { Category } from "../categories/model/category";

export interface ApiResponse {
  status: boolean;
  message: string;
  data: Category[];
}
