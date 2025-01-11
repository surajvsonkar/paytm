import React from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';

const SignUp = () => {
	return (
		<div className="bg-slate-300 h-screen flex justify-center">
			<div className="flex flex-col justify-center">
                <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                    <Heading label={"Sign Up"}/>
                    <SubHeading label={"Enter your information to create an account"}/>
                    <InputBox placeholder={"John"} label={"First Name"}/>
                    <InputBox placeholder={"Doe"} label={"Last Name"}/>
                    <InputBox placeholder={"suraj@gmail.com"} label={"Email"}/>
                    <InputBox placeholder={"123456"} label={"Password"}/>
                    <div className='pt-4'>
                        <Button label={"Sign Up"} />
                    </div>
                    <BottomWarning/>
                </div>
            </div>
		</div>
	);
};

export default SignUp;
