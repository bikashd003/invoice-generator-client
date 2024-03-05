import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../Services/Api.ts";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PuffLoader } from "react-spinners";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (!name) {
      setError(true);
    } else {
      setError(false);
    }
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
    setLoading(true);
    if (!error && emailError === "" && passwordError === "") {
      try {
        const response = await axios.post(`${API}/admin/register`, {
          name,
          email,
          password,
        });
        if (response.status === 201) {
          navigate("/");
        }
      } catch (error: any) {
        if (error.response.data.error === "Email already exist") {
          toast("Admin already exists");
        } else {
          toast("Error submitting data:");
        }
      }
      finally{
        setLoading(false);
      
      }
    }
  };
  const handleName = (e: any) => {
    setName(e.target.value);
    if (name) {
      setError(false);
    }
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
    if (email) {
      setEmailError("");
    }
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
    if (password) {
      setPasswordError("");
    }
  };

  return (
    <>
      <div className="flex items-center h-[100vh] flex-col justify-center bg-[#c9cbc9]">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign up to your account
        </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-md">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full name <span className="text-red-600">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => handleName(e)}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
                {error && <p className="text-red-600">Name is required</p>}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address<span className="text-red-600">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => handleEmail(e)}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
                {emailError.length > 0 && (
                  <p className="text-red-600">{emailError}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password<span className="text-red-600">*</span>
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => handlePassword(e)}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
                {passwordError.length > 0 && (
                  <p className="text-red-600">{passwordError}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               {loading ? <PuffLoader color="#ffff" /> : "Register"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?
            <Link
              to="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
