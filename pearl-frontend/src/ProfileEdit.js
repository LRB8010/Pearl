import React, { Component } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Pearl2 from "./Pearl2.png"
import { Link } from "react-router-dom"

class ProfileEdit extends Component{
    handleChange= (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const options = {
            method: 'PATCH',
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
        fetch(`http://localhost:3001/profiles/${JSON.parse(localStorage.getItem("userInfo")).profile.id}`,options)
        .then(res => res.json())
        .then(profile => {
          console.log(profile)
          this.props.currentUserInfo()
        })
        this.props.history.push('/Profile')
        
    }

    render(){
        return(
            <div>
                <Link to="/Profile"><Button size="small" variant="contained" color="primary">Back</Button></Link>
            <div style={{width: "100%",marginTop: "0%",textAlign: "center"}}>
                <form className="center" onSubmit={(e) => this.handleSubmit(e)}>
                <img  src={Pearl2} height="100" /> <br/><br/> <br/>
            <TextField className="block" name="picture_url" defaultValue="" defaultValue={JSON.parse(localStorage.getItem("userInfo")).profile.picture_url} label="Picture URL" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <TextField className="block" name="name" defaultValue="" defaultValue={JSON.parse(localStorage.getItem("userInfo")).profile.name} label="Name" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <TextField className="block" name="age" defaultValue="" defaultValue={JSON.parse(localStorage.getItem("userInfo")).profile.age} label="Age" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <TextField className="block" name="bio" defaultValue="" defaultValue={JSON.parse(localStorage.getItem("userInfo")).profile.bio} label="Bio" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <TextField className="block" name="hobbies" defaultValue="" defaultValue={JSON.parse(localStorage.getItem("userInfo")).profile.hobbies} label="Hobbies" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <TextField className="block" name="to_know" defaultValue="" defaultValue={JSON.parse(localStorage.getItem("userInfo")).profile.to_know} label="Things to know" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <TextField className="block" name="location" defaultValue="" defaultValue={JSON.parse(localStorage.getItem("userInfo")).profile.location} label="Location" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <TextField className="block" name="phone_number" defaultValue="" defaultValue={JSON.parse(localStorage.getItem("userInfo")).profile.phone_number} label="Phone Number" onChange={(e) => this.handleChange(e)}/><br/><br/>
            <Button variant="contained" color="primary" type="submit" value="Submit" >Submit</Button> 
                    {/* <label>Profile Picture URL</label>
                    <input name="picture_url" defaultValue={JSON.parse(localStorage.getItem("userInfo")).profile.picture_url} onChange={(e) => this.handleChange(e)}/>
                    <label>Name</label>
                    <input name="name" defaultValue={JSON.parse(localStorage.getItem("userInfo")).profile.name} onChange={(e) => this.handleChange(e)}/>
                    <label>Age</label>
                    <input name="age" defaultValue={JSON.parse(localStorage.getItem("userInfo")).profile.age} onChange={(e) => this.handleChange(e)}/>
                    <label>Bio</label>
                    <input name="bio" defaultValue={JSON.parse(localStorage.getItem("userInfo")).profile.bio} onChange={(e) => this.handleChange(e)}/>
                    <label>Hobbies</label>
                    <input name="hobbies" defaultValue={JSON.parse(localStorage.getItem("userInfo")).profile.hobbies} onChange={(e) => this.handleChange(e)}/>
                    <label>Things To Know</label>
                    <input name="to_know" defaultValue={JSON.parse(localStorage.getItem("userInfo")).profile.to_know} onChange={(e) => this.handleChange(e)}/>
                    <label>Location</label>
                    <input name="location" defaultValue={JSON.parse(localStorage.getItem("userInfo")).profile.location} onChange={(e) => this.handleChange(e)}/>
                    <label>Phone Number</label>
                    <input name="number" defaultValue={JSON.parse(localStorage.getItem("userInfo")).profile.phone_number} onChange={(e) => this.handleChange(e)}/>
                    <input type="submit" value="Submit" /> */}
                </form>
            </div>
            </div>
        )
    }
}
export default ProfileEdit
