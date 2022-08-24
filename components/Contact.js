import {useState, useEffect} from 'react'
import formcss from '../styles/component-modules/form.module.scss'

export default function Contact({data}) {
  const formData= data.data.attributes.form.data[0].attributes
  const inputs= formData.inputs
  const title= formData.title
  



  const handleSubmit= async (e)=>{
    e.preventDefault();
    const formData={}

    const targetElementsFiltered= Array.from(e.currentTarget.elements).filter((item) => item.name);
    
      targetElementsFiltered.forEach((item)=>{
      formData[item.name]= e.target[item.name].value;
  
    });
  

    fetch('/api/contact',{
      method:"POST",
      body: JSON.stringify(formData)
    })
  }

    return (
      <>
		<form onSubmit={handleSubmit} className={formcss.container}>
    
    <div className={formcss.inputcontainer}>
    <h1 className={formcss.title}>{title}</h1>
        {inputs.map((item)=>{
          const {label, type, id}= item

          if(item.type=="textarea"){
            return(
              <div key={id}>
              <h3>{label}</h3>
              <textarea
                required
                className={formcss.textarea}
                name= {label}
                id={label}
               /* value= {state[label].val}
                onChange={(e) => {
                  state[label].func(e.target.value)}}*/
                >
              </textarea>
              </div>
            )

          }
          else{
            return(
            <div key={id}>
              <h3>{label}</h3>
              <input
                type= {type}
                required
                name= {label}
                id={label}
                className={formcss.inputs}
                /*value= {state[label].val}
                onChange={(e) => {
                  state[label].func(e.target.value)}}*/
                >
              </input>
            </div>
            )}
          })}
          </div>
        
            <button type="submit" className={formcss.submit}>
              Submit
            </button>
        </form>
        
        </>
	)
}



