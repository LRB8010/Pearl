import React from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import googlemaps from "./googlemaps.jpeg"
import Button from '@material-ui/core/Button';




const useStyles = makeStyles({
    root: {
        width: 275,
        height: 525,
        margin: '25px 0',
        paddingRight: '50px'
    }
  });

  


const InProgress = (props) => {
   
   const classes = useStyles();
        return(
            <div  >
                <Card  className={classes.root}>
                    <CardContent >
                    <h3>{props.each.task.task}</h3>
                    <img src={props.each.senior.profile.picture_url} height="100"/>
                    <p>{props.each.senior.username}</p>
                    <p>{props.each.task.destination}</p>
                    {localStorage.role == "V"
                    ?<p>Please Contact at {props.each.senior.profile.phone_number}</p>
                    : null}
                    <img src={googlemaps} height="200"/> <br/><br/>
                    {localStorage.role == "SC"
                    ? <Button variant="contained" color="primary">Complete</Button>
                    : <Button variant="contained" color="primary">Un Volunteer</Button>}
                    
                    </CardContent>
                </Card>
            </div>
            )
        }
export default InProgress
