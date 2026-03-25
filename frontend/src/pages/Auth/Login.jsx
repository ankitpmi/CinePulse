import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pt-24 pb-12 flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2">
          <h1 className="page-title mb-4">Sign In</h1>

          <form onSubmit={submitHandler} className="w-full max-w-md">
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

            <button
              disabled={isLoading}
              type="submit"
              className="btn-primary my-[1rem]"
            >
              {isLoading ? "Signing In ..." : "Sign In"}
            </button>
            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p>
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-app-secondary hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="hidden lg:block w-[28rem] h-[32rem] object-cover rounded-xl border border-app-border"
        />
      </section>
    </div>
  );
};

export default Login;
