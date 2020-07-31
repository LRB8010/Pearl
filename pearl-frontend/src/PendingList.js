import React, { Component } from "react"
import PendingTask from './PendingTask'



class PendingList extends Component{
    render(){
        if(localStorage.role == "V"){
        return(
            <div>
                {JSON.parse(localStorage.getItem("pending")).map(pending => <PendingTask pending={pending}
                getPending={this.props.getPending} 
                history={this.props.history}
                getInProgress={this.props.getInProgress}
                createdTasks={this.props.createdTasks}/>)} 
            </div>
        )
    }else{
        return(
            <div>
        
                {JSON.parse(localStorage.getItem("createdTasks")).map(created => <PendingTask created={created}
                getPending={this.props.getPending}
                history={this.props.history}
                createdTasks={this.props.createdTasks}
                getInProgress={this.props.getInProgress}/>)}
            </div>
        )
    }

    }
}
export default PendingList