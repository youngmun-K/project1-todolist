import React, { useState } from "react";
import "./App.css";

function Todo(props) {
  return (
    <div>
      <div className="card-style">
        <div>
          <h2>{props.list.title}</h2>
          <div>{props.list.content}</div>

          <div className="allButton-style">
            <button
              className="deleteButton-style"
              onClick={() => {
                props.handleDelete(props.list.id);
              }}
            >
              삭제하기
            </button>

            {props.list.isDone === false ? (
              <button
                className="todoButton-style"
                onClick={() => props.handleIsdone(props.list.id)}
              >
                완료
              </button>
            ) : (
              <button
                className="todoButton-style"
                onClick={() => props.handleIsdone(props.list.id)}
              >
                취소
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
function App() {
  const [lists, setLists] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState([]);

  const addListHandler = (event) => {
    event.preventDefault();

    const newList = {
      id: lists.length + 1,
      title: title,
      content: content,
      isDone: false,
    };

    setLists([...lists, newList]);
  };

  const deleteListHandler = (id) => {
    const newTodoList = lists.filter((list) => list.id !== id);
    setLists(newTodoList);
  };

  const isDoneHandler = (id) => {
    const isDoneLists = lists.map((list) => {
      if (list.id === id) {
        //클릭했을 때 전체 id값과 클릭한 id값이 같을때>
        //많은 객체리스트 중에 하나가 선택됨>map이 돌고 있기 때문에
        const updateList = {
          //이걸 만든다.
          ...list, //propertys
          isDone: !list.isDone, //true or false
        };
        return updateList; // 바뀐 요소(전체 배열 리턴이 아니다)
      } //else
      return list;
    });

    setLists(isDoneLists);
  };

  return (
    <div className="layout-style">
      <div className="head-style">
        <p>My Todo List</p>
        <p>React</p>
      </div>
      <form className="form-style" onSubmit={addListHandler}>
        <label className="label-style">제목</label>
        <input
          className="input-style"
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          value={title}
        ></input>
        <label className="label-style">내용</label>
        <input
          className="input-style"
          onChange={(event) => setContent(event.target.value)}
          type="text"
          value={content}
        ></input>

        <button className="addButton-style" onClick={addListHandler}>
          추가하기
        </button>
      </form>

      <h2>Working.. 🔥</h2>
      <div className="card-wrapper style">
        {lists.map((data) => {
          if (data.isDone === false) {
            return (
              <Todo
                handleIsdone={isDoneHandler}
                handleDelete={deleteListHandler}
                key={data.id}
                list={data}
              ></Todo>
            );
          }
        })}
      </div>
      <h2>Done..!</h2>
      <div className="card-wrapper style">
        {lists.map((data) => {
          if (data.isDone === true) {
            return (
              <Todo
                handleIsdone={isDoneHandler}
                handleDelete={deleteListHandler}
                key={data.id}
                list={data}
              ></Todo>
            );
          }
        })}

        {/* isDone과 list.isDone이 같을때 여기에 상자가 나와야하는데
        이걸....어떻게..?
        isDone: list.isDone, */}
      </div>
    </div>
  );
}

export default App;
