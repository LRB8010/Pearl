import React from "react";
import Task from "./Task";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
      paddingLeft: '300px'
     
    
    }
  });



const TaskList = (props) => {
    const classes = useStyles();
    return( 
        
        <div className={classes.root}  >
            {props.tasks.map(task => <Task  selectTask={props.selectTask} task={task}/>)}
             
        </div>
       
    );
}
export default TaskList