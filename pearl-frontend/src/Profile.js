import React, { Component } from "react"
import PendingList from './PendingList'
import InProgressList from './InProgressList'
import Button from '@material-ui/core/Button';
import Pearl2 from "./Pearl2.png"
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
class Profile extends Component{

        logOut = () => {
            this.props.logOut()
            localStorage.clear()
            this.props.history.push('/')
        }

        edit = () => {
            this.props.history.push('/ProfileEdit')
        }

        home = () => {
            this.props.history.push('/')
        }

        createTask = () => {
        {JSON.parse(localStorage.getItem("userInfo")).profile
        ? this.props.history.push('/NewTask')
        : this.props.history.push('/ProfileForm')}
        localStorage.from = "P"
    }
    
        render(){
            return(
                <div>
                    <img className="logo" src={Pearl2} height="100" />
                <div className="sidemenu">
                <MenuList >
                <MenuItem onClick={this.edit}>Edit Profile</MenuItem>
                <MenuItem onClick={this.home}>Home</MenuItem>
                {localStorage.role == "SC"
                ? <MenuItem onClick={this.createTask}>Create Task</MenuItem>
                : null}
                <MenuItem onClick={this.logOut}>Log Out</MenuItem>
                </MenuList>
                </div>
                <div className="profileInfo">
                <h3>{JSON.parse(localStorage.getItem("userInfo")).username}</h3>
                <img src={JSON.parse(localStorage.getItem("userInfo")).profile.picture_url} height="100"/>
                <h4>Name</h4>
                <p>{JSON.parse(localStorage.getItem("userInfo")).profile.name}</p>
                <h4>Age</h4>
                <p>{JSON.parse(localStorage.getItem("userInfo")).profile.age}</p>
                <h4>Bio</h4>
                <p>{JSON.parse(localStorage.getItem("userInfo")).profile.bio}</p>
                <h4>Hobbies</h4>
                <p>{JSON.parse(localStorage.getItem("userInfo")).profile.hobbies}</p>
                <h4>Things To Know</h4>
                <p>{JSON.parse(localStorage.getItem("userInfo")).profile.to_know}</p>
                <h4>Location</h4>
                <p>{JSON.parse(localStorage.getItem("userInfo")).profile.location}</p>
                <h4>Phone Number</h4>
                <p>{JSON.parse(localStorage.getItem("userInfo")).profile.phone_number}</p>
                </div>
                <div className="pending">
                {localStorage.role == "V"
                ? <h3 clasName="floatRight">Pending Tasks</h3>
                :<h3 clasName="floatRight">Created Task</h3>}
                {<PendingList history={this.props.history} getPending={this.props.getPending}
                createdTasks={this.props.createdTasks} getInProgress={this.props.getInProgress}/>}
                </div>
                <div className="inProgress">
                <h3>In Progress</h3>
                <InProgressList/>
                </div>
                <div className="completed">
                    <h3>Completed!</h3>
                </div>

                

                </div>
            )
        }
}
export default Profile

