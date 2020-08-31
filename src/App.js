import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {getColumns} from "./redux/action";
import {connect} from "react-redux";
import CreateTask from "./CreateTask";
import CreateColumn from "./CreateColumn";
import Column from "./Column"
import {Container} from "reactstrap";

function App(props) {

    useEffect(()=>{
        console.log('Hello useEffect')
        props.getAllColumns()
    },[]);

  return (
    <div className="App">
      <Container >
        <CreateTask/>{' '}
        <CreateColumn/>
        <hr/>
            {props.columns.map(el =><Column key={el._id} columns={el}/>)}
        </Container>
    </div>
  );
}
const mapStateToProps = (state) => ({
    columns: state.columnList,

});

const mapDispatchToProps = (dispatch) => ({

    getAllColumns: () => dispatch(getColumns())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
