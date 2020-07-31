import React, { Component } from "react"
import InProgress from './InProgress'



class InProgressList extends Component{
    render(){
        return(
            <div>
                {JSON.parse(localStorage.getItem("inProgress")).map(each => <InProgress each={each}/>)}
            </div>
        )
    }
}
export default InProgressList