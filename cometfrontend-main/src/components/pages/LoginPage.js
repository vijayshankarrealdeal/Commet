import React from 'react';
import {Link} from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import axios from 'axios';
import {Button } from 'semantic-ui-react';
import { url } from '../url';
import Redirect from 'react-router/Redirect';
import './beamlogo.png';


class LoginPage extends React.Component{

state = {
  redirect:null
}

//This gets the data and sends it as a post request
submit = data => {

    //alert("username: " + data.username);
    //This calls the URL to submit the post request.
    axios({
      method:'POST',
      url:`${url}/login`,
      headers:{
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin' : '*',

        // for any axios request other than login and signup add accesstoken like this
        // 'authorizationToken':localStorage.getItem('accessToken')
      },
      data:{
        email:data.email,
        password:data.password
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
  
  //This renders the HTML code
  render(){
    if(this.state.redirect!==null){
      return (<Redirect to={this.state.redirect} />)
    }
  return(
      <div>
          <h1>Login Page</h1>
          <LoginForm submit={this.submit}/>
          <p id="status"></p>
          <p>Make a new account? Right here.</p>
          <Link to="/registration" className="button">Registration</Link>
      </div>

    );
  }
}




export default LoginPage;
