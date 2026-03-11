

const success = (data:any)=>{
    return {
        "success": "true",
        "data" : data,
        "error": null
    }
}

const error  = (mssg : String)=>{
    return {
        "success": "false",
        "data":null,
        "error":mssg
    }
}

const responses = {
    "success" : success,
    "error" : error
}

export default responses