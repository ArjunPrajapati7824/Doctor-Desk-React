import img1 from "../../image/Medical prescription-bro.png";
import PatientNavbar from "./PatientNavbar";
import "../../css/appointmentbook.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { BallTriangle } from 'react-loader-spinner';

import { ToastContainer, toast } from "react-toastify";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
function PatientAppointmentBook() {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    bookingDate: "",
    TimeSlot: "",
    appointmentDiseases: "",
  });
  const [myAppointment, setMyAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData1] = useState(null);

  useEffect(() => {
    // Simulate data fetching from the server
    setTimeout(() => {
      fetch('https://api.example.com/data')
        .then((response) => response.json())
        .then((result) => {
          setData1(result);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
          setLoading(false);
        });
    }, 2000); // Simulated server delay of 2 seconds
  }, []);

  useEffect(() => {
    getMyAppointment();
  }, []);

  const refresh = (e) => {
    e.preventDefault();
  };

  const setData = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setAppointment((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const bookAppointment = async () => {
    console.log("appointment", appointment);
    let token = localStorage.getItem("PatientToken");
    token = JSON.parse(token);
    console.log(token);
    if (
      appointment.TimeSlot == "" ||
      appointment.bookingDate == ""
    ) {
      return toast.error("Please Fill Date and Time!", {
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
    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios
        .post(
          `http://localhost:8888/patient/bookAppointment?doctor=653c0a3979b5380b86aa0466`,
          appointment,
          headers
        )
        .then((res) => {
          console.log(res);
          toast.success("Appointment booked Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/patientHome");
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const getMyAppointment = async () => {
    let token = localStorage.getItem("PatientToken");
    token = JSON.parse(token);
    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        "http://localhost:8888/patient/getMyAppointment",
        headers
      );
      console.log("response", response);
      if (response) {
        setLoading(false)
        setMyAppointment(response.data);
      }
    } catch (error) {
      console.log("error: ", error);
      return error;
    }
  };
  const deleteMyAppointment = async (item) => {
    const id = item._id;
    let token = localStorage.getItem("PatientToken");
    token = JSON.parse(token);
    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.delete(
        `http://localhost:8888/patient/cancelAppointment/${id}`,
        headers
      );
      if (response) {
        toast.success("Appointment Deleted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/patientHome");
      }
      console.log(response);
      getMyAppointment(); // changed
    } catch (error) {
      console.log("error", error);
    }
  };
  var currentDate = new Date();
  var day = String(currentDate.getDate()+1).padStart(2, '0'); ;
  var month = String(currentDate.getMonth() + 1).padStart(2, '0'); ;
  var year = currentDate.getFullYear();
  var date = year + "-" + month + "-" + day;
  
  var someDate = new Date();
  var numberOfDaysToAdd = 15;
  var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

  var maxDate = new Date(result);
  var maxday = maxDate.getDate();
  var maxMonth = maxDate.getMonth() + 1;
  var maxYear = maxDate.getFullYear();
  var date2 = maxYear + "-" + maxMonth + "-" + maxday;

  console.log(date);
  console.log(date2);
  return (
    <div>
      <ToastContainer />
      <PatientNavbar></PatientNavbar>

      <div className="flex">
        <div className="half">
          <img
            src={img1}
            height={"500px"}
            alt="get a vaccine"
            title="get a appointment for yourself"
          />
        </div>
        <div className="formbold-main-wrapper half">
          <div className="formbold-form-wrapper">
            <form method="post" onSubmit={(e) => refresh(e)}>
              <h3 for="name">Appointment Booking Form</h3>
              <br />
              <br />
              <div className="flex flex-wrap formbold--mx-3">
                <div className="w-full sm:w-half formbold-px-3">
                  <div className="formbold-mb-5 w-full">
                    <label for="date" className="formbold-form-label">
                      {" "}
                      Date{" "}
                    </label>
                    <input
                      type="date"
                      name="bookingDate"
                      id="date"
                      className="formbold-form-input"
                      placeholder="Select date"
                      required
                      onChange={setData}
                      value={appointment.bookingDate}
                      max={date2}
                      min={date}

                    />
                  </div>
                </div>
                <div className="w-full sm:w-half formbold-px-3">
                  <div className="formbold-mb-5">
                    <label for="time" className="formbold-form-label">
                      Choose Time Time{" "}
                    </label>
                    {/* <p className="alert alert-success" align="center">full</p> */}
                    {/* <label>
                <input type="radio" name="timeSlot" value="9-12" disabled/>
                9 AM - 12 PM
              </label>
              <br/> */}
                    <input
                      type="radio"
                      name="TimeSlot"
                      value="9-12"
                      onChange={setData}
                      required
                    />
                    9 AM - 12 PM
                    <br />
                    <label>
                      <input
                        type="radio"
                        name="TimeSlot"
                        value="4-7"
                        onChange={setData}
                        required
                      />
                      4 PM - 7 PM
                    </label>
                    <br />
                    {/* <label>
                <input type="radio" name="timeSlot" value="4-7" disabled/>
                4 PM - 7 PM
              </label> */}
                    {/* 
              <label>
                <input type="radio" name="timeSlot" value="9-12" />
                9 AM - 12 PM
              </label>
              <br/>
              <label>
                <input type="radio" name="timeSlot" value="4-7" />
                4 PM - 7 PM
              </label>

              */}
                  </div>
                </div>
              </div>

              <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">
                  Diseases : &nbsp;&nbsp;&nbsp;
                </label>
             
              <select name="appointmentDiseases" id="exampleFormControlTextarea1" 
               onChange={setData}
               rows="3"
               value={appointment.appointmentDiseases}
              style={{padding:5}}
               >
                    <option>symptoms</option>
                    <option value="Headache">Headache</option>
                    <option value="Fever">Fever</option>
                    <option value="Cold">Cold</option>
                    <option value="Cough">Cough</option>
                    <option value="Vomit">Vomit</option>
                    <option value="Stomach Pain">Stomach Pain</option>
                    <option value="Body Pain">Body Pain Pain</option>
                    {/* value={appointment.appointmentDiseases} */}
                  
                 
              </select>
              
                  
                 
                
              </div>
              <div>
                <button
                  className="formbold-btn"
                  onClick={() => bookAppointment()}
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr />
      <h4>Today's Appointment</h4>
      {loading ? (
        <div className="loader">
          <center><BallTriangle color="#007BFF" width={1500} size={100} loading={loading}></BallTriangle></center>
          <center><p>Loading...</p></center>
        </div>
      ) : (
        <table class="table">
          <thead class="table-success">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Disease</th>
              <th>Status</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody>
            {myAppointment.map((item) => {
              var currentDate = new Date();
              var day = String(currentDate.getDate()).padStart(2, '0'); ;
              var month = String(currentDate.getMonth()+1).padStart(2, '0');
              var year = currentDate.getFullYear();
              var date = year + "-" + month + "-" + day;
              console.log(date);
              if (
                 item.bookingDate == date &&
                item.appointmentStatus === "approved"
              ) {
                return (
                  <tr>
                    <td>{item.bookingDate}</td>
                    <td>{item.TimeSlot}</td>
                    <td>{item.appointmentDiseases}</td>
                    <td>{item.appointmentStatus}</td>
                    <td>
                      <button
                        type="submit"
                        class="btn btn-danger"
                        onClick={(e) => {
                          deleteMyAppointment(item);
                          refresh(e);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    
                   
                  </tr>
                );
              }
            })}
          </tbody>
        </table>)}
      <h4>Remaining Appointment</h4>

      {loading ? (
        <div className="loader">
          <center><BallTriangle color="#007BFF" width={1500} size={100} loading={loading}></BallTriangle></center>
          <center><p>Loading...</p></center>
        </div>
      ) : (
        <table class="table">
          <thead class="table-success">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Disease</th>
              <th>Status</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody>
            {myAppointment.map((item) => {
              var currentDate = new Date();
              var day = String(currentDate.getDate()).padStart(2, '0'); ;
              var month = String(currentDate.getMonth()+1).padStart(2, '0');
              var year = currentDate.getFullYear();
              var date = year + "-" + month + "-" + day;
              console.log(date);
              if (
                 item.bookingDate >= date &&
                item.appointmentStatus === "Pending"
              ) {
                return (
                  <tr>
                    <td>{item.bookingDate}</td>
                    <td>{item.TimeSlot}</td>
                    <td>{item.appointmentDiseases}</td>
                    <td>{item.appointmentStatus}</td>
                    <td>
                      <button
                        type="submit"
                        class="btn btn-danger"
                        onClick={(e) => {
                          deleteMyAppointment(item);
                          refresh(e);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    
                   
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PatientAppointmentBook;
