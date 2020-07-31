import React, { Component } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Pearl2 from "./Pearl2.png"
import { Link } from "react-router-dom"





class LogIn extends Component{


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
     } 
   
     redirect = () => {
        this.props.history.push('/ProfileForm')
     }

     logIn = (e) => {
         e.preventDefault()
         if (this.state == null ){
             console.log("Please enter Username or Password")
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
                password: this.state.password
                }
            })
        }

        fetch("http://localhost:3001/login",options)
        .then(res => res.json())
        .then(userInfo => {
            if(userInfo.error){
             console.log(userInfo.error)
            }else{
                localStorage.token = userInfo.token 
                this.props.currentUserInfo()
                this.props.logIn()
                this.props.getInProgress()
                this.props.history.push('/')
                setTimeout(() => {
                    this.props.getPending()
                if(JSON.parse(localStorage.getItem("userInfo")).profile == null){
                    
                    this.redirect()
                }
                }, 500)
                }
            })
        }
        }

    render(){
    return(
       
        <div >
            
            <div style={{width: "100%",marginTop: "10%",textAlign: "center"}}>
            <form className="center">
            <img  src={Pearl2} height="100" /> <br/><br/> <br/>
            <TextField className="block" required name="username" defaultValue="" variant="outlined" label="Username" onChange={(e) => this.handleChange(e)}/><br/><br/><br/>
            <TextField className="block" required name="password" defaultValue="" type="password" label="Password" variant="outlined" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <Button variant="contained" color="primary" type="submit" value="Log-In" onClick={(e) => {this.logIn(e)}}>Log In</Button>
            </form>
            <p>Not a member yet?</p>
            <Link to="/SignUp"><Button variant="contained" color="primary" >Sign Up</Button></Link>
        </div>
       </div>

        );
    }
}

export default LogIn
