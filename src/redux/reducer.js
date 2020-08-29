import { v4 as uuidv4 } from 'uuid';
import {useState} from "react";

const initialState = {
    taskList: [
        {_id:uuidv4(), name:'First', priority: 0, status: 'todo'},
        {_id:uuidv4(), name:'Second', priority: 1, status: 'todo'},
        {_id:uuidv4(), name:'Third', priority: 2, status: 'todo'},
        {_id:uuidv4(), name:'Fourth', priority: 3, status: 'todo'}
    ],
    columnList:[
        {_id:uuidv4(), title:"To Do", status:'todo'},
        {_id:uuidv4(), title:"In progress", status:'progress'},
        {_id:uuidv4(), title:"Review", status:'review'},
        {_id:uuidv4(), title:"Done", status:'done'}
    ],

}

const statuses = ['todo', 'progress', 'review','done']

 const taskPriority = [0,1,2,3]

const [tasks, setTasks] = useState(state.taskList)




const task = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_TASKS':
            return {
                ...state,
                taskList: action.payload
            };

        case 'DELETE_TASK':
            return {
                ...state,

            };

        case "ADD_NEW_TASK":
            return {
                ...state,
                taskList: [...state.taskList, {
                    _id: uuidv4(),
                    name: action.payload,
                    status: 'todo',
                    priority: 0}]
            };

        case "CREATE_COLUMN":
            return {
                ...state,
                taskList: [...state.columnList, {
                    _id: uuidv4(),
                    title: action.payload,
                    status: action.payload, }]
            };


        default:
            return state;

    }
}
export default task;