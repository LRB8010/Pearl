import React from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles({
    root: {
      width: 115,
      height: 115
    },
    content: {
  height:225,
//    overflow: 'auto'
    }
  });

  


const VolunteersCards = (props) => {
   const createdTasks = () => {
        fetch("http://localhost:3001/tasks")
        .then(res => res.json())
        .then(tasks => {
          let filteredTasks = tasks.filter(e => e.user_id == localStorage.id)
          console.log(filteredTasks)
          localStorage.setItem( 'createdTasks', JSON.stringify(filteredTasks))
        })
      
      }

    const inProgress = (e) =>{
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                inprogress:{
                task_id: e.target.name,
                volunteer_id: e.target.id,
                senior_id: localStorage.id
                }
            })
        }
            fetch('http://localhost:3001/inprogresses',options)
            .then(res => res.json())
            .then(console.log)
    }

    const deletePending = (e) => {
        let filtered = JSON.parse(localStorage.getItem("createdTasks")).filter(o => o.id != e)
        localStorage.setItem( 'createdTasks', JSON.stringify(filtered))
    }
    const handleClick = (e) => {
        let ye = e.target.name
        console.log(e)
        inProgress(e)
        
        setTimeout(function() {
            deletePending(ye);
        }, 200)
        setTimeout(() => {
            props.getInProgress()
            createdTasks()
        },400)
        // setTimeout((yea) => {
        //     console.log(yea)
        //     // deletePending(e)
        // },400)
        setTimeout(() => {
            props.history.push('/Profile')
        },500)
       
    }
   const classes = useStyles();
        return(
            <div className={classes.content} >
                <Card  >
                    <CardContent >
                    <img src={props.volunteer.volunteer.profile.picture_url} height="50"/>
                    <h5>{props.volunteer.volunteer.profile.name}</h5>
                    <button id={props.volunteer.volunteer_id} name={props.volunteer.task_id} onClick={(e) => handleClick(e)}>Choose</button>
                    </CardContent>
                </Card>
            </div>
            )
        }
export default VolunteersCards
