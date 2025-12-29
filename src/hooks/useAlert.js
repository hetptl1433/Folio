import React , {useState}from 'react'

export const useAlert = () => {
  const [alert, setAlert] = useState({show:false, type:'', message:''});
  return (
    <div>useAlert</div>
  )
}
