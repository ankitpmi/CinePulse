import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/users";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered.");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pt-24 pb-12 flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2">
          <h1 className="page-title mb-4">Create Account</h1>

          <form onSubmit={submitHandler} className="w-full max-w-md">
            <div className="my-[2rem]">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-app-text"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 input"
                placeholder="Enter Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-app-text"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 input"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-app-text"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-app-text"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="btn-primary my-[1rem] w-full"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p>
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-app-secondary hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="hidden lg:block w-[28rem] h-[32rem] object-cover rounded-xl border border-app-border"
        />
      </section>
    </div>
  );
};
export default Register;
