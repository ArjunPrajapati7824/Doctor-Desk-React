import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
function DoctorPatient({ updateDoctor, updateDoctorToken }) {
    const [allPatients, setAllPatients] = useState([]);
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
        getAllPatients();
    }, []);
    const getAllPatients = async () => {
        let token = localStorage.getItem("DoctorToken");
        token = JSON.parse(token);
        try {
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get("http://localhost:8888/doctor/allPatients", headers);
            console.log(response);
            if (response) {
                setAllPatients(response.data)
            }
        } catch (error) {
            console.log('error', error);
        }
    }
    return (
        <div>
            <main>
                <nav className="navbar navbar-expand-lg bg-light fixed-top shadow-lg">
                    <div className="container">
                        <a className="navbar-brand mx-auto d-lg-none" href="index.html">
                            Doctor Desk
                            <strong className="d-block">Health Specialist</strong>
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav mx-auto">
                                <a className="navbar-brand d-none d-lg-block" href="/home">
                                    Doctor Desk
                                    <strong className="d-block">Health Specialist</strong>
                                </a>
                                <li className="nav-item ">
                                    <a className="nav-link" href="/doctorAppointments">Pending Appointments</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/doctorConfirmAppointments">Confirm Appointments</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/doctorPatient">Patients</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/doctorProfile">
                                        My Profile
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/doctor" onClick={() => { updateDoctor({}); updateDoctorToken({}) }}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <section style={{ padding: "15px" }}>
                    {loading ? (
                        <div className="loader">
                            <center><BallTriangle color="#007BFF" width={1500} size={100} loading={loading}></BallTriangle></center>
                            <center><p>Loading...</p></center>
                        </div>
                    ) : (
                        <table className="table">
                            <thead className="table-success">
                                <tr>
                                    <th>Patient Name</th>
                                    <th>Contact Number</th>
                                    <th>Email id</th>
                                    <th>Gender</th>
                                    <th>Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allPatients.map((item) => {
                                        console.log('item', item);
                                        return (
                                            <tr>
                                                <td>{item.patientName}</td>
                                                <td>{item.patientPhoneNumber}</td>
                                                <td>{item.patientEmail}</td>
                                                <td>{item.patientGender}</td>
                                                <td>{item.patientAge}</td>
                                            </tr>
                                        )

                                    })
                                }

                            </tbody>
                        </table>
                    )}
                </section>
            </main>
        </div>
    )
}

export default DoctorPatient;