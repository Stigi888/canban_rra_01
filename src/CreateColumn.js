import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {connect} from 'react-redux';
import {addColumn} from "./redux/action";
import {Modal} from "bootstrap/js/src";
import {Button} from "reactstrap";
import {ModalHeader} from "reactstrap";
import {Input} from "reactstrap";
import {ModalBody} from "reactstrap";
import {ModalFooter} from "reactstrap";


function CreateColumn(props) {

const [modalWindow, setModalWindow]= useState(false)
const [inputTitle, setInputTitle] = useState('')
const [inputStatus, setInputStatus] = useState('')

    const inputChangeTitle = (e) =>{setInputTitle(e.target.value)}

    const inputChangeStatus = (e) =>{setInputStatus(e.target.value)}

    const createColumn = () =>{
    props.addColumn(inputTitle,inputStatus)
        setModalWindow(false)
        setInputTitle('')
        setInputStatus('')
    }

    const cancel = ()=>{
        setModalWindow(false)
        setInputTitle('')
        setInputStatus('')
    }


    return (
        <div>
            <Button onClick={() => setModalWindow(true)}>Add another column</Button>
            <Modal isOpen={modalWindow}>
                <ModalHeader>Заполните поле заголовок Колонки</ModalHeader>
                <ModalBody>
                    <strong>Title: </strong>
                    <Input placeholder='Enter title column' value={inputTitle} onChange={inputChangeTitle}/>
                    <strong>Status:</strong>
                    <Input placeholder='Enter status column' value={inputStatus} onChange={inputChangeStatus}/>
                </ModalBody>
            <ModalFooter>
                <Button onClick={createColumn}>Create</Button>
                <Button onClick={cancel}>Cancel</Button>
            </ModalFooter>
            </Modal>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({

    addColumn: (title, status) => dispatch(addColumn(title, status))
})

export default connect(null, mapDispatchToProps)(CreateColumn)

