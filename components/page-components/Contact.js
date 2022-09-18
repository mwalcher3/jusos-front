import React from 'react'
import formcss from '../../styles/component-modules/form.module.scss'

export default function Contact({data}) {
  const formData= data.data.attributes.form.data[0].attributes
  const inputs= formData.inputs
  const title= formData.title
  const [submitActive, setSubmitActive] = React.useState(false)
  
  
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const formData={}

    setSubmitActive(true)
    setTimeout(()=>{setSubmitActive(false)}, 2300)

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

                >
              </input>
            </div>
            )}
          })}
          </div>

            <button type="submit" className={formcss.submitButton + " " + (submitActive? formcss.active: "")}>
              <svg  className={formcss.btnLayer}>
                <path d="M136,77.5c0,0-11.7,0-12,0c-90,0-94.2,0-94.2,0s-10.8,0-25.1,0c-0.2,0-0.8,0-0.8,0c-2.2,0-4-1.8-4-4v-47  c0-2.2,1.8-4,4-4c0,0,0.6,0,0.9,0c39.1,0,61.1,0,61.1,0s3,0,69.1,0c0.2,0,0.9,0,0.9,0c2.2,0,4,1.8,4,4v47  C140,75.7,138.2,77.5,136,77.5z"/>
              </svg>
              <svg className={formcss.plane}>
                <use xlinkHref="#plane" ></use>
              </svg>
              <ul>
                <li>Versenden</li>
                <li>Danke!</li>
              </ul>
            </button>


          {/* SVG*/}
          <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
            <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100" id="btn-layer" preserveAspectRatio="none">
              <path d="M133,77.5H7c-3.9,0-7-3.1-7-7v-41c0-3.9,3.1-7,7-7h126c3.9,0,7,3.1,7,7v41C140,74.4,136.9,77.5,133,77.5z"/>
            </symbol>
            <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 26" id="plane" preserveAspectRatio="none">
              <path d="M5.25,15.24,18.42,3.88,7.82,17l0,4.28a.77.77,0,0,0,1.36.49l3-3.68,5.65,2.25a.76.76,0,0,0,1-.58L22,.89A.77.77,0,0,0,20.85.1L.38,11.88a.76.76,0,0,0,.09,1.36Z" />
            </symbol>
          </svg>
        
        </form>
        <div className="lastupdated">{data.data.attributes.updatedAt}</div>
        </>
	)
}



