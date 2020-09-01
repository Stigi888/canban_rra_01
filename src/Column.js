import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Col, Button} from "reactstrap";
import Task from "./Task";
import {connect} from "react-redux";
import {deleteColumn, getTasks} from "./redux/action";


function Column(props) {

const {column} = props

    useEffect(()=>{
        props.getAllTasks()
    },[]);


// const newTaskList = props.cards.filter(el => el.status === column.status)
//     console.log(newTaskList)


    return (
        <div>
            <Col>
                <h3>{column.title}</h3>
                {props.cards
                    .sort((a,b) =>b.priority - a.priority)
                    .filter(el => el.status === column.status)
                    .map(el =><Task key={el._id} card={el}/>)}
                <hr/>
                {column.status !== 'todo' &&
                column.status !== 'progress' &&
                column.status !== 'review' &&
                column.status !== 'done' &&
                <Button onClick={() => props.deleteColumn(column._id)}>Delete column</Button>}
            </Col>
        </div>
    )
}


const mapStateToProps = (state) => ({
    cards: state.card

});

const mapDispatchToProps = (dispatch) => ({

    getAllTasks: () => dispatch(getTasks()),
    deleteColumn: (columnId)=> dispatch(deleteColumn(columnId))
});


export default connect(mapStateToProps, mapDispatchToProps)(Column)