import React from 'react';
import propTypes from 'prop-types';
import {Button } from 'semantic-ui-react';
import Toggle from 'react-toggle';
import "react-toggle/style.css"

 class RegistrationForm extends React.Component {
   state = {

     //Creats an object that can store the variables
     data: {
       username: '',
       email: '',
       password: '',
       admin:'false'
     },
     loading: false,
     errors: {}
   };

   

   //Checks for the change of state and then assigns the form data to the state.
   onChange = e => this.setState({data: {...this.state.data, [e.target.name]: e.target.value}});

   onSubmit = async e => {
      e.preventDefault();
      this.setState({...this.state, loading:!this.state.loading});
      try{
        await this.props.submit(this.state.data);
        this.setState({...this.state, loading:!this.state.loading});
      }catch(err){
        console.log(err);
      }
   };

   render() {
     const {data} = this.state;

     return(

      <div>
      <form onSubmit = {this.onSubmit} >

          <label htmlFor="username"><b>Username</b></label><br/>
          <div className='ui input'>
            <input type="username" placeholder="Enter Username" id="username" name="username" value={data.username} onChange = {this.onChange} required/>
          </div>
          <br/><br/>

          <label htmlFor="email"><b>Email</b></label><br/>
          <div className='ui input'>
            <input type="email" placeholder="Enter Email" id="email" name="email" value={data.email} onChange = {this.onChange} required/>
          </div>
          <br/><br/>

          <label htmlFor="password"><b>Password</b></label><br/>
          <div className='ui input'>
            <input type="password" placeholder="Enter Password" id="password" name="password" value={data.password} onChange = {this.onChange} required/>
          </div>
          <br/><br/>
          <label htmlFor="admin"><b>Would you like to register as an Admin?</b></label><br/>
          <Toggle
            defaultChecked={this.state.admin}
            name='admin'
            value='true' onChange = {this.onChange}/><br/>
          <button disabled={this.state.loading} type="submit" className="button">Register</button>
      </form>
    </div>

     );
    }
}

 RegistrationForm.propTypes = {
   submit: propTypes.func.isRequired
 };

 export default RegistrationForm;
