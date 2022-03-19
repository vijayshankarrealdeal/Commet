import React from 'react';
import {Link} from "react-router-dom";
import RegistrationForm from "../forms/RegistrationForm";
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import { url } from '../url';
import { Router } from 'react-router';
import Redirect from 'react-router/Redirect';

// import browse

class RegistrationPage extends React.Component{

state = {
  redirect:null
}

//Gets the data and sumbits it for a post request
submit = async data => {
  console.log('axios submit');
  axios({
    method:'POST',
    url:`${url}/register`,
    headers:{
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
    },
    data:{
      name:data.username,
      email:data.email,
      password:data.password,
      admin:data.admin
    }
  }).then(res=>{
    return res.data
  }).then(res=>{
    console.log(res)
    if(res.response==false)
      return;
    localStorage.setItem('accessToken',res.accessToken);
    this.setState({...this.state,redirect:'/landing'})
  });
};



render(){
  if(this.state.redirect!==null){
    return (<Redirect to={this.state.redirect} />)
  }
  return(
    <div align="top">
      <h1>Registration Page</h1>
      <RegistrationForm  submit={this.submit}/>
        <p id="status"></p>
        <Link to="/" className="button">Back to Home</Link>
    </div>

  );

}

}

export default RegistrationPage;
