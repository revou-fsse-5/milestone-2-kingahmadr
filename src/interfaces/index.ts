// export interface AllProductsProps {
//   [key: string]: string | string[] | number | number[];
// }
export interface AllProductsProps {
  image: string | undefined;
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  images?: string[];
}

export interface UserProps {
  id?: number;
  name?: string;
  role?: string;
  email: string;
  password: string;
  avatar?: string;
  confirmPassword?: string;
}
