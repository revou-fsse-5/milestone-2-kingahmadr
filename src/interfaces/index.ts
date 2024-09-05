// interface CategoryProps {
//   name: string;
// }
export interface AllProductsProps {
  image: string | undefined;
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  // category?: CategoryProps;
  category?: string;
  name: string;
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
