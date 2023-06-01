import axios from 'axios';
import React, { useState, useEffect, useRef, useMemo, useCallback, useReducer } from 'react';
import DiaryEditor from './DiaryEditor';
import './App.css';
import DiaryList from './DiaryList';
import Lifecycle from './Lifecycle';
import OptimizeTest from './OptimizeTest';

// function App() {
//   const [users, setUsers] = useState([]);  // user 배열 상태 변수
//   const [error, setError] = useState(null);  // 오류 상태 변수

//   useEffect(() => {
//     axios.get('http://localhost:8000/accounts/system/user/')
//       .then(response => {
//         console.log(response.data);  // 응답 데이터 출력
//         setUsers(response.data);  // user 배열 상태 업데이트
//       })
//       .catch(error => {
//         console.error(error);  // 오류 처리
//         setError(error.message);  // 오류 상태 업데이트
//         console.log('123', error.code)
//         console.log('456', error.response.status)
//       });
//   }, []);  // 컴포넌트가 처음 렌더링될 때만 실행

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h2>hi</h2>
//         {error ? (
//           <p>Error: {error}</p>
//         ) : (
//           <ul>
//             {users.map(user => (
//               <li key={user.id}>{user.email}
//                 <ul key={user}>{user.status}</ul>
//                 <ul key={user}>{user.tel_no}</ul>
//               </li>
//             ))}
//           </ul>
//         )}
//       </header>
//     </div>
//   );
// }
// const dummyList = [
//   {
//     id:1,
//     author:"lsh",
//     content:"h1",
//     emotion:1,
//     created_date: new Date().getTime()
//   },
//   {
//     id:2,
//     author:"lsh2",
//     content:"h2",
//     emotion:2,
//     created_date: new Date().getTime()
//   },
//   {
//     id:3,
//     author:"lsh3",
//     content:"h3",
//     emotion:3,
//     created_date: new Date().getTime()
//   },
//   {
//     id:4,
//     author:"lsh4",
//     content:"h4",
//     emotion:4,
//     created_date: new Date().getTime()
//   },
//   {
//     id:5,
//     author:"lsh5",
//     content:"h5",
//     emotion:5,
//     created_date: new Date().getTime()
//   }
// ]

// https://jsonplaceholder.typicode.com/comments

const reducer = (state, action) => {
 switch(action.type){
  case 'INIT': {
    return action.data
  }
  case 'CREATE': {
    const created_date = new Date().getTime();
    const newItem = {
      ...action.data,
      created_date
    }
    return [newItem, ...state]
  }
  case 'DELETE': {
    return state.filter((it) => it.id !== action.targetId)
  }
  case 'UPDATE': {
    return state.map((it) => it.id === action.targetId? {...it, content: action.newContent} : it)
  }
  default : 
    return state
 }
}

export const DiaryStateContext = React.createContext()
export const DiaryDispatchContext = React.createContext();

function App() {

  const dataId = useRef(0)

  // const [data, setData] = useState([])
  const [data, dispatch] = useReducer(reducer, [])

  const getData = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => 
    res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random() * 5)+1,
        created_date : new Date().getTime(),
        id : dataId.current++
      }
    })
    dispatch({type:'INIT', data:initData})
  }

  useEffect(() =>{
     getData();
  }, [])


  const onCreate = useCallback((author, content, emotion) => {

    dispatch({type:'CREATE', data:{author, content, emotion, id:dataId.current}})

    const created_date = new Date().getTime();

    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current
    }
    dataId.current += 1
  },[]);

  const onDelete = useCallback((targetId) =>{
    dispatch({type:"DELETE", targetId})
  }, [])

  const onUpdate = useCallback((targetId, newContent) => {
    dispatch({type:"UPDATE", targetId, newContent})
  }, [])

  const memoizedDispatches = useMemo(() => {
    return {onCreate, onUpdate, onDelete}
  }, [])

  const getDiaryAnalysis = useMemo(
  () => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio};

  }, [data.length]
  );

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className='App'>
          {/* <OptimizeTest /> */}
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList />
          {/* <Lifecycle /> */}
        </div>
      </DiaryDispatchContext.Provider>
  </DiaryStateContext.Provider>
  )
}

export default App;