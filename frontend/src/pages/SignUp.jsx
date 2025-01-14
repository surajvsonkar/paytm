import React, { useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import axios from 'axios';
import { useNavigate } from 'react-router';

const SignUp = () => {

    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
	return (
		<div className="bg-slate-300 h-screen flex justify-center">
			<div className="flex flex-col justify-center">
                <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                    <Heading label={"Sign Up"}/>
                    <SubHeading label={"Enter your information to create an account"}/>
                    <InputBox onchange={(e)=> {
                        setFirstName(e.target.value)
                    }} placeholder={"John"} label={"First Name"}/>
                    <InputBox onchange={(e)=> {
                        setLastName(e.target.value)
                    }} placeholder={"Doe"} label={"Last Name"}/>
                    <InputBox onchange={(e)=>{
                        setUsername(e.target.value)
                    }} placeholder={"suraj@gmail.com"} label={"Email"}/>
                    <InputBox type='password' onchange={(e)=> {
                        setPassword(e.target.value)
                    }} placeholder={"123456"} label={"Password"}/>
                    <div className='pt-4'>
                        <Button onClick={async()=> {
                            const response = await axios.post(" http://localhost:3000/api/v1/user/signup", {
                                username,
                                firstName,
                                lastName,
                                password
                            })

                            localStorage.setItem("token", response.data.userID)
                            navigate('/dashboard')
                        }} label={"Sign Up"} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"} />
                </div>
            </div>
		</div>
	);
};

export default SignUp;
