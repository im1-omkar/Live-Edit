import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

const DocumentEditor = () => {

  const { id } = useParams()


  const [content, setContent] = useState("")
  const [count, setCount] = useState(0)

  
  const ws = useRef<WebSocket | null>(null)

  
  useEffect(() => {

    ws.current = new WebSocket("ws://localhost:3000")

  
    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify({
        type: "join",
        docId: id
      }))
    }


    
    
    ws.current.onmessage = (event) => {

      const data = JSON.parse(event.data)

      if (data.type === "sync-contact") {
        setCount(data.room)
      }

      if (data.type === "sync-content") {
        setContent(data.content)
      }

    }


    return () => {
      ws.current?.close()
    }

  }, [])

  const handleChange = (e:any) => {


    const newContent = e.target.value

    
    setContent(newContent)

    
    ws.current?.send(JSON.stringify({
      type: "edit",
      content: newContent
    
    }))
  }

  return (
    <>
      <div>DocumentEditor</div>
      <div>Count : {count}</div>

      <textarea
        value={content}
        onChange={handleChange}
      />

    </>
  )
}

export default DocumentEditor