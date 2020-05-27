import React from 'react';
import './App.css';
// eslint-disable-next-line
import { isConstructorDeclaration } from 'typescript';
// eslint-disable-next-line
import { render } from '@testing-library/react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

import StackedBar100Chart from "./views/column charts/Stacked Column 100 Chart";

// eslint-disable-next-line
class App extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {apiResponse:"", package:""}
  }

  async callAPI(nodePackage){
    this.setState({apiResponse:""});
    var apiBody = nodePackage;
    await fetch("http://localhost:9000/getPackageSize", {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify(apiBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(res => {
      this.setState({apiResponse: res});
      //console.log(this.state.apiResponse);
    });
  }

  handleClick() {
    var moduleVal = this.state;
    //console.log(moduleVal);
    this.callAPI(moduleVal);
  }

  handleChange(event){
    //console.log(event.target.value);
    this.setState({package: event.target.value});
  }

  render(){
    if(this.state.apiResponse){
      var barGraph = <StackedBar100Chart value={this.state.apiResponse}/>;
    }
    return (
      <div className="App">
        <Container>
          <div className="content">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
              Node Package Calculator
            </Navbar.Brand>
          </Navbar>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="enter a node module"
              aria-label="enter a node module"
              aria-describedby="basic-addon2"
              id = "module"
              onChange={this.handleChange}
            />
            <InputGroup.Append>
              <Button onClick={this.handleClick} variant="outline-secondary">search</Button>
            </InputGroup.Append>
          </InputGroup>
            {barGraph}
          </div>
        </Container>
      </div>
    );
  }
}
export default App;
