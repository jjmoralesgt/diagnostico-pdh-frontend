import React, { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import Main from './components/Layout/Main';
import { Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  return (
    <React.Fragment>
      <Container fluid="md">
        <Header />
        <Main />
      </Container>
    </React.Fragment>
  );
}
export default App;
