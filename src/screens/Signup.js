import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import '../styles/Login.css'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const nameRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  return (
    <div>
      <section className="ftco-section">
        <div className={`toast ${error ? 'show' : ''}`} id="toast">
          <div class="toast-header">
          <strong class="me-auto">Error</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
          </div>
          <div className="toast-body">
            <div>
              {error}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                  <div className="text w-100">
                    <h2>Welcome to Sign Up</h2>
                    <p>Already have an account?</p>
                    <Link className="btn btn-white btn-outline-white" to="/login">Sign In</Link>
                  </div>
                </div>
                <div className="login-wrap p-4 p-lg-5">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4 text-dark">Register</h3>
                    </div>
                  </div>
                  <form onSubmit="" action="#" className="signin-form">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="name">Username</label>
                      <input ref={nameRef} type="text" className="form-control" placeholder="Username" required />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="email">Email</label>
                      <input ref={emailRef} type="email" className="form-control" placeholder="Username" required />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="password">Password</label>
                      <input ref={passwordRef} type="password" className="form-control" placeholder="Password" required />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="password">Confirm Password</label>
                      <input ref={passwordConfirmRef} type="password" className="form-control" placeholder="Password" required />
                    </div>
                    <div className="form-group">
                      <button disabled={loading} type="submit" id="register" className="form-control btn btn-primary submit px-3">{loading ? 'Processing...' : 'Register'}</button>
                    </div>
                    <div className="form-group d-md-flex mt-3">
                      <div className="w-50 text-left">
                        <label className="checkbox-wrap checkbox-primary mb-0">Admin
                          <input type="radio" name="choice" defaultValue="admin" defaultChecked />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="w-50 text-left">
                        <label className="checkbox-wrap checkbox-primary mb-0">Candidate
                          <input type="radio" name="choice" defaultValue="candidate" />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
