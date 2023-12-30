import React from 'react'
import image1 from '../../image/portrait-successful-mid-adult-doctor-with-crossed-arms.jpg'
import image2 from '../../image/female-doctor-with-presenting-hand-gesture.jpg'
import image3 from '../../image/medium-shot-man-getting-vaccine.jpg'
import PatientNavbar from './PatientNavbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function PatientHome({ updatePatient,updatePatientToken }) {
  return (

    <div>
      <PatientNavbar updatePatient={updatePatient} updatePatientToken={updatePatientToken}></PatientNavbar>
      <section className="hero" id="hero">
        <div className="container">

          <div className="row">
            <div className="col-12">
              <div id="myCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={image1} className="img-fluid" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src={image2} className="img-fluid" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src={image3} className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
              <div className="heroText d-flex flex-column justify-content-center">
                <h1 className="mt-auto mb-2">
                  Better
                  <div className="animated-info">
                    <span className="animated-item">health</span>
                    <span className="animated-item">days</span>
                    <span className="animated-item">lives</span>
                  </div>
                </h1>
                <p className="mb-4">Good health is the cornerstone of a fulfilling life. Through exercise, balanced nutrition, and self-care, we can nurture our physical and mental well-being. Prioritizing preventive measures and seeking support when needed allows us to lead healthier, happier lives.</p>
                <div className="heroLinks d-flex flex-wrap align-items-center">
                  <a className="custom-link me-4" href="#about" data-hover="Learn More">Learn More</a>
                  <p className="contact-phone mb-0"><i className="bi-phone"></i>+91-7201914901</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <h2 className="mb-lg-3 mb-3">Meet Dr. Arjun Prajapati</h2>
              <p>Protect yourself and others by wearing masks and washing hands frequently. Outdoor is safer than indoor for gatherings or holding events. People who get sick with Coronavirus disease (COVID-19) will experience mild to moderate symptoms and recover without special treatments.</p>
              <p>You can feel free to use this CSS template for your medical profession or health care related websites. You can <a rel="nofollow" href="http://paypal.me/templatemo" target="_blank">support us a little</a> via PayPal if this template is good and useful for your work.</p>
            </div>
            <div className="col-lg-4 col-md-5 col-12 mx-auto">
              <div className="featured-circle bg-white shadow-lg d-flex justify-content-center align-items-center">
                <p className="featured-text"><span className="featured-number">12</span> Years<br /> of Experiences</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-6 ps-0">
              <img src={image2} className="img-fluid galleryImage" alt="get a vaccine" title="get a vaccine for yourself" />
            </div>
            <div className="col-lg-6 col-6 pe-0">
              <img src={image3} className="img-fluid galleryImage" alt="wear a mask" title="wear a mask to protect yourself" />
            </div>
          </div>
        </div>
        <ToastContainer />

      </section>

      <section className="section-padding pb-0" id="reviews">
        <div className="container">
          <div className="row">
            {/* You can add your review components here */}
          </div>
        </div>
      </section>

      <footer className="site-footer section-padding" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 me-auto col-12">
              <h5 className="mb-lg-4 mb-3">Opening Hours</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex">
                  Monday - Friday <br></br>
                  9:00 AM - 12:30 PM<br></br>
                  4:00 PM - 7:30 PM
                </li>

              </ul>
            </div>
            <div className="col-lg-2 col-md-6 col-12 my-4 my-lg-0">
              <h5 className="mb-lg-4 mb-3">Our Clinic</h5>
              <p>Parasnagar</p>
            </div>
            <div className="col-lg-3 col-12 ms-auto mt-4 mt-lg-0">
              <p className="copyright-text">Copyright © Docotr Desk 2023 </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PatientHome