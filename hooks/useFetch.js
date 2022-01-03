import {useState, useEffect} from 'react'

const useFetch = (url) => {
   const [data, setData]= useState([])
    const [loading, setLoading]=useState(true)

    useEffect(()=>{
        setLoading(true)
        const fetchData=async ()=> {
            const res= await fetch(url)
            const json= await res.json()
            setData(json)
            setLoading(false)
        }
        fetchData()
    },[])
    return ({data, loading})
}

export default useFetch
