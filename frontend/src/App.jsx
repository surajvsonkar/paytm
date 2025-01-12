import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { SendMoney } from './pages/SendMoney';
import { Dashboard } from './pages/Dashboard';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>

      {/* To redirect from the index route ('/') to the sign-up route ('/signup'), you can use the Navigate component from react-router */}

				<Route path="/" element={<Navigate to="/signup" />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/send" element={<SendMoney />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
