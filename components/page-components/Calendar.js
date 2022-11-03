import React from 'react'
import calcss from '../../styles/page-modules/calendar.module.scss'
import moment from 'moment';
import 'moment/locale/de';
import ExternalLinks from '../other-components/ExternalLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const Calendar = ({data}) => {
  console.log(data);
  const dataAttributes= data.data.attributes
  const[mapsCount, setMapsCount] = React.useState(-2)



  React.useEffect(()=>{
    var body= document.querySelector("#body")
    mapsCount!=-2? 
    body.classList.add('burgeropen'):body.classList.remove('burgeropen')
  },[mapsCount])
 
  return (
    <div className="container">
      <h1>{dataAttributes.title}</h1>
      <p>{dataAttributes.description}</p>
      <section className={calcss.entryContainer}>
        {dataAttributes.calendar_entries.data.map((item, index)=>{
          var filteredUrl
          const pattern= /(https.*?")/
          {item.attributes.googleMaps!=null? filteredUrl= item.attributes.googleMaps.match(pattern): ""}

          moment.locale('de')

          let m= moment(item.attributes.date, moment.ISO_8601)
          let formatedDate= m.format("dddd, DD MMMM YYYY, h.mm A") 

          return(
            <div key={index} className={calcss.entryBox} >

              <div className={calcss.titleAndDate}>
                <h2 className={calcss.entryTitle}>{item.attributes.title}</h2>
                <h3 className={calcss.date}>{formatedDate}</h3>

                {item.attributes.location!=null ?
                <h3>Treffpunkt: {item.attributes.location}</h3>
                :<div></div>
                 }

            {item.attributes.googleMaps!=null? 
                <button onClick={()=>{mapsCount==index? setMapsCount(-2) : setMapsCount(index)}}>
                <FontAwesomeIcon className={calcss.locationDot} icon={faLocationDot}/>
              </button>
               :<div></div>
              }

              </div>

              <div className={calcss.subtitleAndText}>
                {item.attributes.subtitle!=null? <h3>{item.attributes.subtitle}</h3>: <div></div>}
                 <p>{item.attributes.description}</p>
                 {item.attributes.links.map((item, index)=>{ return(<ExternalLinks key={index} data={item}/>)})}
              </div>

              <div onClick={()=>{if(mapsCount!=-1){setMapsCount(-2)}}} className={index==mapsCount? "overlay": "none"}>
  
              {item.attributes.googleMaps!=null? 
                <iframe 
                className={index== mapsCount ? calcss.googleMaps: calcss.googleMapsClosed}
                src={filteredUrl[0]} 
                width="600" height="450"  
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              :<div></div>
              }
               </div>
          </div>
          )  

    })}
    </section>
      <div className="lastupdated">{data.data.attributes.updatedAt}</div>
      
    </div>
  )
}

export default Calendar