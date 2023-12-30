import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import PatientNavbar from "./PatientNavbar";
import "../../css/patientProfile.css";
import axios from "axios";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function PatientProfile({ updatePatient, updatePatientToken }) {
  const navigate = useNavigate();

  let getPatient = localStorage.getItem("MyPatient");
  getPatient = JSON.parse(getPatient);
  // console.log('patient', getPatient);
  const patientName = getPatient.patientName;
  const patientEmail = getPatient.patientEmail;
  const patientAge = getPatient.patientAge;
  const patientAdd = getPatient.patientAdd;
  const patientPhoneNumber = getPatient.patientPhoneNumber;
  const _id = getPatient._id;

  const [patient, setPatient] = useState({
    patientName: patientName,
    patientEmail: patientEmail,
    patientPhoneNumber: patientPhoneNumber,
    patientAdd: patientAdd,
    patientAge: patientAge,
  });
  const refresh = (e) => {
    e.preventDefault();
  };
  const takeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPatient({ ...patient, [name]: value });
  };

  const updatePatientProfile = async () => {
    let token = localStorage.getItem("PatientToken");
    token = JSON.parse(token);
    console.log(token);

    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios
        .put(`http://localhost:8888/patientUpdate/${_id}`, patient, headers)
        .then((res) => {
          console.log(res);
          updatePatient(res.data);
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
          navigate("/patientHome", { replace: true });
        });
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <PatientNavbar></PatientNavbar>
      <div className="container-xl px-4 mt-4">
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">My Profile</div>
              <div className="card-body text-center">
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src="http://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                />
                <p className="card-text">
                  <b>Name:</b>
                  {getPatient.patientName}
                </p>
                <p className="card-text">
                  <b>Email:</b> {getPatient.patientEmail}
                </p>
                <p className="card-text">
                  <b>Phone number:</b> {getPatient.patientPhoneNumber}
                </p>
                <p className="card-text">
                  <b>Age:</b> {getPatient.patientAge}
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
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputFirstName">
                        Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="patientName"
                        value={patient.patientName}
                        onChange={takeInput}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputLastName">
                        Age
                      </label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        value={patient.patientAge}
                        onChange={takeInput}
                        name="patientAge"
                        placeholder="Enter your last name"
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
                        value={patient.patientEmail}
                        pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
                        onChange={takeInput}
                        name="patientEmail"
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
                        value={patient.patientPhoneNumber}
                        pattern="[6-9]\d{9}"
                        title="Incorrect Mobile Number"
                        onChange={takeInput}
                        type="tel"
                        name="patientPhoneNumber"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={updatePatientProfile}
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

export default PatientProfile;
