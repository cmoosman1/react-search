import React, {useCallback, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActionArea, CardActions, CardContent, Grid, Typography} from '@material-ui/core';
import userAPI from '../api/usersApi';
import { setCurrentUserData } from '../appStore/actions';
import { store } from "../appStore/store/index";

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

  
export default function SearchGrid(){
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState();
    const [searchUpdate, setSearchUpdate] = useState(false);
    const [updatedUser, setUpdatedUser] = useState([{}]);

    const fetchUsers = useCallback(() => {
        userAPI
          .getSystemUsers()
          .then(res => {
            const userList = res.data;
            setUserInfo(userList.result);
            setIsLoading(false);
            store.dispatch(setCurrentUserData(userList.result));
          })
          .catch(err => {
            console.log(err); 
            setIsLoading(false);
          });
      }, []);
    
      useEffect(() => {
        fetchUsers(); 
      }, [fetchUsers]);

      store.subscribe(() => {
          const users = store.getState().setCurrentUserData;
          if(users.length <= 1){
            setSearchUpdate(true);
            setUpdatedUser(users[0]);
            console.log('Updated user: ', updatedUser);
          }
      });

    const SearcResult = ({updatedUser}) => {
      return(
        <div>
          <h3>Search Result:</h3>
          <Card className={classes.root}>
              <CardActionArea>
                  <img
                  className={classes.media}
                  src="http://via.placeholder.com/503x150"
                  alt="People"
                  />
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                      {updatedUser.first_name} {updatedUser.last_name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                      {updatedUser.address}
                  </Typography>
                  </CardContent>
              </CardActionArea>
              <CardActions>
                  <a  href={updatedUser.email} target="_blank" size="small" color="primary">
                  Email: 
                  </a>  
                  <a  href={updatedUser.website} target="_blank" size="small" color="primary">
                  Website: 
                  </a>  
              </CardActions>
          </Card>
        </div>
      )
    }
    return (
        <div className={classes.root}>
          {searchUpdate && (
            <SearcResult updatedUser={updatedUser}/>
          )}
            <h3>Current System Users</h3>
            {!isLoading && (
            <Grid container spacing={3}>
                {userInfo &&
                    userInfo.map((user, i) => {
                        return(
                        <Grid item xs={4} key={i}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <img
                                    className={classes.media}
                                    src="http://via.placeholder.com/503x150"
                                    alt="People"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {user.first_name} {user.last_name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {user.address}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <a  href={user.email} target="_blank" size="small" color="primary">
                                    Email: 
                                    </a>  
                                    <a  href={user.website} target="_blank" size="small" color="primary">
                                    Website: 
                                    </a>  
                                </CardActions>
                            </Card>
                        </Grid>
                        )
                    })
                }
            </Grid>
            )}
        </div>
      );
}