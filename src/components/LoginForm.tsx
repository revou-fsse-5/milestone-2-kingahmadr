import { useFormik } from "formik";
import { UserProps } from "../interfaces";
import useFecthData from "../hooks/useFecthData";
import tailwindStyles from "../scripts/constans/styles";
import { LoginValidationForm } from "../modules/ValidationSchema";
import Navbar from "./Navbar";

const LoginForm = () => {
  const { userLogin } = useFecthData();

  const handleSubmit = (data: UserProps) => {
    userLogin(data);
  };
  const formik = useFormik<UserProps>({
    initialValues: {
      email: "",
      password: "", // Password nya gak boleh yang susah bray
    },
    validationSchema: LoginValidationForm,
    onSubmit: (values, { setSubmitting }) => {
      const { confirmPassword, ...dataToSubmit } = values;
      setTimeout(() => {
        handleSubmit(dataToSubmit);
        setSubmitting(false);
        console.log(dataToSubmit);
      }, 400);
    },
  });
  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center gap-10 mt-16">
        <h1 className="text-5xl text-white text-center mt-5">Login Form</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white border-2 border-gray-300 p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
        >
          <label
            className="text-lg font-semibold text-gray-900"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className={tailwindStyles.errorText}>
              {formik.errors.email}
            </div>
          ) : null}
          <label
            className="text-lg font-semibold text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className={tailwindStyles.errorText}>
              {formik.errors.password}
            </div>
          ) : null}

          <button
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Login
          </button>
        </form>
      </section>
    </>
  );
};

export default LoginForm;
