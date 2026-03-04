import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
// import { Button, Input, Logo } from './index'
import Button from "./Button"
import Input from "./Input"
import Logo from "./Logo"
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form'


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
const emailRegister = register("email", { required: true })
const passwordRegister = register("password", { required: true })

    const handlelogin = async (data) => {//change login to handlelogin
        setError("")
        try {
            const session = await authService.login(data)

            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin({userData}));//add curly braces
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }


    return (
        <div className="flex items-center justify-center w-full m-5">
            <div className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10`}>

                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%"></Logo>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to Your account
                </h2>
                <p className=" mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account? &nbsp;
                    <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">

                        Signup</Link>
                </p>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit(handlelogin)} className="mt-8">
                     <div className="space-y-5">
                        {/* <Input
                            label="Email: " placeholder="Enter your email" type="email" {...register("email", {
                                required: true, validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.
                                        test(value) || "Email address must be a valid address"
                                }
                            })}>

                        </Input>
                        <Input label="Password:"
                            type="password"
                            placeholder="Enter your Password"
                            {...register("password", {
                                required: true,
                            })}
                        >  </Input> */} 
                        <Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  name={emailRegister.name}
  onChange={emailRegister.onChange}
  onBlur={emailRegister.onBlur}
  ref={emailRegister.ref}
/>

<Input
  label="Password"
  type="password"
  placeholder="Enter your Password"
  name={passwordRegister.name}
  onChange={passwordRegister.onChange}
  onBlur={passwordRegister.onBlur}
  ref={passwordRegister.ref}
/>
                        <Button
                            type="submit" className="w-full font-medium text-primary transition-all duration-200 hover:underline">Sign in
                        </Button>
                    </div>
                </form>
                {/* <form className="mt-8">
    <div>
        TEST LOGIN PAGE
    </div>
</form> */}
            </div>
        </div>)
}

export default Login