import img1 from "../../image/Medical prescription-bro.png";
import PatientNavbar from "./PatientNavbar";
import "../../css/appointmentbook.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { BallTriangle } from 'react-loader-spinner';
function PatientAppointmentHistory() {
  const navigate = useNavigate();
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
      // navigate("/doctorConfirmAppointments");
      //window.location.reload();
      getMyAppointment(); // changed
      navigate("/patientHome");
      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <PatientNavbar></PatientNavbar>

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
            var day = String(currentDate.getDate()).padStart(2, '0');
            var month = String(currentDate.getMonth() + 1).padStart(2, '0');
            var year = currentDate.getFullYear();
            var date = year + "-" + month + "-" + day;
            console.log(date);
            if (
              item.bookingDate <= date &&
              item.appointmentStatus === "Completed"
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
                      onClick={() => deleteMyAppointment(item)}
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

export default PatientAppointmentHistory;
