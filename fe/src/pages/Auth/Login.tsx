import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate()

  const handeLogin = async(email:any, password:any)=>{
    const result  =  await axios.post("http://localhost:3000/api/auth/signin",{
      "email":email,
      "password":password
    })

    localStorage.setItem("token",result.data.token) 
    
    navigate("/documents")
  }

  return (
    <>
      <div>Login</div>
      <input type="text" placeholder="email" onChange={(e:any)=>{setEmail(e.target.value)}}/><br/>
      <input type="text" placeholder="password" onChange={(e:any)=>{setPassword(e.target.value)}}/><br/><br/>
      <button onClick={()=>{handeLogin(email,password)}}>Submit</button>
    </>
  )
}

export default Login