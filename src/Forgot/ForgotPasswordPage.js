import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import ResetPasswordPage from './ResetPasswordPage';
import './Forgot.css';
import Navigation from "../Nav/Navigation";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const history = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Mock API call to send reset email
        const response = await fetch('/api/request-reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        if (data.success) {
            setMessage('Check your email for a link to reset your password.');
        } else {
            setMessage('There was an error. Please try again.');
        }
    };

    return (
        <div className="container forgot-password-container">
    <Navigation />
            <h2 className="re">Forgot password?</h2>
            <h5 className="en">Enter your email address and we will send you a new password</h5>
            <form onSubmit={handleSubmit} className="ha">
                <p>
                    <label id="reset_pass_lbl" className="la">Email address</label><br/>
                    <input className="ipt"
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </p>
                <p>
                    <Link to="/ResetPasswordPage" className="pes"><button className='btre'>Reset Password</button></Link>
                </p>
            </form>
            {message && <p className="message">{message}</p>}
            <footer className='ft'>
                <p>First time? <a href="/SignIn"className="pes">Create an account</a>.</p>
                <p><a href="/" className="pes">Back to Homepage</a>.</p>
            </footer>
        </div>
    );
}