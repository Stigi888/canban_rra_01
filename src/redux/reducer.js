// import { v4 as uuidv4 } from 'uuid';

const initialState = {
    card: [
        // {_id:uuidv4(), name:'First', priority: 0, status: 'todo'},
        // {_id:uuidv4(), name:'Second', priority: 1, status: 'progress'},
        // {_id:uuidv4(), name:'Third', priority: 2, status: 'review'},
        // {_id:uuidv4(), name:'Fourth', priority: 3, status: 'done'}
    ],
    column:[
        // {_id:uuidv4(), title:"To Do", status:'todo'},
        // {_id:uuidv4(), title:"In progress", status:'progress'},
        // {_id:uuidv4(), title:"Review", status:'review'},
        // {_id:uuidv4(), title:"Done", status:'done'}
    ],

}

const task = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_TASKS':
            return {
                ...state,
                card: action.payload
            };

        case 'GET_COLUMNS':
            return {
                ...state,
                column: action.payload
            };

        default:
            return state;

    }
}
export default task;