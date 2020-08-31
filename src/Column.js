import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Col, Button} from "reactstrap";
import Task from "./Task";
import {connect} from "react-redux";
import {deleteColumn, getTasks} from "./redux/action";


function Column(props) {

const {columnList} = props

    useEffect(()=>{
        props.getAllTasks()
    },[]);


// const newTaskList = props.tasks.filter(el => el.status === columnList.status)
//     console.log(newTaskList)


    return (
        <div>
            <Col>
                {/*<h3>{columnList.title}</h3>*/}
                {props.tasks
                    .sort((a,b) =>b.priority - a.priority)
                    .filter(el => el.status === columnList.status)
                    .map(el =><Task key={el._id} taskList={el}/>)}
                    <hr/>
                {columnList.status !== 'todo' &&
                columnList.status !== 'progress' &&
                columnList.status !== 'review' &&
                columnList.status !== 'done' &&
                <Button onClick={() => props.deleteColumn(columnList._id)}>Delete column</Button>}
            </Col>
        </div>
    )
}


const mapStateToProps = (state) => ({
    tasks: state.taskList

});

const mapDispatchToProps = (dispatch) => ({

    getAllTasks: () => dispatch(getTasks()),
    deleteColumn: (columnId)=> dispatch(deleteColumn(columnId))
});


export default connect(mapStateToProps, mapDispatchToProps)(Column)