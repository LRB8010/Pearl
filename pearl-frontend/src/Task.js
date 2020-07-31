import React from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
    root: {
      maxWidth: 275,
      height: 275,
      margin: '25px 0',
      paddingRight: '50px'
    }
  });


  


const Task = (props) => {
   const classes = useStyles();
    
        return(
            
                <div onClick={() => props.selectTask(props.task.id)}>
                <Card className={classes.root} >
                    <CardContent>
                <h3>{props.task.task}</h3>
                <img src={props.task.user.profile.picture_url} height="100"/>
                <p>{props.task.user.username}</p>
                <p>{props.task.destination}</p>
                    </CardContent>
                </Card>
                </div>
            
        )
    
}

export default Task