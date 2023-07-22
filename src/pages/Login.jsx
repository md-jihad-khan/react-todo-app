import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const { isAuthenticated, setISAuthenticated, loading, setLoading } =
    useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isAuthenticated) return <Navigate to={"/"} />;

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setISAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setISAuthenticated(false);
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <button disabled={loading} type="submit">
            Login
          </button>
          <h1>or</h1>
          <Link to="/register">Sign up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
