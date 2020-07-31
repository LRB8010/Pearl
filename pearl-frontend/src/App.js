import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LogIn from "./LogIn"
import SignUp from "./SignUp"
import ContentContainer from "./ContentContainer"
import CreateTask from "./CreateTask"
import EditTask from "./EditTask"
import Profile from "./Profile"
import ProfileForm from "./ProfileForm"
import ProfileEdit from "./ProfileEdit"




class App extends Component {
  state = {
    loggedIn: false,
    currentUser: [],
    tasks:[],
    selectedTask: null,
    pendingTasks: []
  }

  getInProgress = () => {
    fetch(`http://localhost:3001/inprogresses`)
    .then(res => res.json())
    .then(inprogress => {
        if(localStorage.role == "V"){
        let filteredTasks = inprogress.filter(e => e.volunteer_id == localStorage.id)
        localStorage.setItem( 'inProgress', JSON.stringify(filteredTasks))
        }else{
          let filteredTasks = inprogress.filter(e => e.senior_id == localStorage.id)
          localStorage.setItem( 'inProgress', JSON.stringify(filteredTasks))
        }

    })
}
  createdTasks = () => {
    fetch("http://localhost:3001/tasks")
    .then(res => res.json())
    .then(tasks => {
      if (JSON.parse(localStorage.getItem("inProgress")).length === 0){
      let filteredTasks = tasks.filter(e => e.user_id == localStorage.id)
      console.log(filteredTasks,"nah")
      localStorage.setItem( 'createdTasks', JSON.stringify(filteredTasks))
      }else{
      let filteredTasks = tasks.filter(e => e.user_id == localStorage.id)
      let inprogressTasks = JSON.parse(localStorage.getItem("inProgress")).map(e => e.task_id)
      console.log(inprogressTasks)
      let filteredAgain = filteredTasks.filter(o => !JSON.parse(localStorage.getItem("inProgress")).map(e => e.task_id).includes(o.id))
      console.log(filteredAgain,"yea")
      localStorage.setItem( 'createdTasks', JSON.stringify(filteredAgain))
      }
    })
  
  }

  closeShowTask = () => {
    this.setState({
      selectedTask: null
    })
  }

  getPending = () =>{
    console.log("test")
    fetch("http://localhost:3001/pending")
    .then(res => res.json())
    .then(pending => {
      console.log(pending)
      if(localStorage.role == "V"){
      //   if (JSON.parse(localStorage.getItem("inProgress")).length === 0){
      //     let filteredTasks = pending.filter(e => e.volunteer_id == localStorage.id)
      //     console.log(filteredTasks,"nah")
      //     localStorage.setItem( 'pending', JSON.stringify(filteredTasks))
      //     }else{
      //     let filteredTaskss = pending.filter(e => e.volunteer_id == localStorage.id)
      //     console.log(filteredTaskss, "maybe?")
      //     let filteredAgain = filteredTaskss.filter(o => !JSON.parse(localStorage.getItem("inProgress")).map(e => e.task_id).includes(o.task_id))
      //     console.log(filteredAgain,"ybea")
      //     localStorage.setItem( 'pending', JSON.stringify(filteredAgain))
      //     }
     let filterd = pending.filter(e => e.volunteer_id == localStorage.id)
     localStorage.setItem( 'pending', JSON.stringify(filterd))
    }else{
      let filterd = pending.filter(e => e.senior_id == localStorage.id)
     localStorage.setItem( 'pending', JSON.stringify(filterd))
     console.log("here")
    }})
  }

  addEditedTask = (taskid,task) => {
    const data = [...this.state.tasks]
    const index = data.findIndex(obj => obj.id === taskid)
    data[index] = task
    this.setState({
      tasks: data,
      selectedTask: [task]
      
    },() => console.log(task))
  }
  forceRender = () => {
    this.setState({ state: this.state })
  }
  deleteTask = () => {
    console.log(this.state.selectedTask)
    let newarr = this.state.tasks.filter(t=> t != this.state.selectedTask[0])
    this.setState({
      selectedTask: null,
      tasks: newarr
    },() => console.log(newarr))
  }
  newTaskAdd = (task) => {
    this.setState({
      tasks: [...this.state.tasks,task]
    })
  }
  selectTask = (e) => {
    if(localStorage.token){
      this.getPending()
      console.log(e,"yea")
    let filterd = this.state.tasks.filter(task => task.id == e)
    this.setState({
    selectedTask: filterd 
    })
    }else{
    console.log(e,"nah")
    let filterd = this.state.tasks.filter(task => task.id == e)
    this.setState({
    selectedTask: filterd 
  })}
  }

  logOut = () => {
    this.setState({
      currentUser: []
    })
  }

  currentUserInfo = () => {
    fetch(`http://localhost:3001/profile`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      } 
    })
    .then(res => res.json())
    .then(info => {
      
      this.setState({
        currentUser: info
      })
      
      localStorage.role = info.role
      localStorage.username = info.username
      localStorage.id = info.id
      localStorage.setItem( 'userInfo', JSON.stringify(info))
      this.setState({
        test: "test"
      })
    })
  

    
  }

  logIn = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }
  
  componentDidMount(){
    fetch('http://localhost:3001/tasks')
    .then(res => res.json())
    .then(tasks => {
      this.setState({
        tasks: tasks,
      })
    })
  }
  
 
  render(){
  return (
   <div >
     
     
    <BrowserRouter >
    <div >
      <Switch>
      
      <Route  exact path="/"
      render = {(routeProps) => 
      <ContentContainer {...routeProps} 
      loggedIn={this.state.loggedIn} 
      currentUser={this.state.currentUser} 
      logOut={this.logOut}
      tasks={this.state.tasks}
      selectTask={this.selectTask}
      selectedTask={this.state.selectedTask}
      deleteTask={this.deleteTask}
      forceRender={this.forceRender}
      closeShowTask={this.closeShowTask}
      getPending={this.getPending}
      createdTasks={this.createdTasks}
      getInProgress={this.getInProgress}/>
      }/>

      <Route path="/NewTask"
      render = {(routeProps) => 
      <CreateTask {...routeProps} 
      newTaskAdd={this.newTaskAdd}/>
      }/>
      
      <Route path="/EditTask"
      render = {(routeProps) => <EditTask {...routeProps} 
      selectedTask={this.state.selectedTask}
      addEditedTask={this.addEditedTask}/>
      }/>
      

      <Route path="/Login"
      render = {(routeProps) => <LogIn {...routeProps} 
      logIn={this.logIn} 
      currentUserInfo={this.currentUserInfo} 
      currentUser={this.state.currentUser}
      getPending={this.getPending}
      getInProgress={this.getInProgress}
      />
      }/>

      <Route path="/SignUp"
      render = {(routeProps) => <SignUp {...routeProps} />
      }/>

      <Route path="/Profile"
      render = {(routeProps) => <Profile {...routeProps}
      getPending={this.getPending}
      createdTasks={this.createdTasks}
      getInProgress={this.getInProgress}
      logOut={this.logOut}/>
      }/>

      <Route path="/ProfileForm"
      render = {(routeProps) => <ProfileForm {...routeProps} 
      currentUserInfo={this.currentUserInfo}/>
      }/>

      <Route path="/ProfileEdit"
      render = {(routeProps) => <ProfileEdit {...routeProps} 
      currentUserInfo={this.currentUserInfo}/>
      }/>

      </Switch>
    </div>
      </BrowserRouter>
      </div>
  );
  
}
}

export default App;
