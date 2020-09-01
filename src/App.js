import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {getColumns} from "./redux/action";
import {connect} from "react-redux";
import CreateTask from "./CreateTask";
import CreateColumn from "./CreateColumn";
import Column from "./Column"
import {Row, Container} from "reactstrap";

function App(props) {

    useEffect(()=>{
        console.log('Hello useEffect')
        props.getAllColumns()
    },[]);

  return (
    <div className="App">
      <Container >
          <Row>
        <CreateTask/>{' '}
        <CreateColumn/>
          </Row>
        <hr/>
        <Row>
            {props.column.map(el =><Column key={el._id} column={el}/>)}
        </Row>
        </Container>
    </div>
  );
}
const mapStateToProps = (state) => ({
    column: state.column,

});

const mapDispatchToProps = (dispatch) => ({

    getAllColumns: () => dispatch(getColumns())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
