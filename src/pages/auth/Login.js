import React, { useEffect, useState } from "react";
import { Card, Input, Typography } from "@material-tailwind/react";
import MyButton from "../../components/MyButton";
import { useForm } from "react-hook-form";
import {
  IoLockClosedOutline,
  IoMailOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../redux/reducers/AuthReducer";
import { toast } from "react-toastify";
import { getBarRequest } from "../../redux/reducers/MasterReducer";
import { Link } from "react-router-dom";

let authStatus = "";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    dispatch(loginRequest(data));
  };

  useEffect(() => {
    switch (Auth.status) {
      case "Auth/loginRequest":
        authStatus = Auth.status;
        break;
      case "Auth/loginSuccess":
        authStatus = Auth.status;
        dispatch(getBarRequest());
        break;
      case "Auth/loginFailure":
        authStatus = Auth.status;
        toast.error(Auth.error?.message);
        break;
    }
  }, [Auth.status]);

  return (
    <section className="login-body">
      <div class="form-box">
        <div class="form-value">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="logo">
              <img src={require("../../assets/ic_barliq.png")} />
            </div>

            <h2>Login</h2>

            <div class="inputbox">
              <IoMailOutline className="ion-icon" />

              <input
                type="email"
                required
                {...register("email", { required: true })}
              />

              <label>Email</label>
            </div>

            <div class="inputbox">
              <span onClick={() => setShowPassword((preState) => !preState)}>
                {showPassword ? (
                  <IoEyeOffOutline className="ion-icon cursor-pointer" />
                ) : (
                  <IoEyeOutline className="ion-icon cursor-pointer" />
                )}
              </span>

              <input
                type={showPassword ? "text" : "password"}
                required
                {...register("password", { required: true })}
              />

              <label>Password</label>
            </div>

            {/* <div class="forget">
              <label>
                <input type="checkbox" />
                Remember Me
              </label>

              <a href="#">Forgot Password</a>
            </div> */}

            <button type="submit">Log In</button>


            {/* <div class="register">
              <p>
                Don't have an account? <a href="#">Sign Up</a>
              </p>
            </div> */}
          </form>
        </div>
      </div>
    </section>
  );
}
