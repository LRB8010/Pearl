import React from "react"
import { Link } from "react-router-dom"
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Button from '@material-ui/core/Button';


const TopBar = (props) => {

     const getFilteredPending = () => {
         
     }

    const signUp = () => {
        props.history.push('/signup')
    }

    const logIn = () => {
        props.history.push('/login')
    }
    const logOut = () => {
        props.logOut()
        localStorage.clear()
        props.history.push('/')
    }

    const profile = () => {
        if(JSON.parse(localStorage.getItem("userInfo")).profile){
        props.getInProgress()
        props.getPending()
        setTimeout(() => {
            props.createdTasks()
        },600)
        
        setTimeout(() => {
            props.history.push('/Profile')
        },800)
        }else{
        props.history.push('/ProfileForm')
        }
    }

    const createTask = () => {
        {JSON.parse(localStorage.getItem("userInfo")).profile
        ? props.history.push('/NewTask')
        :props.history.push('/ProfileForm')}
        localStorage.from = "H"
    }

    return(
       
        <div className="sidemenu" >
           <MenuList>
            {localStorage.token 
            ? null 
            :<MenuItem onClick={signUp}>Sign Up</MenuItem>}
            
            {localStorage.role == "SC"
            ? <MenuItem onClick={createTask}>Create Task</MenuItem>
            : null}
            
            {localStorage.token 
            ? <MenuItem onClick={profile}>Profile</MenuItem>
            : null}

            {localStorage.token
            ?<MenuItem onClick={logOut}>Log Out</MenuItem>
            : <MenuItem onClick={logIn}>Log In</MenuItem>}
            
            {localStorage.username 
            ? <h3>{localStorage.username}</h3>
            :null}
            
            </MenuList>
            
         </div>

    );
}

export default TopBar
