import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGIN, REGISTER } from '../../constants/apiEndPoints'
import { useLoading } from '../../context/LoadingContext'
import makeRequest from '../../utils/makeRequest'
import './Auth.css'

const Auth = () => {
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmpass: '',
  }

  const navigate = useNavigate()

  const { loading, showLoading, hideLoading } = useLoading()
  const [isSignUp, setIsSignUp] = useState(false)

  const [data, setData] = useState(initialState)

  const [confirmPass, setConfirmPass] = useState(true)

  // Reset Form
  const resetForm = () => {
    setData(initialState)
    setConfirmPass(confirmPass)
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
          showLoading()
          res = await makeRequest(REGISTER, {
            data: {
              userName: data.username,
              email: data.email,
              password: data.password,
            },
          })
          hideLoading()
        } catch (error) {
          if (!error.response) {
            navigate('/error')
          }
          res = error.response.data
        }
        if (res.success) {
          navigate(0)
        } else {
          hideLoading()
          alert(res.message)
        }
      } else {
        setConfirmPass(false)
      }
    } else {
      //make login api call
      let res
      try {
        showLoading()
        res = await makeRequest(LOGIN, {
          data: {
            email: data.email,
            password: data.password,
          },
        })
        hideLoading()
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
        hideLoading()
        alert(res.message)
      }
    }
  }
  return (
    <form className='infoForm authForm' onSubmit={handleSubmit}>
      <h3>{isSignUp ? 'Register' : 'Login'}</h3>
      {isSignUp && (
        <div>
          <input
            required
            type='text'
            placeholder='username'
            className='infoInput'
            name='username'
            value={data.username}
            onChange={handleChange}
          />
          {/* <input
            required
            type='text'
            placeholder='Last Name'
            className='infoInput'
            name='lastname'
            value={data.lastname}
            onChange={handleChange}
          /> */}
        </div>
      )}

      <div>
        <input
          required
          type='text'
          placeholder='email'
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
        {isSignUp && (
          <input
            required
            type='password'
            className='infoInput'
            name='confirmpass'
            placeholder='Confirm Password'
            onChange={handleChange}
          />
        )}
      </div>

      <span
        style={{
          color: 'red',
          fontSize: '12px',
          alignSelf: 'flex-end',
          marginRight: '5px',
          display: confirmPass ? 'none' : 'block',
        }}
      >
        *Confirm password is not same
      </span>
      <div>
        <span
          style={{
            fontSize: '12px',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          onClick={() => {
            resetForm()
            setIsSignUp((prev) => !prev)
          }}
        >
          {isSignUp ? 'Already have an account Login' : "Don't have an account Sign up"}
        </span>
        <button className='button infoButton' type='Submit' disabled={loading}>
          {loading ? 'Loading...' : isSignUp ? 'SignUp' : 'Login'}
        </button>
      </div>
    </form>
  )
}

export default Auth
