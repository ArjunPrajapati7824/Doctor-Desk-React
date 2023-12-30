import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function DoctorLogin({ updateDoctor, updateDoctorToken }) {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({
    doctorEmail: "",
    doctorPassword: "",
  });
  const refresh = (e) => {
    e.preventDefault();
  };
  const setData = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setDoctor((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const DoctorLogin = async () => {
    try {
      if (doctor.doctorEmail === "" || doctor.doctorPassword === "") {
        return toast.error("please fill all the details!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      console.log(doctor);

      const response = await axios
        .post("http://localhost:8888/doctor/doctorSignin", doctor)
        .then((res) => {
          console.log("res", res);

          if (res.data.doctor?.status === 404) {
            setDoctor({
              doctorEmail: "",
              doctorPassword: "",
            });

            return toast.error("invalid user!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
          if (res.data.doctor?.status === 201) {
           

            return toast.success("Login Successfully!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
          updateDoctor(res.data.doctor);
          updateDoctorToken(res.data.token);
          navigate("/doctorHome", { replace: true });
          toast.success("login successfull");
        });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-light fixed-top shadow-lg">
        <div class="container">
          <a class="navbar-brand mx-auto d-lg-none" href="index.html">
            Medic Care
            <strong class="d-block">Health Specialist</strong>
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto">
              <a class="navbar-brand d-none d-lg-block" href="index.html">
                Doctor Desk
                <strong class="d-block">Health Specialist</strong>
              </a>
            </ul>
          </div>
        </div>
      </nav>

      <section class="h-100 h-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-8 col-xl-6">
              <div class="card rounded-3">
                <div class="card-body p-4 p-md-5">
                  <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Doctor Login
                  </h3>

                  <form
                    class="px-md-2"
                    method="post"
                    onSubmit={(e) => refresh(e)}
                  >
                    <div class="form-outline mb-4">
                      <label class="form-label" for="form3Example1q">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email Id"
                        name="doctorEmail"
                        value={doctor.doctorEmail}
                        pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
                        onChange={setData}
                        required
                      />
                    </div>
                    <div class="form-outline mb-4">
                      <label class="form-label" for="form3Example1q">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        name="doctorPassword"
                        value={doctor.doctorPassword}
                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}"
                        // title="Must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
                        onChange={setData}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      class="btn btn-success btn-lg mb-1"
                      onClick={() => DoctorLogin()}
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
      <ToastContainer />

        </div>
      </section>
    </div>
  );
}

export default DoctorLogin;
