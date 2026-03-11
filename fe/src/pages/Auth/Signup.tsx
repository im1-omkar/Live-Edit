import axios from "axios"
import { useState } from "react"

const Signup = () => {
  const [userName, setUserName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const handleSignup = async(userName:any, email:any, password:any)=>{
    const result = await axios.post("http://localhost:3000/api/auth/signup",{
      "userName":userName,
      "email":email,
      "password":password
    })

    console.log(result.data)
  }

  return (
    <>
      <h1>Signup</h1>
      <input type="text" placeholder="userName" onChange={(e:any)=>{setUserName(e.target.value)}}/><br/>
      <input type="text" placeholder="email" onChange={(e:any)=>{setEmail(e.target.value)}}/><br/>
      <input type="password" placeholder="password" onChange={(e:any)=>{setPassword(e.target.value)}}/>
      <br/><br/>
      <button onClick={()=>{handleSignup(userName,email,password)}}>Submit</button>
    </>
  )
}

export default Signup