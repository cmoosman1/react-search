import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField } from "@material-ui/core/";
import { setCurrentUserData } from '../appStore/actions';
import { store } from '../appStore/store';
import _ from 'lodash';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 10,
        padding: 15
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
  }));

  
export default function Search(){
    const classes = useStyles();
    const [searchterm, setSearchterm] = useState('');
    
    const handleChange = event => {
        setSearchterm(event.target.value);
    }

    const handleSearch = () => {
        setSearchterm('');
        const userStore = store.getState();
        let searchResults = stripLinksObj(userStore.setCurrentUserData)
        console.log('Stripped out _link Arr: ', userStore);
        
        searchResults =  searchResults.filter((obj)=>{
                return Object.keys(obj).reduce((acc, curr)=>{
                    return acc ||  obj[curr].toLowerCase().includes(searchterm.toLowerCase());
                }, false);
           })

       console.log('filtered\n', searchResults);
       store.dispatch(setCurrentUserData(searchResults));
    }

    const stripLinksObj = (arr) => {
        let userArr = [];
        arr.some(element => {
            var result = {};
            for (let key in element) {
                if (element.hasOwnProperty(key) && key != '_links') {
                    result[key] = element[key];
                }
            }
            userArr.push(result);
        });
        return userArr;
    }
    

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <h3>Search System Users</h3>
                </Grid>
                <Grid item xs={3} style={{ paddingLeft: '10%' }}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField 
                            id="outlined-basic" 
                            label="Search System Users" 
                            variant="outlined" 
                            onChange={handleChange}
                            value={searchterm}
                        />
                    </form>
                </Grid>
                <Grid item xs={3} style={{paddingTop: '36px', paddingLeft: 'unset'}}>
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        style={{  height: '55px', width: '120px'}}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        </div>
      );
}