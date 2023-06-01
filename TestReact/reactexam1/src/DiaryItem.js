import React, { useContext, useEffect, useRef, useState } from "react";
import {DiaryDispatchContext} from "./App"

const DiaryItem = ({author, content, created_date, emotion, id}) => {
    
    const {onUpdate, onDelete} = useContext(DiaryDispatchContext);


    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);

    const [localContent, setLocalContent] = useState(content);

    const localContentInput = useRef();

    const handleDelete = () =>{
        if(window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)){
            onDelete(id);
        }
    }

    const handleQuitEdit = () =>{
        setIsEdit(false);
        setLocalContent(content);
    }

    const handleUpdate = () => {
        if(localContent.length < 5){
            localContentInput.current.focus();
            return;
        }
        onUpdate(id, localContent);
        toggleIsEdit()
    }


    return(
        <div className="DiaryItem">
            <div className="Info">
                <span>작성자 : {author} | 감정 : {emotion}</span>
                <br />
                <span className="content">{isEdit ?  (
                <>
                    <textarea ref={localContentInput} value={localContent} onChange={(e) => setLocalContent(e.target.value)}/>
                </> ) : (
                <>{content}</>)
                }</span>
                <br />
                <div className="date">작성일자 : {new Date(created_date).toLocaleDateString()}</div>
                {isEdit? (
                <>
                    <button className="delete" onClick={handleQuitEdit}>수정 취소</button>
                    <button className="update" onClick={handleUpdate}>수정 완료</button>
                </>)
                    :
                (<>
                    <button className="delete" onClick={handleDelete}>삭제</button>
                    <button className="update" onClick={toggleIsEdit} >수정</button>
                </>)}
                
            </div>
        </div>
    )

}

export default React.memo(DiaryItem)