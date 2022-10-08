import React from 'react'

const test = () => {
  return (
    <div>test</div>
  )
}

export default test

/*import React from 'react'
import pdf2jsoncss from '../styles/component-modules/pdf2json.module.scss'


export const getStaticProps= async ()=>{

   const data=await fetch("https://jusoshd.uber.space/api/pdfparser");
   const json= await data.json()


  return {
    props: {
      data: json
    },
  }
}


const Test = ({data}) => {

  const text= []

  data.name.Pages.forEach((page)=>{
    text.push(...page.Texts)
    return(page.Texts)
  })


  return (
    <div className={pdf2jsoncss.container}>


 {text.map((item, index)=>{

  console.log(item.R[0].S);

const cssVariableValues= {
  "--pdf2json-fontsize":  `${item.R[0].TS[1]}px`,
  "--pdf2json-alignment": item.A,
}

 /*  React.useEffect(()=>{
     var root =  document.querySelector(':root');
     for(const key in cssVariableValues){
       root.style.setProperty(key,  cssVariableValues[key])
     }
   },[])*/

  /*const lockUp= {
    "%20": "ä",
    "%C3%A4": 'ä',
    "%C3%BC" : "ü",
    "%C3%9F" : "ß" 
  }*/

  /*for(const key in lockUp){
    var itemm = item.R[0].T.split(key).join(lockUp[key])
  }*/
 /* var itemm= item.R[0].T.split("%20").join(" ")
                          .split("%C3%A4").join("ä")
                          .split("%C3%BC").join("ü")
                          .split("%C3%B6").join("ö")
                          .split("%C3%9C").join("Ü")
                          .split("%C3%9F").join("ß")
                          .split("%E2%80%9E").join('')
                          .split("%2C").join(",")
                          .split("%C2%A7").join("§")


  return(
    <span className={pdf2jsoncss.indivwords} key={index}>
      {itemm}
    </span>
  )
 })}


</div>
  )
}

export default Test*/

