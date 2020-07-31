import React, { Component } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Pearl2 from "./Pearl2.png"

class ProfileForm extends Component{
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
                profile:{
                picture_url: this.state.picture_url,
                name: this.state.name,
                age: this.state.age,
                bio: this.state.bio,
                hobbies: this.state.hobbies,
                to_know: this.state.to_know,
                location: this.state.location,
                phone_number: this.state.phone_number,
                user_id: localStorage.id
                }
            })
        }
        fetch("http://localhost:3001/profiles",options)
        .then(res => res.json())
        .then(profile => {
          console.log(profile)
          this.props.currentUserInfo()
          this.setState({
            test: "test"
          })
          this.props.history.push('/')
        })
      
        
    }

    render(){
        return(
            <div style={{width: "100%",marginTop: "0%",textAlign: "center"}}>
                <form className="center" onSubmit={(e) => this.handleSubmit(e)}>
                <img  src={Pearl2} height="100" /> <br/><br/> <br/>
            <TextField className="block" name="picture_url" defaultValue="" required label="Picture URL" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <TextField className="block" name="name" defaultValue="" required label="Name" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <TextField className="block" name="age" defaultValue="" required label="Age" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <TextField className="block" name="bio" defaultValue="" required label="Bio" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <TextField className="block" name="hobbies" defaultValue="" required label="Hobbies" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <TextField className="block" name="to_know" defaultValue="" required label="Things to know" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <TextField className="block" name="location" defaultValue="" required label="Location" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <TextField className="block" name="phone_number" defaultValue="" required label="Phone Number" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <Button variant="contained" color="primary" type="submit" value="Submit" >Submit</Button>
                    {/* <label>Profile Picture URL</label>
                    <input name="picture_url" onChange={(e) => this.handleChange(e)}/>
                    <label>Name</label>
                    <input name="name" onChange={(e) => this.handleChange(e)}/>
                    <label>Age</label>
                    <input name="age" onChange={(e) => this.handleChange(e)}/>
                    <label>Bio</label>
                    <input name="bio" onChange={(e) => this.handleChange(e)}/>
                    <label>Hobbies</label>
                    <input name="hobbies" onChange={(e) => this.handleChange(e)}/>
                    <label>Things To Know</label>
                    <input name="to_know" onChange={(e) => this.handleChange(e)}/>
                    <label>Location</label>
                    <input name="location" onChange={(e) => this.handleChange(e)}/>
                    <label>Phone Number</label>
                    <input name="phone_number" onChange={(e) => this.handleChange(e)}/>
                    <input type="submit" value="Submit" /> */}
                </form>
          </div>
        )
    }
}
export default ProfileForm
