import React, { useEffect, useState } from 'react';
import './App.css';
import PatientRegister from './pages/patient/PatientRegister'
import PatientLogin from "./pages/patient/PatientLogin";
import { Route, Routes, Outlet } from 'react-router-dom';
import PatientHome from './pages/patient/PatientHome';
import PatientProfile from './pages/patient/PatientProfile';
import PatientAppointmentBook from './pages/patient/PatientAppointmentBook';
import DoctorRegister from './pages/doctor/DoctorRegister';
import DoctorLogin from './pages/doctor/DoctorLogin';
import DoctorHome from './pages/doctor/DoctorHome';
import DoctorPatient from './pages/doctor/DoctorPatient';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorConfirmAppointments from './pages/doctor/DoctorConfirmAppointments';
import AdminDashboard from './pages/admin/AdminDashboard';
import PatientAppointmentHistory from "./pages/patient/PatientAppointmentHistory";
import Prescription from './pages/doctor/Prescription';
import AdminLogin from './pages/admin/AdminLogin';
import ViewDoctor from './pages/admin/ViewDoctor';
import DoctorProfile from "./pages/doctor/DoctorProfile";
import { ToastContainer } from 'react-toastify';
function App() {
  const [patient, setPatient] = useState({});
  const [patientToken,setPatientToken] = useState({});
  const [doctor,setDoctor] = useState({});
  const [doctorToken,setDoctorToken] = useState({});
  const [admin,setAdmin] = useState({});
  const [adminToken,setAdminToken] = useState({});

  useEffect(() => {
    setPatient(JSON.parse(localStorage.getItem("MyPatient")));
    setPatientToken(JSON.parse(localStorage.getItem("PatientToken")));
    setDoctor(JSON.parse(localStorage.getItem("Doctor")));
    setDoctorToken(JSON.parse(localStorage.getItem("DoctorToken")));
    setAdmin(JSON.parse(localStorage.getItem("Admin")));
    setAdminToken(JSON.parse(localStorage.getItem("AdminToken")));
  }, [])

  const updatePatient = (patient) => {
    localStorage.setItem("MyPatient", JSON.stringify(patient))
    setPatient(patient)
  }

  const updatePatientToken = (token)=>{
    localStorage.setItem("PatientToken",JSON.stringify(token))
    setPatientToken(token);
  }
  const updateDoctorToken = (token)=>{
    localStorage.setItem("DoctorToken",JSON.stringify(token))
    setDoctorToken(token);
  }
  const updateDoctor = (doctor)=>{
    localStorage.setItem("Doctor",JSON.stringify(doctor))
    setDoctor(doctor)
  }
  const updateAdminToken = (token)=>{
    localStorage.setItem("AdminToken",JSON.stringify(token))
    setAdminToken(token);
  }
  const updateAdmin = (admin)=>{
    localStorage.setItem("Admin",JSON.stringify(admin))
    setAdmin(admin)
  }
  return (
    <>
      <Routes>
        <Route path='/'>
          {
            patient && patient._id
              ? (<Route path='/' element={<PatientHome updatePatient={updatePatient} updatePatientToken={updatePatientToken}/>}></Route>)
              : (<Route path='/' element={<PatientLogin updatePatient={updatePatient}  updatePatientToken={updatePatientToken} />}></Route>)
          }
        </Route>
        <Route path='/doctor'>
          {
            doctor && doctor._id
              ? (<Route path='/doctor' element={<DoctorAppointments updateDoctor={updateDoctor}  updateDoctorToken={updateDoctorToken}/>}></Route>)
              : (<Route path='/doctor' element={<DoctorLogin updateDoctor={updateDoctor}   updateDoctorToken={updateDoctorToken}/>}></Route>)
          }
          
        </Route>
        <Route path='/admin'>
          {
            admin && admin._id
              ? (<Route path='/admin' element={<AdminDashboard updateAdmin={updateAdmin}  updateAdminToken={updateAdminToken}/>}></Route>)
              : (<Route path='/admin' element={<AdminLogin updateAdmin={updateAdmin}   updateAdminToken={updateAdminToken}/>}></Route>)
          }
          
        </Route>
        <Route path='/patientRegister' element={<PatientRegister updatePatient={updatePatient} updatePatientToken={updatePatientToken}></PatientRegister>}></Route>
        <Route path='/patientProfile' element={<PatientProfile  updatePatient={updatePatient} updatePatientToken={updatePatientToken}></PatientProfile>}/>
        <Route path='/patientAppointment' Component={PatientAppointmentBook} />
        <Route path='/patientAppointmentHistory' Component={PatientAppointmentHistory} />
        <Route path='/patientHome' element={<PatientHome updatePatient={updatePatient} updatePatientToken={updatePatientToken}/>}></Route>
        <Route path='/' element={<PatientLogin updatePatient={updatePatient} updatePatientToken={updatePatientToken}/>}></Route>
        
        
        <Route path='/doctorRegister' Component={DoctorRegister} />
        <Route path='/doctor' Component={DoctorLogin} />
        <Route path='/doctorHome' element={<DoctorAppointments updateDoctor={updateDoctor}  updateDoctorToken={updateDoctorToken}/>}  />
        <Route path='/doctorPatient' element={<DoctorPatient updateDoctor={updateDoctor}  updateDoctorToken={updateDoctorToken}/>} />
        <Route path='/doctorAppointments' Component={DoctorAppointments} />
        <Route path='/doctorConfirmAppointments' element={<DoctorConfirmAppointments updateDoctor={updateDoctor}  updateDoctorToken={updateDoctorToken}/>} />
        <Route path='/makePrescription' element={<Prescription updateDoctor={updateDoctor}  updateDoctorToken={updateDoctorToken}/>} />
        <Route path='/doctorProfile' element={<DoctorProfile updateDoctor={updateDoctor}  updateDoctorToken={updateDoctorToken}/>} />


        <Route path='/adminDashboard' Component={AdminDashboard} />
        <Route path='/admin' Component={AdminLogin} />
        <Route path='/viewDoctor' element={<ViewDoctor  updateAdmin={updateAdmin}   updateAdminToken={updateAdminToken}></ViewDoctor>} />
      </Routes>
    </>
  );
}

export default App;
