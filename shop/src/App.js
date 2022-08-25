import './App.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useState } from "react";
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './Detail.js'
import axios from 'axios'

function App() {

  const [shoes, setShoes] = useState(data);
  const navigate = useNavigate();
  let [clickCount, setClickCount] = useState(2);
  const [loading, setLoading] = useState("로딩중입니다")

  return (
    <div className="App">
      <button onClick={() => {
        console.log(loading);
        setClickCount(clickCount++);
        axios.get(`https://codingapple1.github.io/shop/data${clickCount}.json`)

          .then((result) => {
            setLoading("로딩완료");
            console.log(loading);
            setShoes([...shoes, ...result.data]);
          })
          .catch(() => {
            console.log("실패함")
          })
      }}>버튼</button>


      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}> 홈 </Nav.Link>
            <Nav.Link onClick={() => navigate('/detail')}> 상세페이지 </Nav.Link>
          </Nav>
        </Container>
      </Navbar>




      <Routes>
        <Route path="/" element={
          <>
            <div className='main-bg'></div>
            <div className="container">
              <div className='row'>
                {
                  shoes.map((a, i) => {
                    return (
                      <Card shoes={shoes[i]} title={i} key={i}></Card>
                    )
                  })
                }
              </div>
            </div>
          </>
        }
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="*" element={<div>없는 페이지입니다</div>} />
      </Routes>


    </div>
  );
}

function Card(props) {
  return (
    <div className='col-md-4'>
      <img src={`https://codingapple1.github.io/shop/shoes${props.title + 1}.jpg`} alt={`신발${props.title + 1}`} width="80%"></img>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div >
  )
}

export default App;
