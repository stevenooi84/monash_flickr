import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { useNavigate } from "react-router-dom";
import { Paper, Grid, Button, FormGroup, Typography, Input } from '@mui/material';
import { getApi } from '../utils/api';
import * as carouselAction from '../actions/carousel';
import Carousel from 'react-material-ui-carousel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

function Item(props)
{
    return (
        <Paper>
            <img src={props.item} style={{height: 300, backgroundSize: 'contain'}}></img>
        </Paper>
    )
}

function Search(props) {
  const navigate = useNavigate();
  
  const [tag, setTag] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(!sessionStorage.getItem("loggedIn")) {
      navigate('/');
    }
  });

  function onSubmit() {
    getApi('/flickr',`tags=${tag}`)
    .then(response => response.json())
    .then(response => {
      props.carouselAction.fetchData(response?.images);
    }).catch(err => {
      alert(err)
    });
  }

  return (
    <div className="login">
      <Typography className="title" variant="h5">
        Search Flickr
      </Typography>
      <FormGroup>
        <Grid container direction="column" justify="flex-start" alignItems="flex-start" spacing={1}>
          <Grid container spacing={1}>
            <Grid item xs={6}>    
              <Typography variant="subtitle1" className="label">Tag</Typography >
          </Grid>
            <Grid item xs={6}>    
              <Input aria-describedby="tag" value={tag} onChange={e => setTag(e.target.value)} />
            </Grid>
          </Grid>
          <Grid container spacing={1} className="footer">
            <Grid item xs={12}>    
              <Button type="button" color='primary' onClick={onSubmit}> Search </Button>
            </Grid>
          </Grid>
        </Grid>
      </FormGroup>
        <Carousel
          NextIcon={<NavigateNextIcon style={{width:50, height:20}}/>}
          PrevIcon={<NavigateBeforeIcon  style={{width:50, height:20}}/>}>
            {
                Array.isArray(props.carousel?.images) && props.carousel.images.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      carousel: state.carouselReducer
  };
};
function mapDispatchToProps(dispatch) {
  return { carouselAction: bindActionCreators(carouselAction, dispatch)};
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);