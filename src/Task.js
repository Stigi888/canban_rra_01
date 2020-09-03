import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Card, CardBody, Button, Badge, Input, CardTitle, CardText} from "reactstrap";
import {connect} from "react-redux";
import {deleteTask, editPriority, editStatus, editTask} from "./redux/action";


function Task(props) {          //Компонент отображающий и изменяющий Карточку

    const {card} = props  //Принимаем массив карточек через пропсы!

    const [modalWindow, setModalWindow] = useState(false) //useState контролирующий состояния МОДАЛЬНОГО ОКНА
    const [newName, setNewName] = useState(card.name)               //useState контролирующий состояния NAME КАРТОЧКИ
    const [newDescription, setNewDescription] = useState(card.description)  //useState контролирующий состояния DESCRIPTION КАРТОЧКИ

    const saveTaskHandler = (taskId) => {                   //Функция Которая SAVE внесенные изменения в карточке и закрывает МОдальное окно
        props.updateTask(taskId, newName, newDescription)   //Принимаем через props дествие updateTast которая применяется по выбранному ID и принимает аргументы для изменения и сохраняет их
        setModalWindow(false)           //закрывает Модальное окно
    }


    const editPriority = (taskId, direction) =>{    //функция изменения приоритета Card - принимает паратметры ID выбранной карточки и direction изменения priority
        let newPriority = direction === 'up' ? card.priority + 1 : card.priority - 1  //Новая переменная с тернарным оператором : Если направляение(direction) имеем UP то прибавляем
        props.updatePriority(taskId, newPriority)                   //к priority +1 в противном случае отнимает значение priority - 1
    }                                           //Принимаем action updatePriority из mapDispatchToProps куда оно поступило из action.js

    const editStatus = (taskId, direction) =>{ //меняет статус Карточки принимая атрибуты ID и направления(direction)
        let newStatus = direction === 'left'    //Создаем переменную return которой зависит от выполнения условия тернарного оператора.
            ?                                   //Если direction равно 'left' то Карточка меняе статус и сдвигается на индекс -1 - т.е. сдвигается
            props.column[props.column.findIndex(el => el.status === card.status) -1] //на колонку с индексом слева(назад)
            :
            props.column[props.column.findIndex(el => el.status === card.status) +1]//Здесь сдвигается с индексом вправо +1
        props.updateStatus(taskId, newStatus.status) //Применяется action принимая ID и переменная-функция с указанием на статус! Что бы применить Статус.
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

