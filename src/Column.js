import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Col} from "reactstrap";
import Task from "./Task";

function Column(props) {



    return (
        <div>
            <Col>
                <h3>{props.column.title}</h3>

            </Col>
        </div>
    )


}
