import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BallTriangle } from 'react-loader-spinner';

function ViewDoctor({ updateAdmin, updateAdminToken }) {
    const navigate = useNavigate();
    const [allDoctors, setAllDoctors] = useState([]);
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
        getAllDoctors();
    }, []);

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

    const getAllDoctors = async () => {
        let token = localStorage.getItem("AdminToken");
        token = JSON.parse(token);
        try {
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(
                "http://localhost:8888/admin/allDoctors",
                headers
            );
            console.log("response", response);
            if (response) {
                setAllDoctors(response.data);
            }
        } catch (error) {
            console.log("error: ", error);
            return error;
        }
    }

    const deleteDoctor = async (item) => {
        // console.log(item);
        const id = item._id;
        let token = localStorage.getItem("AdminToken");
        token = JSON.parse(token);
        try {
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.delete(
                `http://localhost:8888/admin/deleteDoctor/${id}`,
                headers
            );
            // navigate("/doctorConfirmAppointments");
            //window.location.reload();
            console.log(response);
            getAllDoctors(); // changed
        } catch (error) {
            console.log("error", error);
        }
    
    }
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
            {
                loading ? (<div className="loader">
                    <center><BallTriangle color="#007BFF" width={1500} size={100} loading={loading}></BallTriangle></center>
                    <center><p>Loading...</p></center>
                </div>) : (
                    <table class="table">
                        <thead class="table-success">
                            <tr>
                                <th>Doctor Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Clinic Name</th>
                                <th>Clinic Address</th>
                                <th>Registration Number</th>
                                <th>Specialization</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {allDoctors.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.doctorName}</td>
                                        <td>{item.doctorEmail}</td>
                                        <td>{item.doctorPhoneNumber}</td>
                                        <td>{item.clinicName}</td>
                                        <td>{item.clinicAdd}</td>
                                        <td>{item.doctorRegistrationNo}</td>
                                        <td>{item.doctorSpecialization}</td>
                                        <td>
                                            <button
                                                type="submit"
                                                class="btn btn-danger"
                                                onClick={()=>{deleteDoctor(item)}}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );

                            })}
                        </tbody>
                    </table>
                )
            }
        </div>)
}


export default ViewDoctor