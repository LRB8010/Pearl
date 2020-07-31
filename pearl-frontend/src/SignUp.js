import React, { Component } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Pearl2 from "./Pearl2.png"
import { Link } from "react-router-dom"
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
 class SignUp extends Component{
     handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
     }

     signUp = (e) => {
        e.preventDefault()
        if (this.state == null ){
            console.log("Please fill out all fields")
        }else{
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user:{
                username: this.state.username,
                password: this.state.password,
                role: this.state.role
                }
            })
        }

        fetch("http://localhost:3001/users",options)
        .then(res => res.json())
        .then(user => {
            if(user.error){
                console.log("Please fill out all fields")
               }else{
        this.props.history.push('/')
        }})
     }
    }


     render(){
    return(
        <div style={{width: "100%",marginTop: "10%",textAlign: "center"}}>
            <form className="center" onSubmit={(e) => this.signUp(e)}>
            <img  src={Pearl2} height="100" /> <br/><br/> <br/>
            <TextField className="block" name="username" required defaultValue="" variant="outlined" label="Username" onChange={(e) => this.handleChange(e)}/><br/><br/><br/>
            <TextField className="block" name="password" required defaultValue="" type="password" label="Password" variant="outlined" onChange={(e) => this.handleChange(e)}/>
            <br/>
            <RadioGroup name="role"  onChange={(e) => this.handleChange(e)} >
            <FormControlLabel value="SC" control={<Radio />} label="Senior Citizen" />
            <FormControlLabel value="V" control={<Radio />} label="Volunteer" />
            </RadioGroup>
            <Button variant="contained" color="primary" type="submit" value="Sign Up" >Sign Up</Button>
            {/* <label>Username</label>
            <input name="username" onChange={(e) => this.handleChange(e)}/>
            <label>Password</label>
            <input name="password" type="password" onChange={(e) => this.handleChange(e)}/>
            <label>Volunteer</label>
            <input type="radio" name="role" value="V" onChange={(e) => this.handleChange(e)}/>
            <label>Senior Citizen</label>
            <input type="radio" name="role" value="SC" onChange={(e) => this.handleChange(e)}/> */}
            {/* <select name="role" onChange={(e) => this.handleChange(e)}>
                <option selected="selected">Select Your Profile Type</option>
                <option name="role">Senior Citizen</option>
                <option name="role">Volunteer</option>
            </select> */}
            </form>
            <p>Already a member?</p>
            <Link to="/LogIn"><Button variant="contained" color="primary" >Log In</Button></Link>
        </div>

    );
}
 }

export default SignUp
