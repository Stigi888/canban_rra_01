import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Card, CardBody, Button, Badge, Input, CardTitle, CardText} from "reactstrap";
import {connect} from "react-redux";
import {deleteTask, editPriority, editStatus, editTask} from "./redux/action";


function Task(props) {

    const {taskList} = props

    const [modalWindow, setModalWindow] = useState(false)
    const [newName, setNewName] = useState(taskList.name)
    const [newDescription, setNewDescription] = useState(taskList.description)

    const saveTaskHandler = (taskId) => {
        props.updateTask(taskId, newName, newDescription)
        setModalWindow(false)
    }


    const editPriority = (taskId, direction) =>{
        let newPriority = direction === 'up' ? taskList.priority + 1 : taskList.priority - 1
        props.updatePriority(taskId, newPriority)
    }

    const editStatus = (taskId, direction) =>{
        let newStatus = direction === 'left'
            ?
            props.columns[props.columns.findIndex(el => el.status === taskList.status) -1]
            :
            props.columns[props.columns.findIndex(el => el.status === taskList.status) +1]
        props.updateStatus(taskId, newStatus.status)
    }
    const alertColors = ["success", "warning", "danger"]

let firstStatus = props.columns[0].status
let lastStatus = props.columns[props.columns.length - 1].status
return(
    <>
        <Card>
            <CardBody>
            <Badge color={alertColors[taskList.priority]}>Priority: {taskList.priority} </Badge>{' '}
                {taskList.priority !== 2 &&
            <Button onClick={() =>editPriority(taskList._id, 'up')}>↑</Button>}
                {' '}
                {taskList.priority !== 0 &&
            <Button onClick={() =>editPriority(taskList._id, 'down')}>↓</Button>}
            <hr/>
                {modalWindow ? (
                    <>
                    <strong>Name:</strong>
                        <Input value={newName} onChange={(e) =>setNewName(e.target.value)}/>
                    <strong>Description: </strong>
                        <Input value={newDescription} onChange={(e) =>setNewDescription(e.target.value)}/>
                        <Button onClick={() =>saveTaskHandler(taskList._id)}>Save</Button>{' '}
                        <Button onClick={() =>setModalWindow(false)}>Cancel</Button>{' '}
                    </>
                ) : (
                    <>
                    <strong>Name:</strong>
                    <CardTitle>{taskList.name}</CardTitle>
                     <strong>Description:</strong>
                    <CardText>{taskList.description}</CardText>
                        {taskList !== firstStatus &&
                        <Button onClick={() =>editStatus(taskList._id, 'left')}>←</Button>}
                        {' '}
                        {taskList.status !== lastStatus &&
                        <Button onClick={()=>editStatus(taskList._id, 'rigth')}>→</Button>}
                        <Button onClick={()=> setModalWindow(true)}>Edit</Button>
                        <Button onClick={()=>props.removeTask(taskList._id)}>Delete</Button>
                    </>
                )}
            </CardBody>
        </Card>
    </>
)}



const mapStateToProps = (state) => ({
columns: state.columnList,
});

const mapDispatchToProps  =(dispatch) =>({
    removeTask: (taskId) => dispatch(deleteTask(taskId)),
    updateTask: (taskId, newName, newDescription) => dispatch(editTask(taskId, newName, newDescription)),
    updatePriority: (taskId, newPriority) => dispatch(editPriority(taskId, newPriority)),
    updateStatus: (taskId, newStatus) => dispatch(editStatus(taskId, newStatus))

})


export default connect(mapStateToProps, mapDispatchToProps)(Task)

