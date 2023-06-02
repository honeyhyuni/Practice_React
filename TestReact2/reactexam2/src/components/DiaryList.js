import { useState } from "react"
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
    {value:"lastest", name:"최신순"},
    {value:"oldest", name:'오래된 순'},
];

const filterOptionList = [
    {value: 'all', name:'전부다'},
    {value: 'good', name:'좋은 감정만'},
    {value: 'bad', name:'안좋은 감정만'},

]

const ControlMenu = ({value, onChange, optionList}) => {
    return (
        <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
            {optionList.map((it, idx) => <option key={idx} value={it.value}>{it.name}</option>)}
        </select>
    )
}



const DiaryList = ({diaryList}) => {

    const [sortType, setSortType] = useState('lastest');
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    const getProcessedDiaryList = () => {

        // 감정 필터
        const filterCallBack = (item) => {
            if(filter === 'good'){
                return parseInt(item.emotion) >= 3
            }
            return parseInt(item.emotion) < 3
        }

        // 최신순, 오래된순 정렬
        const compare = (a, b) => {
            if(sortType === 'lastest'){
                return parseInt(b.date) - parseInt(a.date)
            }
            return parseInt(a.date) - parseInt(b.date)
        }

        const copyList = JSON.parse(JSON.stringify(diaryList))

        const filterList = filter == 'all' ? copyList : copyList.filter((it) => filterCallBack(it))

        const sortedList = filterList.sort(compare)
        return sortedList
    }



    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList}/>
                    <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList}/>
                </div>
                <div className="right_col">
                    
            <MyButton type={'positive'} text={'새 일기 쓰기'} onClick={() => navigate('/new')}/>
                </div>
            </div>
            {getProcessedDiaryList().map((it) => (

                <DiaryItem key={it.id} {...it}/>
            ))}
        </div>
    )
}

DiaryList.defaultProps={
    diaryList:[],
}

export default DiaryList