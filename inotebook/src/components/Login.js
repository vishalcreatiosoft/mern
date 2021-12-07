import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = (props) => {

    const [credentials, setcredentials] = useState({email : "", password : ""})
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({email : credentials.email, password : credentials.password})
        });
        const json = await response.json();
        console.log(json);
        
        if(json.success){
            //save the token and redirect to home
            localStorage.setItem('token', json.authToken);
            props.showAlert('Logged in Successfully','success');
            navigate('/');
        }else{
            props.showAlert('Invalid Credentials', 'danger');
        }


    }
    const onChange = (e)=>{
        setcredentials({...credentials, [e.target.name] : e.target.value});
    }



    return (
        <div className="mt-3">
            <h2 className="mt-3">Login here </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label my-3">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" name="password" className="form-control" onChange={onChange} value={credentials.password}/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
