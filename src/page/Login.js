import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { useNavigate } from "react-router-dom";
import { Grid, Button, Typography , FormGroup, Input, FormHelperText } from '@mui/material';
import { postApi } from '../utils/api';
import { sha256 } from '../utils/encrypt';
import './Login.css';
import * as carouselAction from '../actions/carousel';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  function validate() {
    let message = '';
    if(email === '') {
      message += 'Email cannot be empty\n';
    }
    if(password === '') {
      message += 'Password cannot be empty\n';
    }
    return message;
  }

  async function onSubmit() {
    const message = validate();
    if (validate() !== '') {
      alert(message);
    } else {
      const encryptedPassword = await sha256(password);
      postApi('/login', {
        email,
        password: encryptedPassword
      }).then(response => {
        if (!response.ok) {
            throw Error("Login unsuccessful");
        }
        sessionStorage.setItem("loggedIn", true);
        navigate('/search');
      }).catch(err => {
        alert(err.message)
      })
    }
  }

  return (
    <div className="login">
      <Typography className="title" variant="h5">
        Application Login
      </Typography>
      <FormGroup>
        <Grid container direction="column" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid container spacing={1}>
            <Grid item xs={6}>    
              <Typography variant="subtitle1" className="label">Email address</Typography >
          </Grid>
            <Grid item xs={6}>    
              <Input aria-describedby="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>    
              <Typography variant="subtitle1" className="label">Password</Typography >
            </Grid>
            <Grid item xs={6}>    
              <Input aria-describedby="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Grid>
          </Grid>
          <Grid container spacing={1} className="footer">
            <Grid item xs={12}>    
              <Button type="button" color='primary' onClick={onSubmit}> Submit </Button>
            </Grid>
          </Grid>
        </Grid>
      </FormGroup>
      <a href='/createAccount'> Create Account </a>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      data: state
  };
};
function mapDispatchToProps(dispatch) {
  return { carouselAction: bindActionCreators(carouselAction, dispatch)};
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);