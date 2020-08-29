import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Alert, Card, Col, CardBody, Button} from "reactstrap";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import connect from "react-redux/lib/connect/connect";
import mapStateToProps from "react-redux";

function Task(props){

    const alertColors = ["success", "warning", "danger"]


    return(
        <div>
            <Col>
                <Card>
                    <CardBody>
                        {props.task.name}
                        <Alert color={alertColors[props.task.priority]}>
                            {props.task.priority}
                            {props.task.priority !== 2 &&
                            <Button size='sm' onClick={}}>

                                </Alert>

                                </CardBody>
                                </Card>
                                </Col>
                                </div>
  )
}



const mapStateToProps = (state) => ({
    task: state.task
});




export default connect(mapStateToProps, mapDispatchToProps)(Task)

