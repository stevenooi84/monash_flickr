import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {useNavigate} from "react-router-dom";
import { Grid, Button, Typography , FormGroup, Input } from '@mui/material';
import { putApi } from '../utils/api';
import { sha256 } from '../utils/encrypt';
import * as carouselAction from '../actions/carousel';

function CreateAccount(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  function validate() {
    let message = '';
    
    if(password !== confirmPassword) {
      message += 'Password does not match\n';
    }
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
      putApi('/user', {
        email,
        password: encryptedPassword
      }).then(response => {
        if (!response.ok) {
            throw Error(response.err);
        }
        navigate('/search');
      }).catch(err => {
        alert('Could not create user. Please check if user already exists')
      })
    }
  }

  return (
    <div>
      <Typography className="title" variant="h5">
        Create Account
      </Typography>
      <FormGroup style={{padding:20}}>
        <Grid container direction="column" justify="flex-start" alignItems="flex-start" spacing={1} >
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
          <Grid container spacing={1}>
            <Grid item xs={6}>    
              <Typography variant="subtitle1" className="label">Confirm Password</Typography >
            </Grid>
            <Grid item xs={6}>    
              <Input aria-describedby="confirm password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </Grid>
          </Grid>
          <Grid container spacing={1} className="footer">
            <Grid item xs={12}>    
              <Button type="button" color='primary' onClick={onSubmit}> Submit </Button>
            </Grid>
          </Grid>
        </Grid>
      </FormGroup>  
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);