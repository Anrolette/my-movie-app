import React, { useRef, useState, Component } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../App.css";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { login, currentUser, loginGoogleRef, loginFacebookRef } = useAuth();

async function loginEmail(e){
    e.preventDefault();
    try {
        setError('')
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        history.push("/")
    } catch {
        setError('Failed to log in')
    }
    setLoading(false)
}

async function loginGoogle() {
    setError('')
    setLoading(true)
    await loginGoogleRef()
    history.push("/")
    setLoading(false)  
}

async function loginFacebook(){
    setError('')
    setLoading(true)
    await loginFacebookRef()
    history.push("/")
    setLoading(false)  
}

return (
    <div className="info-screens">
        <Card>
            <Card.Body>
            <h2 className="text-center mb-4 heading">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={loginEmail}>
            <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type='submit'>
                Log In With Email and Password
            </Button>
            <Button disabled={loading} className="w-100" onClick={loginGoogle}>
                Log In With Google
            </Button>
            <Button disabled={loading} className="w-100" onClick={loginFacebook}>
                Log In With Facebook
            </Button>
            </Form>
            <div className="w-100 text-center mt-3">
                <Link to="/forgot-password" className="link">Forgot Password?</Link>
            </div>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <span className="label">Need an account? </span><Link to="/signup" className="link">Sign Up</Link>
        </div>
    </div>
    );
}
