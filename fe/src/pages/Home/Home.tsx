import { useNavigate } from "react-router-dom"



const Home = () => {

    const navigate = useNavigate()

    return (<>
            <div>Live Edit</div>
            <button onClick={()=>{navigate("/signup")}}>Signup</button>  
            <button onClick={()=>{navigate("/login")}}>Login</button>
        </>
    )
}

export default Home