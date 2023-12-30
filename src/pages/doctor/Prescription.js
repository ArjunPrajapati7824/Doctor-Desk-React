// import { addmedicine } from '../../css/addmedicine.js'
// import '../../css/addmedicine.css'
import React, { useState } from 'react';
import { NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";
import { saveAs } from 'file-saver';
import axios from "axios";

function Prescription() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        patientName: '',
        patientNumber: null,
        patientAge: null,
        MedicineName: '',
        Dosage: '',
        Duration: '',
        specialIntro: '',
        MedicineName2: '',
        Dosage2: '',
        Duration2: '',
        specialIntro2: '',
        MedicineName3: '',
        Dosage3: '',
        Duration3: '',
        specialIntro3: '',
    });

    const location = useLocation();
    console.log(location.state.item)
    const patient = location.state.item;
    console.log(patient);
    const patientName = patient.patient.patientName;
    const patientNUmber = patient.patient.patientPhoneNumber;
    const patientAge = patient.patient.patientAge;
    const _id = patient._id
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
    };


    const createAndDownloadPdf = async () => {
        console.log("Data", data);
        axios
            .post('http://localhost:8888/create-pdf', data)
            .then((res) => {
                // const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                // saveAs(pdfBlob, 'newPdf.pdf');
                let token = localStorage.getItem("DoctorToken");
                token = JSON.parse(token);
                try {
                    const headers = { headers: { Authorization: `Bearer ${token}` } };
                    const response = axios.put(
                        `http://localhost:8888/doctor/doneAppointment/${_id}`,
                        headers
                    );
                    navigate("/doctorConfirmAppointments");

                    console.log(response);
                } catch (error) {
                    console.log("error", error);
                }
                console.log(res);
            });
    };


    // var counter = 1
    // function addmedicine() {
    //     counter++;


    //     let fr = document.getElementById("frm").innerHTML

    //     document.getElementById("counter").innerText = "Medicines:" + counter
    //     document.getElementById("tableArea").innerHTML = fr


    // }


    return (
        <div>
            <section class="h-100 h-custom">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-lg-8 col-xl-6">
                            <div class="card rounded-3">

                                <div class="card-body p-4 p-md-5">

                                    <h1>Prescription Form</h1>


                                    <div class="form-group">
                                        <label for="patientNamxe">Patient Name:</label>
                                        <input type="text" class="form-control"
                                            id="patientNamxe"
                                            name="patientName"
                                            onChange={handleChange}

                                            // value={patient.patient.patientName}
                                            required /><br />
                                    </div>




                                    <div class="form-group">
                                        <label for="patientPhoneNumber">Patient Phone Number:</label>
                                        <input type="tel" class="form-control"
                                            id="patientPhoneNumber"
                                            name="patientNumber"
                                            onChange={handleChange}
                                            // value={patientNUmber}
                                            required
                                        /><br />
                                    </div>


                                    <h2 id="counter"> Medicines:1</h2>


                                    <label for="medication1Name">Medication 1 Name:</label>
                                    <input type="text" class="form-control"
                                        onChange={handleChange}
                                        id="medication1Name"
                                        name="MedicineName"
                                        required
                                        placeholder='Medicine Name' /><br />



                                    <div class="form-group">
                                        <label for="medication1Dosage">Frequency:</label>
                                        <input type="text" class="form-control"

                                            onChange={handleChange} id="Dosage"
                                            name="Dosage" required
                                            placeholder='1-0-1' />
                                        {/* <select name="Dosage" id="exampleFormControlTextarea1"
                                            onChange={setData}
                                            rows="3"
                                            value={data.Dosage}
                                            style={{ padding: 5 }}
                                        >
                                            <option>0-0-0</option>
                                            <option value="1-0-0">1-0-0</option>
                                            <option value="1-0-1">1-0-1</option>
                                            <option value="0-1-0">0-1-0</option>
                                            <option value="0-0-1">0-0-1</option>
                                            <option value="1-1-1">1-1-1</option>
                                            <option value="0-1-1">0-1-1</option>
                                          


                                        </select> */}
                                        <br />
                                    </div>



                                    <div class="form-group">
                                        <label for="medication1Duration">Duration:</label>
                                        <input type="text" id="medication1Duration"
                                            class="form-control"
                                            onChange={handleChange} name="Duration" required
                                            placeholder='1 day /1 week / 15 days ' /><br />

                                    </div>


                                    <div class="form-group">
                                        <label for="specialInstructions">Special Instructions:</label>
                                        <textarea id="specialInstructions"
                                            onChange={handleChange}
                                            class="form-control" name="specialIntro"
                                            placeholder='Before lunch/After Lunch' rows="2"></textarea><br />
                                    </div>
                                    <br></br>
                                    <h2 id="counter"> Medicines:2</h2>


                                    <label for="medication1Name">Medication 2 Name:</label>
                                    <input type="text" class="form-control"
                                        onChange={handleChange}
                                        id="medication1Name"
                                        name="MedicineName2" required placeholder='Medicine Name' /><br />



                                    <div class="form-group">
                                        <label for="medication1Dosage">Frequency:</label>
                                        <input type="text" class="form-control"
                                            onChange={handleChange} id="Dosage"
                                            name="Dosage2" required
                                            placeholder='1-0-1' /><br />
                                    </div>



                                    <div class="form-group">
                                        <label for="medication1Duration">Duration:</label>
                                        <input type="text" id="medication1Duration"
                                            class="form-control"
                                            onChange={handleChange} name="Duration2"
                                            placeholder='1 day /1 week / 15 days ' required /><br />

                                    </div>


                                    <div class="form-group">
                                        <label for="specialInstructions">Special Instructions:</label>
                                        <textarea id="specialInstructions"
                                            onChange={handleChange}
                                            class="form-control" name="specialIntro2" rows="2"
                                            placeholder='Before lunch/After Lunch'></textarea><br />
                                    </div>

                                    <h2 id="counter"> Medicines:3</h2>


                                    <label for="medication1Name">Medication 2 Name:</label>
                                    <input type="text" class="form-control"
                                        onChange={handleChange}
                                        id="medication1Name"
                                        name="MedicineName3" required placeholder='Medicine Name' /><br />



                                    <div class="form-group">
                                        <label for="medication1Dosage">Frequency:</label>
                                        <input type="text" class="form-control"
                                            onChange={handleChange} id="Dosage"
                                            name="Dosage3" required
                                            placeholder='1-0-1' /><br />
                                    </div>



                                    <div class="form-group">
                                        <label for="medication1Duration">Duration:</label>
                                        <input type="text" id="medication1Duration"
                                            class="form-control"
                                            onChange={handleChange} name="Duration3"
                                            placeholder='1 day /1 week / 15 days ' required /><br />

                                    </div>


                                    <div class="form-group">
                                        <label for="specialInstructions">Special Instructions:</label>
                                        <textarea id="specialInstructions"
                                            onChange={handleChange}
                                            class="form-control" name="specialIntro3" rows="2"
                                            placeholder='Before lunch/After Lunch'></textarea><br />
                                    </div>

                                    <input type="submit" className="btn btn-primary" onClick={() => createAndDownloadPdf()} value="Submit" />
                                    {/* <button className="btn btn-primary" onClick={addmedicine}>Add medicine</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Prescription