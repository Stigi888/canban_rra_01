import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Controller from "./Controller";
import connect from "react-redux";

function App(props) {

    useEffect(()=>{
        console.log('Hello useEffect')
        props.getList()
    },[]);

  return (
    <div>
      <Container >
        <Row>
        <Controller/>



        </Row>
      </Container>

    </div>
  );
}
const mapStateToProps = (state) => ({
    tasks: state.tasks,

});

const mapDispatchToProps = (dispatch) => ({

    getList: () => dispatch(getTodos())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
