import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function AdminDashboard({updateAdmin,updateAdminToken}) {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    doctorName: "",
    doctorEmail: "",
    doctorPhoneNumber: null,
    clinicAdd: "",
    clinicName: null,
    doctorRegistrationNo: "",
    doctorSpecialization: "",
    doctorPassword: "",
  });
  const referesh = (e) => {
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
  const message = () => {
    return toast.success("Logout Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  //Doctor register
  const doctorRegister = async () => {
    console.log(doctor);
    const pass1 = document.getElementById("password").value;
    const pass2 = document.getElementById("confirmPassword").value;
    console.log(pass1, pass2);
    let token = localStorage.getItem("AdminToken");
    token = JSON.parse(token);
    console.log(token);
    try {
      if (
        pass1 === "" ||
        pass2 === "" ||
        doctor.doctorName === "" ||
        doctor.doctorEmail === "" ||
        doctor.doctorPhoneNumber === "" ||
        doctor.clinicAdd === "" ||
        doctor.clinicName === "" ||
        doctor.doctorRegistrationNo === "" ||
        doctor.doctorSpecialization === "" ||
        doctor.doctorPassword === ""
      ) {
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

      // console.log(doctor);
      const headers = { headers: { Authorization: `Bearer ${token}` } };

      if (pass1 === pass2) {
        const response = await axios
          .post("http://localhost:8888/admin/addDoctor", doctor, headers)
          .then((res) => {
            console.log("response", res);
            navigate("/viewDoctor", { replace: true });
            return toast.success("Register Successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          })
      } 
      else {
        toast.error("Please Enter Both Password Same", {
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
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>

      <nav className="navbar navbar-expand-lg bg-light fixed-top shadow-lg">
        <div className="container">
          <a className="navbar-brand mx-auto d-lg-none" href="index.html">
            Medic Care
            <strong className="d-block">Health Specialist</strong>
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">

              <a className="navbar-brand d-none d-lg-block" href="/admin">
                Doctor Desk
                <strong className="d-block">Health Specialist</strong>
              </a>
              <li className="nav-item">
                <a className="nav-link" href="/viewDoctor">All Doctors</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin" onClick={() => {
                    message();
                    updateAdmin({});
                    updateAdminToken({});
                  }}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">

                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Doctor Registration</h3>

                  <form className="px-md-2" method="post"
                    onSubmit={(e) => referesh(e)}
                  >

                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">Name</label>
                      <input type="text"
                        className="form-control"
                        placeholder="Enter Your name"
                        name="doctorName"
                        value={doctor.doctorName}
                        onChange={setData}
                        required />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Enter your phone number"
                        name="doctorPhoneNumber"
                        pattern="[6-9]\d{9}"
                        title="Incorrect Mobile Number"
                        value={doctor.doctorPhoneNumber}
                        onChange={setData}
                        maxlength="10"
                        required />
                    </div>

                    <div className="form-outline mb-4">
                      <label for="email">Email</label>
                      <input type="email" className="form-control"
                        id="email"
                        pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
                        name="doctorEmail"
                        value={doctor.doctorEmail}
                        onChange={setData}
                        placeholder="Enter email" />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">Clinic Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Clinic Name"
                        name="clinicName"
                        value={doctor.clinicName}
                        onChange={setData}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">Clinic Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Clinic Address"
                        name="clinicAdd"
                        value={doctor.clinicAdd}
                        onChange={setData}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">Registration Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Enter Registration number"
                        name="doctorRegistrationNo"
                        title="Incorrect Mobile Number"
                        value={doctor.doctorRegistrationNo}
                        onChange={setData}
                        maxlength="12"
                        required />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">Specializaion</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Specializaion"
                        name="doctorSpecialization"
                        value={doctor.doctorSpecialization}
                        onChange={setData}
                        required
                      />
                    </div>


                    <div className="form-outline mb-4">
                      <label for="password">Password</label>
                      <input type="password" className="form-control" id="password" name="doctorPassword"
                        value={doctor.doctorPassword}
                        onChange={setData}
                        // pattern="(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,}"
                        title="Invalid Pattern" placeholder="Enter password" />
                    </div>
                    <div className="form-outline mb-4">
                      <label for="confirmPassword">Confirm Password</label>
                      <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" />
                    </div>
                    <button type="submit" className="btn btn-success btn-lg mb-1"
                      onClick={() => doctorRegister()} >ADD</button>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />


    </div>
  )
}

export default AdminDashboard;