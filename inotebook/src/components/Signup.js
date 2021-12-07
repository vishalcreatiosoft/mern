import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Signup = (props) => {

    const [credentials, setcredentials] = useState({name : "", email : "", password : "", cpassword : ""});
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save the token and redirect to home
            localStorage.setItem('token', json.authToken);
            navigate('/login');
            props.showAlert('Account Created Successfully', 'success');

        }else{
            props.showAlert('Invalid Details','danger');
        }


    }
    const onChange = (e)=>{
        setcredentials({...credentials, [e.target.name] : e.target.value});
    }


    return (
        <div className="container my-3">
            <h2>Create Account here </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} minLength={5} required aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} minLength={5} required aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}
