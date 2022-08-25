import './App.css';
import { useState } from 'react';

function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState("")
  let [날짜값, 날짜값변경] = useState(["2월 18일", "2월 17일", "2월 17일"])
  let [수정입력값, 수정입력값변경] = useState("");
  let 현재시각 = new Date().toLocaleString();

  return (
    <div className="App">
      <div className="black-nav">
        <h4> ReactBlog </h4>
      </div>
      <button onClick={() => {
        let copyData = [...글제목];
        copyData.sort();
        글제목변경(copyData);
      }}>가나다순 정렬</button>

      <button onClick={() => {
        let copy = [...글제목];
        copy[0] = '여자코트 추천';
        글제목변경(copy);
      }}>글수정</button>
      {
        글제목.map((a, i) => {
          return (
            <div className="list" key={i}>
              <h4 onClick={() => { setModal(!modal); setTitle(i) }}>{a}
                <button onClick={(e) => {
                  e.preventDefault();
                  let copy = [...따봉]
                  copy[i] = copy[i] + 1;
                  따봉변경(copy)
                }} style={{ cursor: 'pointer' }}> 좋아요 </button> <span>{따봉[i]}</span>
              </h4>
              <p>{날짜값[i]}</p>
              <button onClick={() => {
                let copy = [...글제목];
                let copy따봉 = [...따봉]
                copy.splice(i, 1);
                copy따봉.splice(i, 1);
                글제목변경(copy);
                따봉변경(copy따봉);
              }} style={{ cursor: 'pointer' }}>삭제</button>
            </div>
          )

        })
      }

      <input value={입력값} onChange={(e) => 입력값변경(e.target.value)} />
      <button onClick={() => {
        if (입력값 === "") return;
        let copy = [...글제목];
        let copy따봉 = [...따봉];
        let copy날짜 = [...날짜값];

        copy.unshift(입력값);
        copy따봉.unshift(0);
        copy날짜.unshift(현재시각);


        글제목변경(copy);
        따봉변경(copy따봉);
        날짜값변경(copy날짜);
        입력값변경("");
      }}>글발행</button>


      {
        modal === true && (
          <Modal
            title={title}
            setTitle={setTitle}
            글제목변경={글제목변경}
            수정입력값변경={수정입력값변경}
            날짜값변경={날짜값변경}
            수정입력값={수정입력값}
            글제목={글제목}
            날짜={날짜값}
          />)
      }
    </div >
  );
}
function Modal(props) {


  return (
    <div className='modal'>
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜 : {props.날짜[props.title]}</p>
      <p>상세 내용 : </p>

      <input value={props.수정입력값} onChange={(e) => props.수정입력값변경(e.target.value)} />


      <button onClick={() => {
        if (props.수정입력값 === "") return;
        let copy = [...props.글제목];
        // let copy따봉 = [...따봉];
        let copy날짜 = [...props.날짜];

        copy.splice(props.title, 1, props.수정입력값);
        copy날짜.splice(props.title, 1, props.현재시각);



        props.글제목변경(copy);
        // 따봉변경(copy따봉);
        props.날짜값변경(copy날짜);
        // Hint
        // props.글제목변경({ ...copy, [props.글제목[props.title]]: props.수정입력값 })
      }
      }>글수정</button>
    </div >
  )

}
export default App;
