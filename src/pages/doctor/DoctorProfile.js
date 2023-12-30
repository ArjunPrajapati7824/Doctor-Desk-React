import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import "../../css/patientProfile.css";
import axios from "axios";
import img1 from "../../image/update.jpg";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import update from '..//../image'
function DoctorProfile({ updateDoctor, updateDoctorToken }) {
  const navigate = useNavigate();

  let getDoctor = localStorage.getItem("Doctor");
  getDoctor = JSON.parse(getDoctor);
  // console.log('patient', getPatient);
  const doctorName = getDoctor.doctorName;
  const doctorEmail = getDoctor.doctorEmail;
  const clinicAdd = getDoctor.clinicAdd;
  const clinicName = getDoctor.clinicName;
  const doctorPhoneNumber = getDoctor.doctorPhoneNumber;
  const _id = getDoctor._id;

  const [doctor, setDoctor] = useState({
    doctorEmail: doctorEmail,
    clinicAdd: clinicAdd,
    clinicName: clinicName,
    doctorPhoneNumber: doctorPhoneNumber,
  });
  const refresh = (e) => {
    e.preventDefault();
  };
  const takeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDoctor({ ...doctor, [name]: value });
  };

  const updateDoctorProfile = async () => {
    let token = localStorage.getItem("DoctorToken");
    console.log(token)
    token = JSON.parse(token);
    console.log(token);

    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios
        .put(`http://localhost:8888/updateDoctors/${_id}`, doctor, headers)
        .then((res) => {
          console.log(res);
          updateDoctor(res.data);
          // updateToken(res.data.token)
          toast.success("Profile Updated Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/doctorHome", { replace: true });
        });
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
    
      <ToastContainer />
      <nav class="navbar navbar-expand-lg bg-light fixed-top shadow-lg">
          <div class="container">
            <a class="navbar-brand mx-auto d-lg-none" href="index.html">
              Doctor Desk
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
                <a class="navbar-brand d-none d-lg-block" href="/home">
                  Doctor Desk
                  <strong class="d-block">Health Specialist</strong>
                </a>
                <li class="nav-item active">
                  <a class="nav-link" href="/doctorAppointments">
                    Pending Appointments
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/doctorConfirmAppointments">
                    Confirm Appointments
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="/doctorPatient">
                    Patients
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/doctorProfile">
                    My Profile
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="/doctor"
                    onClick={() => {
                      updateDoctor({});
                      updateDoctorToken({});
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      <div className="container-xl px-4 mt-4">
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">My Profile</div>
              <div className="card-body text-center">
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src={img1}
                  alt=""
                />
                <p className="card-text">
                  <b>Name:</b>
                  {getDoctor.doctorName}
                </p>
                <p className="card-text">
                  <b>Email:</b> {getDoctor.doctorEmail}
                </p>
                <p className="card-text">
                  <b>Phone number:</b> {getDoctor.doctorPhoneNumber}
                </p>
                <p className="card-text">
                  <b>Clinic Address:</b> {getDoctor.clinicAdd}
                </p>
                <p className="card-text">
                  <b>Clinic Name:</b> {getDoctor.clinicName}
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Edit Profile</div>
              <div className="card-body">
                <form
                  className="px-md-2"
                  onSubmit={(e) => refresh(e)}
                  method="post"
                >
                  <div className="row gx-3 mb-3">
                    {/* <div className="col-md-6">
                      <label className="small mb-1" for="inputFirstName">
                        Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="doctorName"
                        value={doctor.doctorName}
                        onChange={takeInput}
                      /> */}
                    {/* </div> */}
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputLastName">
                        Clinic Name
                      </label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        value={doctor.clinicName}
                        onChange={takeInput}
                        name="clinicName"
                        placeholder="Enter clinic Name"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" for="inputLastName">
                        Clinic Address
                      </label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        value={doctor.clinicAdd}
                        onChange={takeInput}
                        name="clinicAdd"
                        placeholder="Enter clinic Name"
                      />
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputEmailAddress">
                        Email address
                      </label>
                      <input
                        className="form-control"
                        id="inputEmailAddress"
                        value={doctor.doctorEmail}
                        pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
                        onChange={takeInput}
                        name="doctorEmail"
                        type="email"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputPhone">
                        Phone number
                      </label>
                      <input
                        className="form-control"
                        id="inputPhone"
                        value={doctor.doctorPhoneNumber}
                        pattern="[6-9]\d{9}"
                        title="Incorrect Mobile Number"
                        onChange={takeInput}
                        type="tel"
                        name="doctorPhoneNumber"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={updateDoctorProfile}
                  >
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
