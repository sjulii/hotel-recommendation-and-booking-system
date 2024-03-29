import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import {toast} from "react-toastify"
import axios from "axios";
import image from '../image/bg.jpg'
const HotelLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sent data", email, password);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/login/hotel`, {
        email,
        password,
      });

      console.log("login user===>", res);
      if (res.data) {
        //console.log(res.data)
        window.localStorage.setItem("auth", JSON.stringify(res.data));
        dispatch({
          type: "LOGGEd_IN_USER",
          payload: res.data,
        });
        history("/owner/dashboard");
      }
    } catch (err) {
      console.log("server error====>", err);
      if (err.response.status == 400)
        toast.error(err.response.data)
    }
  };

  // const loginForm = () => {
  //   return (
  //     <form onSubmit={handleSubmit} className="mt-5">
  //       <div className="form-group mb-3">
  //         <label className="form-label">your email</label>
  //         <input
  //           type="email"
  //           className="form-control"
  //           placeholder="Enter email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //         ></input>
  //       </div>

  //       <div className="form-group mb-3 ">
  //         <label className="form-label">password</label>
  //         <input
  //           type="password"
  //           className="form-control"
  //           placeholder="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         ></input>
  //       </div>
  //       <button disabled={!email || !password} className="btn btn-primary">
  //         {" "}
  //         submit
  //       </button>
  //       <Link to='/login'><button className="btn btn-outline-primary m-2" >Login as customer</button>
  //     </Link>
  //     </form>
  //   );
  // };

  const loginForm=()=>{
    return( <div className="login-body">
    <div className="login ">
      <h1 className="text-center"> Hotel Login</h1>
      <form className="needs-validation" onSubmit={handleSubmit}>
        <div className="form-group was-validated">
          <label className="form-label">Email adress </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
  
            required
          ></input>
          <div class="inavlid-feedback">Please enter your email address</div>
        </div>

        <div className="form-group was-validated">
          <label className="form-label">password</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <div class="inavlid-feedback">Please enter your password</div>
        </div>

        <div className="form-group  form-check  ">
          <input
            type="checkbox"
            className="form-check-input"
            id="check "
            
          ></input>
          <label className="form-check-label">Remember me</label>
        </div>
        <input type="submit" disabled={!email || !password} className="btn btn-success w-100" value="LOGIN" />

       
      </form>
      <p className="w-100 text-center">&mdash; Or Sign In as customer&mdash;</p>
            <div className="social d-flex text-center">
              <Link to="/login" className="btn btn-secondary w-100">
              Customer Signin
              
              </Link>
              
            </div>
    </div>
    </div>)
  }

  return (
    <>
      
      {loginForm()}
    </>
  );
};

export default HotelLogin;
