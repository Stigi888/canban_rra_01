import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {connect} from 'react-redux';
import {addTask} from "./redux/action";
import {ModalHeader, Col, Input, Modal, Button, Row, ModalBody, ModalFooter} from "reactstrap";


function CreateTask(props) {

    const [modalWindow, setModalWindow]= useState(false)
    const [newName, setNewName] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newStatus, setNewStatus] = useState()
    const [newPriority, setNewPriority] = useState()

const createNewTask =() =>{
       props.createTask(newName, newDescription, newPriority, newStatus)
    setModalWindow(false)
    setNewName('')
    setNewDescription('')
    setNewStatus()
    setNewPriority()
}


const cancel = ()=>{
    setModalWindow(false)
    setNewName('')
    setNewDescription('')
}

const selectStatus = (e)=>{
    setNewStatus(e.target.value)
}


return (
    <div>
        <Button onClick={()=>setModalWindow(true)}>Create new task</Button>
        <Modal isOpen={modalWindow}>
            <ModalHeader>Creating your great task in process</ModalHeader>
            <strong>Name: </strong>
            <Input value={newName} onChange={(e) => setNewName(e.target.value)}/>
            <strong>Description: </strong>
            <Input value={newDescription} onChange={(e) => setNewDescription(e.target.value)}/>
            <Row>
                <Col>
                    <strong>Priority: </strong>
                    <Input type='select' value={newPriority} onChange={(e) =>setNewPriority(e.target.value)}>
                    <option value={0}>Low</option>
                    <option value={1}>Medium</option>
                    <option value={2}>High</option>
                    <option value={3}>Very High!!1111</option>
                    </Input>
                </Col>
                <Col>
                    <strong>Status:</strong>
                    <Input type="select" value={newStatus} onChange={selectStatus}>
                        {props.columns.map(el =><option key={el._id} value={el.status}>{el.status}</option>)}
                    </Input>
                </Col>
            </Row>
            <ModalBody>
                <ModalFooter>
                    <Button onClick={createNewTask}>Create task</Button>{' '}
                    <Button onClick={cancel}>Cancel</Button>
                </ModalFooter>
            </ModalBody>
        </Modal>
    </div>
)}

const mapStateToProps = (state) => ({
    columns: state.column,

});

const mapDispatchToProps =(dispatch) =>({
    createTask: (name, description, priority, status) => dispatch(addTask(name, description, priority, status))
})


export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)

