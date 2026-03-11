import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Documents = () => {

  const [docs, setDocs] = useState<any[]>([]);

  const token = localStorage.getItem("token")

  const navigate = useNavigate()

  useEffect(()=>{
    const fetchDocs = async()=>{

      const result = await axios.get("http://localhost:3000/api/documents",{
          headers : {
            "Authorization" : `Bearer ${token}`
          }
      })

      setDocs(result.data.data)
    }

    fetchDocs()
  },[])

  return (
    <>
      <h1>Document</h1>

      {docs.map((doc)=>{
        return <div key={doc._id} onClick={()=>navigate(`/document/${doc._id}`)} > 
          <p>{doc.title} </p>
          <p>{doc._id}</p>
        </div>
      })}
    </>
  )
}

export default Documents