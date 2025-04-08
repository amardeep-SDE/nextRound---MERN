import Input from "../components/Input";

const Login = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-slate-400">
        <div className="w-full max-w-md p-6 bg-white rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>

          <form>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            {/* <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
            /> */}

            <button className=" w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
              Login
            </button>
          </form>
          <div className="text-center mt-2">
            <p>Don’t have an account ? </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
