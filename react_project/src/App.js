
// import Like from './handler/Like.js'
import './App.css';
import { useState } from 'react';
import Modal from './component/Modal.js'


function App() {

  const [comment, setComment] = useState([
    { title: '남자 코트 추천', date: "2월 18일", like: 2, now: new Date().toLocaleString() },
    { title: '강남 우동 맛집', date: "2월 18일", like: 0, now: new Date().toLocaleString() },
    { title: '자스는 바보다', date: "2월 18일", like: 4, now: new Date().toLocaleString() },
  ]
  )
  const [inputText, setInputText] = useState("");
  const [fixInputText, setFixInputText] = useState("");
  const [modal, setModal] = useState([false, false, false])
  const now = new Date().toLocaleString();
  const [id, setId] = useState(0);
  const handler = (event) => {
    const { value, name } = event.target
    // setComment 
  }

  // const like = function (index) {
  //   return function () {
  //     comment[index].like++
  //     setComment([...comment])
  //   }
  // }
  const like = (index) => () => {
    setComment(comment.map(
      comments => comment[index] === comments ? { ...comments, like: comment[index].like + 1 } : comments
    ))
  }

  const deleteItem = (index) => () => {
    setComment(comment.filter(comments => comment[index] !== comments))
  }

  const createItem = () => {
    if (inputText === "") return;
    setComment([{ title: inputText, date: now, like: 0, now: now }, ...comment])
    setInputText("")
  }

  const sortItems = () =>
    () => {
      let copy = [...comment];
      copy.sort(function (a, b) {
        if (a.title > b.title) {
          return 1
        } else if (a.title < b.title) {
          return -1
        } else {
          return 0
        }
      })
      setComment(copy);
    }

  const modalCheck = (i) => () => {
    let copy = [...modal];
    copy = copy.map(
      modals => !copy[i] && modals === true ? modals = false : modals)
    copy[i] = !copy[i];
    setModal(copy);
    setId(i);
    console.log(modal)
  }
  return (
    <div className="App">
      <div className="black-nav">
        <h4> ReactBlog </h4>
      </div>
      <button onClick={sortItems()}>가나다순 정렬</button>
      {comment.map((item, i) => {
        return (
          <div className='list' key={i} >
            <h4 onClick={modalCheck(i)}>{item.title}</h4>
            <button onClick={like(i)}
            >좋아요
            </button> {item.like} <span>생성일: {item.date} <button onClick={deleteItem(i)}>삭제</button></span>

            {
              modal[i] === true ?
                < Modal
                  id={id}
                  comment={comment}
                  setComment={setComment}
                  fixInputText={fixInputText}
                  setFixInputText={setFixInputText}
                  title={item.title}
                  date={item.date}
                  like={item.like}
                /> : null
            }

          </div>

        )
      })
      }
      <input value={inputText} onChange={e => setInputText(e.target.value)} />
      <button onClick={createItem}>글발행</button>




    </div>
  )


}
export default App;
