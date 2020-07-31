import React, { Component } from "react"
import { Link } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Pearl2 from "./Pearl2.png"

class CreateTask extends Component{
    handleChange= (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                task:{
                task: this.state.task,
                destination: this.state.destination,
                description: this.state.description,
                user_id: localStorage.id
                }
            })
        }
        fetch("http://localhost:3001/tasks",options)
        .then(res => res.json())
        .then(task => {
          console.log(task)
          this.props.newTaskAdd(task)
        })
        
        this.props.history.push('/')
    }

    
    


    render(){
        return(
            <div style={{width: "100%",marginTop: "10%",textAlign: "center"}}>
                <form className="center">
                <img  src={Pearl2} height="100" /> <br/><br/> <br/>
            <TextField className="block" name="task" required defaultValue="" variant="outlined" label="Task" onChange={(e) => this.handleChange(e)}/><br/><br/><br/>
            <TextField className="block" name="destination" required defaultValue="" variant="outlined" label="Destination"  onChange={(e) => this.handleChange(e)}/><br/><br/><br/>
            <TextField className="block" name="description" required defaultValue="" variant="outlined" label="Description" onChange={(e) => this.handleChange(e)}/><br/><br/><br/>
            <Button variant="contained" color="primary" type="submit" value="Create Task" onClick={(e) => {this.handleSubmit(e)}}>Create Task</Button>
                    {/* <label>Task</label>
                    <input name="task" onChange={(e) => this.handleChange(e)}/>
                    <label>Destination</label>
                    <input name="destination" onChange={(e) => this.handleChange(e)}/>
                    <label>Description</label>
                    <input name="description" onChange={(e) => this.handleChange(e)}/>
                    <input type="submit" value="Create Task" onClick={(e) => this.handleSubmit(e)}/> */}
                </form>
                <br/><br/>
                {localStorage.from == "H" 
                ? <Link to="/"><Button variant="contained" color="primary" size="small">Home</Button></Link>
                : <Link to="/Profile"><Button variant="contained" color="primary" size="small">Back</Button></Link>}
                

            </div>
        )
    }
}
export default CreateTask