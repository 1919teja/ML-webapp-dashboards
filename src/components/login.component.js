import React, { Component } from 'react'
// import auth from './cognito_aws_auth'
import auther from './user_auth_cognito'
function check_auth(){
  console.log("function called")
  let x=document.querySelector('#email')
  let y=document.querySelector('#password')
  console.log('x',x.value)
  console.log('y',y.value)
  auther(x.value, y.value)
}


export default class Login extends Component {
  render() {
    return (
      <form>
        <h3>Sign In</h3>

        <div className="mb-3"  >
          <label>Email address</label>
          <input
            type="text" id='email'
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3"  > 
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password" id='password'
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid" id='submit' >
          <button type="button"  onClick={()=>check_auth()}  className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    )
  }
}
