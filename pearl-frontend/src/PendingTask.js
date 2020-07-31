import React from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import VolunteersCards from './VolunteersCards'
import Button from '@material-ui/core/Button';
import googlemaps from "./googlemaps.jpeg"



const useStyles = makeStyles({
    root: {
      width: 275,
      height: 525,
      margin: '25px 0',
      paddingRight: '50px'
    },

    root2: {
        width: 275,
        height: 655,
        margin: '25px 0',
        paddingRight: '50px'
      },
ya: {

  float: "right",
  height: 150,
  width:150,
  padding:3,
  overflow: 'auto'
}
  });

  


const PendingTask = (props) => {
    
    const deletePending = (e) => {
        console.log(e)
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        }
        if(localStorage.role == "V"){
        fetch(`http://localhost:3001/pending/${e}`,options)
        setTimeout(() => {
            props.getPending()
        },200)
        setTimeout(() => {
            props.history.push('/Profile')
        },500)
        }else{
        fetch(`http://localhost:3001/tasks/${e}`,options)
        }
        setTimeout(() => {
            props.createdTasks()
        },200)
        setTimeout(() => {
            props.history.push('/Profile')
        },500)
    }
   const classes = useStyles();
    if(localStorage.role == "V"){
        return(
            <div >
                
                <Card className={classes.root} >
                    <CardContent >
                        {console.log(props)}
                <h3>{props.pending.task.task}</h3>
                <img src={props.pending.senior.profile.picture_url} height="100"/>
                <p>{props.pending.senior.username}</p>
                <p>{props.pending.task.destination}</p>
                <img src={googlemaps} height="200"/> <br/><br/>
                <Button variant="contained" color="primary" name={props.pending.id} onClick={() => deletePending(props.pending.id)}>Un Volunteer</Button>
                    </CardContent>
                </Card>
            </div>
            )
    }else{
        return(
        <div >
            
            <Card className={classes.root2} >
                <CardContent >
            <h3>{props.created.task}</h3>
            <img src={props.created.user.profile.picture_url} height="100"/>
            <p>{props.created.user.username}</p>
            <p>{props.created.destination}</p>
            <img src={googlemaps} height="200"/> <br/><br/>
            <Button variant="contained" color="primary" name={props.created.id} onClick={() => deletePending(props.created.id)}>Delete</Button>
            <div className={classes.ya}>{props.created.pending.map(volunteer => <VolunteersCards volunteer={volunteer}
                getInProgress={props.getInProgress}
                deletePending={deletePending}
                history={props.history}
                getPending={props.getPending}
                createdTasks={props.createdTasks}/>)}</div>
            
            
                </CardContent>
            </Card>
        </div>
        )
    }
    
}

export default PendingTask