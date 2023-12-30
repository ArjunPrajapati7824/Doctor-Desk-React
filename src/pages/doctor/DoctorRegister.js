function DoctorRegister() {
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

              <a className="navbar-brand d-none d-lg-block" href="index.html">
                Doctor Desk
                <strong className="d-block">Health Specialist</strong>
              </a>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/doctorLogin">Login</a>
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

                  <form className="px-md-2" action="" method="post">

                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">Name</label>
                      <input type="text"
                        className="form-control"
                        placeholder="Enter Your name"
                        name="name"
                        required />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Enter your phone number"
                        name="Phonenumber"
                        pattern="[6-9]\d{9}"
                        title="Incorrect Mobile Number"
                        maxlenght="10"
                        required />
                    </div>

                    <div className="form-outline mb-4">
                      <label for="email">Email</label>
                      <input type="email" className="form-control"
                        id="email"
                        pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
                        name="email"
                        placeholder="Enter email" />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">Clinic Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Clinic Name"
                        name="clinic_name"
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">Clinic Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Clinic Address"
                        name="city_Address"
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">Specializaion</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Specializaion"
                        name="specialization"
                        required
                      />
                    </div>


                    <div className="form-outline mb-4">
                      <label for="password">Password</label>
                      <input type="password" className="form-control" id="password" name="password" pattern="(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,}" title="Invalid Pattern" placeholder="Enter password" />
                    </div>
                    <div className="form-outline mb-4">
                      <label for="confirmPassword">Confirm Password</label>
                      <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" />
                    </div>
                    <button type="submit" className="btn btn-success btn-lg mb-1">Submit</button>
                  </form>

                </div>
              </div>
            </div>
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
                  Sunday : Closed
                </li>

                <li className="list-group-item d-flex">
                  Monday, Tuesday - Firday
                  <span>8:00 AM - 3:30 PM</span>
                </li>

                <li className="list-group-item d-flex">
                  Saturday
                  <span>10:30 AM - 5:30 PM</span>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-6 col-12 my-4 my-lg-0">
              <h5 className="mb-lg-4 mb-3">Our Clinic</h5>

              <p><a href="mailto:hello@company.co">hello@company.co</a></p>

              <p>123 Digital Art Street, San Diego, CA 92123</p>
            </div>

            <div className="col-lg-3 col-md-6 col-12 ms-auto">
              <h5 className="mb-lg-4 mb-3">Socials</h5>

              <ul className="social-icon">
                <li><a href="#" className="social-icon-link bi-facebook"></a></li>

                <li><a href="#" className="social-icon-link bi-twitter"></a></li>

                <li><a href="#" className="social-icon-link bi-instagram"></a></li>

                <li><a href="#" className="social-icon-link bi-youtube"></a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-12 ms-auto mt-4 mt-lg-0">
              <p className="copyright-text">Copyright © Medic Care 2021
                Design: <a href="https://templatemo.com" target="_parent">TemplateMo</a></p>
            </div>

          </div>
        </div>
      </footer>

    </div>
  )
}

export default DoctorRegister;