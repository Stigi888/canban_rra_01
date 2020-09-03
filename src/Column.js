import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Col, Button} from "reactstrap";
import Task from "./Task";
import {connect} from "react-redux";
import {deleteColumn, getTasks} from "./redux/action";


function Column(props) {

const {column} = props  //принимаем через пропсы массив колонок из App

    useEffect(()=>{   //Отображаем все карточки с помощью useEffect
        props.getAllTasks() //здесь принимаем запрос "Показать Все карточки" который приняли в mapDispatchToProps
    },[]);


// const newTaskList = props.cards.filter(el => el.status === column.status)
//     console.log(newTaskList)


    return (
        <div>
            <Col>
                <h3>{column.title}</h3>                 //Отображение заголовка Колонки
                {props.cards                            //Принимаем массив Карточек через пропсы
                    .sort((a,b) =>b.priority - a.priority) //сортируем их по убыванию Приоритета
                    .filter(el => el.status === column.status) //ФИльтруем карточки по Статусу - отправляем карточку с определенным статусом в колонку с таким же Статусом
                    .map(el =><Task key={el._id} card={el}/>)} //
                <hr/>
                {column.status !== 'todo' &&
                column.status !== 'progress' &&
                column.status !== 'review' &&
                column.status !== 'done' &&
                <Button onClick={() => props.deleteColumn(column._id)}>Delete column</Button>}   //Кнопка УДАЛИТЬ ВЫБРАННУЮ КОЛОНКУ
            </Col>
        </div>
    )
}


const mapStateToProps = (state) => ({               //Принимам STATE карточек из reducer (где они все хранятся) и называем его cardS!
    cards: state.card

});

const mapDispatchToProps = (dispatch) => ({

    getAllTasks: () => dispatch(getTasks()),            //Принимаем из action запрос "Показать Все карточки"
    deleteColumn: (columnId)=> dispatch(deleteColumn(columnId))//Принимаем из action запрос "Удалить Колонку"
});


export default connect(mapStateToProps, mapDispatchToProps)(Column) //