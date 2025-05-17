import { useFormik, validateYupSchema } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import { toast, Toaster } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'


const signUpSchema = Yup.object({
  email: Yup.string().email().required("email is required"),
  password: Yup.string().min(6).required("password is required"),
  role: Yup.string().oneOf(["admin", "user"]).required("role is required")

})
const initialValues = {
  email: "",
  password: "",
  role: ""
}

const Login = () => {
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

    
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log("values", values);

      const formData = new FormData()
    
      formData.append("email", values.email)
      formData.append("password", values.password)
      formData.append("role", values.role)
      console.log("form data", formData);
        
      setloading(true)
      axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true

      }).then((result) => {
        console.log(result);

        if (result.data.success) {

           dispatch(setUser(result.data.userData))
          toast.success(result.data.message)
          navigate('/home')

        }

      }).catch((err) => {
        toast.error(err.response.data.message)
      }).finally(()=>{
        setloading(false)
      })
    }

  })
  return (
    <div >
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
          <form onSubmit={handleSubmit} className="border-2 border-white rounded-2xl mt-10 mx-auto p-6 sm:p-8 bg-slate-800">
            <h1 className="mb-6 text-2xl sm:text-3xl text-cyan-500 text-center font-semibold">login</h1>
           
            <div>
              <label htmlFor="" className="text-base sm:text-lg ml-2 block">Email</label>
            </div>
            <div>

              <input
                type="text"
                placeholder='enter email'
                name='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="outline-none p-3 w-full mt-1 text-base sm:text-lg bg-slate-700 rounded-xl"
              />
              {errors.email && touched.email ? <p className='text-red-500'>{errors.email}</p> : null}
            </div>
            <div>
              <label htmlFor="" className="text-base sm:text-lg ml-2 block">pasword</label>
            </div>
            <div>

              <input type="passowrd"
                placeholder='enter name'
                name='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="outline-none p-3 w-full mt-1 text-base sm:text-lg bg-slate-700 rounded-xl"
              />
              {errors.password && touched.password ? <p className="text-red-500 text-sm mt-1">{errors.password}</p> : null}
            </div>
            <div className="flex gap-6 mb-4 flex-wrap">
              <div className="flex items-center gap-2">
                <label htmlFor="admin">Admin</label>
                <input
                  type="radio"
                  name='role'
                  value={"admin"}
                  checked={values.role === "admin"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='admin'
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="user">User</label>
                <input
                  type="radio"
                  name='role'
                  id='user'
                  value={"user"}
                  checked={values.role === "user"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.role && touched.role ? <p className="text-red-500 text-sm w-full">{errors.role}</p> : null}

              </div>
            </div>
            <div>
              {loading ? <button className='w-full mt-4 bg-slate-600 rounded-2xl p-2' type='submit'> please wait</button> : <button className='w-full mt-4 p-2 rounded-2xl bg-cyan-600 hover:bg-cyan-700' type='submit'>Submit</button>}

            </div>
            <div className='mt-3 '>
              <p className=''> have an account <Link to={'/signup'} className='text-blue-500 "text-blue-500 hover:underline"'>signup here </Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login