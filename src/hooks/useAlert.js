import React , {useState}from 'react'

export const useAlert = () => {
  const [alert, setAlert] = useState({show:false, type:'danger', text:''});

  const showAlert = ( type='danger', text) => setAlert({show:true, type, text});
  const hideAlert = () => setAlert({show:false, type:'danger', text:''});

  return {alert, showAlert, hideAlert};
}
