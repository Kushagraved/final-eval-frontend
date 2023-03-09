import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGIN, REGISTER } from '../../constants/apiEndPoints'
import { useLoading } from '../../context/LoadingContext'
import makeRequest from '../../utils/makeRequest'
import backgroundImg from '../../assets/undraw-upload-re-pasx_2023-03-09/undraw-upload-re-pasx@3x.png'
import './Auth.css'

const Auth = () => {
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmpass: '',
  }

  const navigate = useNavigate()

  // eslint-disable-next-line no-unused-vars
  const { loading, showLoading, hideLoading } = useLoading()
  const [isSignUp, setIsSignUp] = useState(false)

  const [data, setData] = useState(initialState)
  const [confirmPass, setConfirmPass] = useState(true)

  const [error, setError] = useState(null)
  console.log(error)

  // Reset Form
  const resetForm = () => {
    setData(initialState)
    setConfirmPass(confirmPass)
    setError(null)
  }

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  // Form Submission
  const handleSubmit = async (e) => {
    setConfirmPass(true)
    e.preventDefault()
    if (isSignUp) {
      if (data.password === data.confirmpass) {
        //make register api call
        let res
        try {
          // showLoading()
          res = await makeRequest(REGISTER, {
            data: {
              userName: data.username,
              email: data.email,
              password: data.password,
            },
          })
          // hideLoading()
        } catch (error) {
          if (!error.response) {
            navigate('/error')
          }
          res = error.response.data
        }
        if (res.success) {
          navigate(0)
        } else {
          // hideLoading()
          // alert(res.message)
          setError(res.message)
        }
      } else {
        setError('Confirm password is not same')
      }
    } else {
      //make login api call
      let res
      try {
        // showLoading()
        res = await makeRequest(LOGIN, {
          data: {
            email: data.email,
            password: data.password,
          },
        })
        // hideLoading()
      } catch (error) {
        console.log(error)
        if (!error.response) {
          navigate('/error')
        }
        res = error.response.data
      }

      if (res.success) {
        localStorage.setItem('token', res.token)
        navigate('/')
      } else {
        // hideLoading()
        // alert(res.message)
        setError(res.message)
      }
    }
  }
  return (
    <div className='auth'>
      <div className='auth-left'>
        <div className='heading'>
          <span>Design APIs Fast,</span>
          <span>Manage Content Easily.</span>
        </div>
        <div>
          <img src={backgroundImg}></img>
        </div>
      </div>
      <div className='auth-right'>
        <h1>Login to your CMS+ account</h1>

        <form className='infoForm authForm' onSubmit={handleSubmit}>
          <div>
            <input
              required
              type='text'
              placeholder='Email'
              className='infoInput'
              name='email'
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type='password'
              className='infoInput'
              placeholder='Password'
              name='password'
              value={data.password}
              onChange={handleChange}
            />
          </div>
          {isSignUp && (
            <div>
              <input
                required
                type='password'
                className='infoInput'
                name='confirmpass'
                placeholder='Confirm Password'
                onChange={handleChange}
              />
            </div>
          )}

          {error !== null && (
            <span
              style={{
                color: 'red',
                fontSize: '12px',
                alignSelf: 'flex-end',
                marginRight: '5px',

                fontWeight: 'bold',
              }}
            >
              {error}
            </span>
          )}
          {/* <h6>passwr fmov dwaekmae</h6> */}
          {/* {error !== null && <h6>{error}</h6>} */}
          <button className='button infoButton' type='Submit' disabled={loading}>
            {loading ? 'Loading...' : isSignUp ? 'SignUp' : 'Login'}
          </button>
          <span
            style={{
              fontSize: '16px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => {
              resetForm()
              setIsSignUp((prev) => !prev)
            }}
          >
            {isSignUp ? 'Already have an account Login' : "Don't have an account ? Sign up"}
          </span>
          <div></div>
        </form>
      </div>
    </div>
  )
}

export default Auth
