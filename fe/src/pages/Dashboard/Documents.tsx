import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Documents = () => {

  const [docs, setDocs] = useState<any[]>([]);

  const navigate = useNavigate()

  let token:any = localStorage.getItem("token")

  useEffect(()=>{

    if(!token){
      navigate('/login');
      return;
    }

  },[])

  useEffect(()=>{
    const fetchDocs = async()=>{
      console.log(import.meta.env.VITE_API_URL);

      try{
          const result = await axios.get(import.meta.env.VITE_API_URL,{
              headers : {
                "Authorization" : `Bearer ${token}`
              }
          })

          setDocs(result.data.data)
      }
      catch(err){
        console.log("error while fetching the data : " + err);
      }
    }

    fetchDocs()
  },[])

  return (
    <>
      <h1>Document</h1>

      {docs.map((doc)=>{
        return <div key={doc._id} onClick={()=>navigate(`/documents/${doc._id}`)} > 
          <p>{doc.title} </p>
          <p>{doc._id}</p>
        </div>
      })}
    </>
  )
}

export default Documents;
