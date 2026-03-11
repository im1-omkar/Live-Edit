import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const DocumentEditor = () => {

  const {id} = useParams()

  const [content, setContent] = useState("")
  const [count, setCount] = useState(0)

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:3000")

    ws.onopen = (()=>{
      ws.send(JSON.stringify({
        type:"join",
        docId:id
      }))
    })

    ws.onmessage = (event)=>{
      const data = JSON.parse(event.data)

      if(data.type === "sync"){
        setContent(data.content)
        setCount(data.count)
      }
    }

  },[])

  return (
    <>
      <div>DocumentEditor</div>
      <div>Count : {count}</div>
      <textarea
          value={content}
          onChange={(e)=>setContent(e.target.value)}
      />
    </>
  )
}

export default DocumentEditor