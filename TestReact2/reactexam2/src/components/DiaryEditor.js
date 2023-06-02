
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const env = process.env
env.PUBLIC_URL = env.PUBLIC_URL || "";

const emotionList = [
    {
        emotion_id : 1,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion1.png`,
        emotion_descript: '완전 좋음'
    },
    {
        emotion_id : 2,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion2.png`,
        emotion_descript: '좋음'
    },
    {
        emotion_id : 3,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion3.png`,
        emotion_descript: '그럭저럭'
    },
    {
        emotion_id : 4,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion4.png`,
        emotion_descript: '나쁨'
    },
    {
        emotion_id : 5,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion5.png`,
        emotion_descript: '끔찍함'
    },
]

const getStringDate = (date) => {
    return date.toISOString().slice(0, 10)
}

const DiaryEditor = ({isEdit, originData}) => {

    const contentRef = useRef();;
    const [content, setContent] = useState("");
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));
    const navigate = useNavigate()
    const {onCreate, onEdit} = useContext(DiaryDispatchContext);


    const handleClickEmote = (emotion) => {
        setEmotion(emotion);
    }

    const handleSubmit = () =>{
        if(content.length < 1){
            contentRef.current.focus();
            alert('글을 입력해주세요')
            return ;
        }
        if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"))
        if(!isEdit){
            onCreate(date, content, emotion)
            
        }else{
            onEdit(originData.id, date, content, emotion)
        }
        navigate("/", {replace:true})
    }


    useEffect(() => {
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))))
            setEmotion(originData.emotion)
            setContent(originData.content)
        }
    }, [isEdit, originData])

    return (
        <div className="DiaryEditor">
            <MyHeader headText= {isEdit ? "일기 수정하기" : "새일기 쓰기"} leftChild={<MyButton text={'뒤로가기'} onClick={() => navigate(-1)}/>}/>
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box"></div>
                        <input className="input_date"
                            value={date}
                            onChange={(e)=> setDate(e.target.value)}
                            type="date"/>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (<EmotionItem key={it.emotion_id} 
                        {...it} onClick={handleClickEmote}
                        isSelected = {it.emotion_id === emotion}
                        />))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box_text_wrapper">
                        <textarea
                        placeholder="오늘은 어땠나요?"
                        ref={contentRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={'취소 완료'} onClick={() => {navigate(-1)}}/>
                        <MyButton text={'작성완료'} type={'positive'} onClick={handleSubmit}/>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DiaryEditor;