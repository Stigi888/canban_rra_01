import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Card, CardBody, Button, Badge, Input, CardTitle, CardText} from "reactstrap";
import {connect} from "react-redux";
import {deleteTask, editPriority, editStatus, editTask} from "./redux/action";


function Task(props) {

    const {card} = props

    const [modalWindow, setModalWindow] = useState(false)
    const [newName, setNewName] = useState(card.name)
    const [newDescription, setNewDescription] = useState(card.description)

    const saveTaskHandler = (taskId) => {
        props.updateTask(taskId, newName, newDescription)
        setModalWindow(false)
    }


    const editPriority = (taskId, direction) =>{
        let newPriority = direction === 'up' ? card.priority + 1 : card.priority - 1
        props.updatePriority(taskId, newPriority)
    }

    const editStatus = (taskId, direction) =>{
        let newStatus = direction === 'left'
            ?
            props.column[props.column.findIndex(el => el.status === card.status) -1]
            :
            props.column[props.column.findIndex(el => el.status === card.status) +1]
        props.updateStatus(taskId, newStatus.status)
    }
    const alertColors = ["success", "warning", "danger"]

let firstStatus = props.column[0].status
let lastStatus = props.column[props.column.length - 1].status
return(
    <>
        <Card>
            <CardBody>
            <Badge color={alertColors[card.priority]}>Priority: {card.priority} </Badge>{' '}
                {card.priority !== 2 &&
            <Button onClick={() =>editPriority(card._id, 'up')}>↑</Button>}
                {' '}
                {card.priority !== 0 &&
            <Button onClick={() =>editPriority(card._id, 'down')}>↓</Button>}
            <hr/>
                {modalWindow ? (
                    <>
                    <strong>Name:</strong>
                        <Input value={newName} onChange={(e) =>setNewName(e.target.value)}/>
                    <strong>Description: </strong>
                        <Input value={newDescription} onChange={(e) =>setNewDescription(e.target.value)}/>
                        <Button onClick={() =>saveTaskHandler(card._id)}>Save</Button>{' '}
                        <Button onClick={() =>setModalWindow(false)}>Cancel</Button>{' '}
                    </>
                ) : (
                    <>
                    <strong>Name:</strong>
                    <CardTitle>{card.name}</CardTitle>
                     <strong>Description:</strong>
                    <CardText>{card.description}</CardText>
                        {card !== firstStatus &&
                        <Button onClick={() =>editStatus(card._id, 'left')}>←</Button>}
                        {' '}
                        {card.status !== lastStatus &&
                        <Button onClick={()=>editStatus(card._id, 'rigth')}>→</Button>}
                        <Button onClick={()=> setModalWindow(true)}>Edit</Button>
                        <Button onClick={()=>props.removeTask(card._id)}>Delete</Button>
                    </>
                )}
            </CardBody>
        </Card>
    </>
)}



const mapStateToProps = (state) => ({
column: state.column,
});

const mapDispatchToProps  =(dispatch) =>({
    removeTask: (taskId) => dispatch(deleteTask(taskId)),
    updateTask: (taskId, newName, newDescription) => dispatch(editTask(taskId, newName, newDescription)),
    updatePriority: (taskId, newPriority) => dispatch(editPriority(taskId, newPriority)),
    updateStatus: (taskId, newStatus) => dispatch(editStatus(taskId, newStatus))

})


export default connect(mapStateToProps, mapDispatchToProps)(Task)

