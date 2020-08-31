import axios from 'axios'

export function getTasks(){
    return(dispatch) =>{
        axios.get(`https://canban-server.herokuapp.com/tasks`)
            .then(result => {
                dispatch({
                    type: 'GET_TASKS',
                    payload: result.data
                })
            })
            .catch(function (error){
                console.log(error)
            })
    }
}

export function getColumns(){
    return(dispatch) =>{
        axios.get(`https://canban-server.herokuapp.com/column`)
            .then(result => {
                dispatch({
                    type: 'GET_COLUMNS',
                    payload: result.data
                })
            })
            .catch(function (error){
                console.log(error)
            })
    }
}

export function addTask(name, description, priority, status){
    return(dispatch) => {

        axios.post('https://canban-server.herokuapp.com/task', {name, description, priority, status})
            .then(result =>{
                console.log(result.data)
                dispatch(getTasks())
            })
            .catch(function (error){
                console.log(error)
            })
    }
}

export function addColumn(title, status){
    return(dispatch) => {
        axios.post('https://canban-server.herokuapp.com/task', {title, status})
            .then(result =>{
                console.log(result.data)
                dispatch(getColumns())
            })
            .catch(function (error){
                console.log(error)
            })
    }
}

export function deleteTask(taskId){
    return(dispatch) =>{
        axios.delete(`https://canban-server.herokuapp.com/task/${taskId}`)
            .then(result => {
                console.log(result.data)
                dispatch(getTasks())
            })
            .catch(error =>console.log(error))
    }
}

export function deleteColumn(columnId){
    return(dispatch) =>{
        axios.delete(`https://canban-server.herokuapp.com/column/${columnId}`)
            .then(result => {
                console.log(result.data)
                dispatch(getColumns())
            })
            .catch(error =>console.log(error))
    }
}

export function editTask(taskId, newName, newDescription){
    return(dispatch)=>{
        axios.patch(`https://canban-server.herokuapp.com/task/${taskId}`, {name: newName, description: newDescription})
            .then(result =>{
                console.log(result.data)
                dispatch(getTasks())
            })
            .catch(error =>console.log(error))
    }
}

export function editPriority (taskId, priority) {
    return(dispatch) =>{
        axios.patch(`https://canban-server.herokuapp.com/task/${taskId}`,{priority})
        .then(result =>{
            console.log(result.data)
            dispatch(getTasks())
        })
            .catch(error =>console.log(error))
    }
}

export function editStatus(taskId, status){
    return (dispatch) =>{
        axios.patch(`https://canban-server.herokuapp.com/task/${taskId}`,{status})
            .then(result =>{
                console.log(result.data)
            dispatch(getTasks())
        })
            .catch(error =>console.log(error))
    }
}