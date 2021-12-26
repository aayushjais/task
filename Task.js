import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import { Col, Row } from "react-bootstrap";
import Logo from "../Assets/logo1.png";
import "./Task.css"
class Task extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFetching: false,
      data: [],
      isError: false,
      comapanyType: ''
    }
  }

  getData = () => {
    this.setState({ isFetching: true })
    const url = 'https://www.reddit.com/r/reactjs.json'
    axios.get(url)
      .then(res => {
        console.log(res)
        this.setState({ isFetching: false, data: [res.data] })
      })
      .catch(err => {
        console.log(err)
        this.setState({ isFetching: false })
      })
  }
  componentDidMount() {
    this.getData()
  }

  render() {
    const { isFetching, data, isError } = this.state;
    const htmlDecode = content => {
      let e = document.createElement("div");
      e.innerHTML = content;
      return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    };
    return (

      <div>
      <div style={{display:'flex'}}>
        <img
          src={Logo}
          style={{ width: 100, height:50 }}
          alt="Logo"
        />
        <h1 style ={{marginLeft:"25%", fontWeight:"bold"}}>Task for React Js Developer</h1>
        </div>
        {/* cards */}
        <div class="container">
      {data.map((entry, index) => (
      <div class="row" key={index}>
      {entry.data.children.map((e, i) => (
        <div class="card">
          <div class="card-header" key={i}>
            <h1> {e.data.title}</h1>
          </div>
          <div class="card-body">
            <p>
            <div dangerouslySetInnerHTML={{ __html:htmlDecode( e.data.selftext_html)}} />
            </p>
            <a href="#" class="btn"> {e.data.url}</a>
            <p> {e.data.score}</p>
          </div>
        </div>
        ))}
      </div>
      ))}
    </div>
    
        {/* {data.map((entry, index) => (
          <Row xs={1} md={2} className="g-4" key={index}>
              <Col>
                {entry.data.children.map((e, i) => (
                  <Card className="mt-3">
                    <Card.Body>
                      <Card.Title key={i}>
                        {e.data.title}
                      </Card.Title>
                     
                      <Card.Text>
                        <div dangerouslySetInnerHTML={{ __html:htmlDecode( e.data.selftext_html)}} />
                        <br />
                        <br />
                        {e.data.url}
                        <br />
                        <br />
                        {e.data.score}

                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
          
          </Row>
        ))} */}
      </div>
    );
  }
}

export default Task;