import { useEffect, useState } from "react"

const UnmountTest = () => {

    useEffect(() => {
        console.log("Mount");

        return () => {
            // Unmount 시점에 실행
            console.log("UnMount");
        };
    }, []);

    return <div>Unmount Testing Component</div>
};


const Lifecycle = () =>{

    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => setIsVisible(!isVisible);


    // useEffect -> [] 안의 값이 변경될 시에만 호출
    // useEffect(() => {}, []) => Default 



    return(
        <div style={{padding:20}}>
            <button onClick={toggle}>ON/OFF</button>
            {isVisible && <UnmountTest />}
        </div>
    )
}

export default Lifecycle