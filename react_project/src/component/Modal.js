import './Modal.css'

const modal = function Modal(props) {
  return (
    <div className='modal'>
      <h4>{props.title}</h4>
      <p>생성일 : {props.date}</p>
      <p>좋아요 : {props.like}</p>
      <p>상세 내용 : </p>

      <input value={props.fixInputText} onChange={e => props.setFixInputText(e.target.value)} /> <button onClick={setItem(props, props.id)}>재발행</button>
    </div>
  )
}

const setItem = function (props, id) {
  if (props.fixInputText === "") return;
  return function () {
    props.setComment(props.comment.map(
      comments => props.comment[id] === comments ? { ...comments, title: props.fixInputText } : comments
    ))
    props.setFixInputText("")
  }

}

export default modal;