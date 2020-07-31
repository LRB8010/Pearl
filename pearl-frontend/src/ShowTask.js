import React from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles({
    root: {
        width: 375,
        height: 675,
        margin: '25px 0',
        paddingRight: '50px'
      },
      right: {
        right: 300,
        position: 'fixed'
        
        }

  
  });

const ShowTask = (props) => {
   
   

    const deleteTask = () => {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        }
        fetch(`http://localhost:3001/tasks/${props.selectedTask[0].id}`,options)
        props.deleteTask()
       
    }
    const classes = useStyles();
    if (props.selectedTask === null) {
        return null
    }else{
    return(
       
        <div className={classes.right}>
            <Card className={classes.root} >
                    <CardContent>
                        {JSON.parse(localStorage.getItem("pending")) == null
                        ? null 
                    : ((JSON.parse(localStorage.getItem("pending")).some(e => e.task_id === props.selectedTask[0].id)))
                ? <h3>You already volunteerd </h3> : null
                }
                <h3>{props.selectedTask[0].task}</h3>
                <h4>Name</h4>
                <p>{props.selectedTask[0].user.profile.name}</p>
                <h4>Location</h4>
                <p>{props.selectedTask[0].destination}</p>
                <h4>Description</h4>
                <p>{props.selectedTask[0].description}</p>
                <h4>Things to know</h4>
                <p>{props.selectedTask[0].user.profile.to_know}</p>
                <img src="https://www.phpflow.com/wp-content/uploads/2018/01/google-map-api-with-php.png" height="200" />
                {localStorage.id == props.selectedTask[0].user_id 
                ?<Link to="/editTask"><Button variant="contained" color="primary" >Edit</Button ></Link>
                :null}
                {localStorage.id == props.selectedTask[0].user_id 
                ?<Button variant="contained" color="primary" onClick={() => deleteTask()}>Delete</Button >
                :null}
                {localStorage.role == "V"
                ? <Button variant="contained" color="primary" onClick={(e) => props.addToPending(e)}>Volunteer</Button >
                : null}
                    </CardContent>
                </Card>
        </div>
        
    )
}
}
export default ShowTask