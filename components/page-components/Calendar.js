import React from 'react'
import calcss from '../../styles/page-modules/calendar.module.scss'
import moment from 'moment';
import 'moment/locale/de';
import ExternalLinks from '../other-components/ExternalLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";

const Calendar = ({data}) => {
  const dataAttributes= data.data.attributes
  const[mapsCount, setMapsCount] = React.useState(-2)



  React.useEffect(()=>{
    var body= document.querySelector("#body")
    mapsCount!=-2? 
    body.classList.add('burgeropen'):body.classList.remove('burgeropen')
  },[mapsCount])

  const sortedEvents  =  dataAttributes.calendar_entries.data.sort((a,b) => new moment(b.attributes.date).format('YYYYMMDD') - new moment(a.attributes.date).format('YYYYMMDD') )
 
  return (
    <div className="container">
      <h1 className="header">{dataAttributes.title}</h1>
      <ReactMarkdown className="paragraph"rehypePlugins={[rehypeRaw]}>{dataAttributes.description}</ReactMarkdown>
      <section className={calcss.entryContainer}>
        {sortedEvents.map((item, index)=>{
          var filteredUrl
          const pattern= /(https.*?")/
          {item.attributes.googleMaps!=null? filteredUrl= item.attributes.googleMaps.match(pattern): ""}

          moment.locale('de')

          const date= item.attributes.date
          const expireAfter= item.attributes.expireAfterEventInDays
          let event= moment(date, moment.ISO_8601)
          let expiresAt= event.clone()
          expiresAt.add(expireAfter!=null? expireAfter: 2, 'days')
          
          var todayDate = moment(moment().format('H-DD-MM-YYYY'), 'H-DD-MM-YYYY');
          var expiredDate = moment(expiresAt.format('H-DD-MM-YYYY'), `H-DD-MM-YYYY`);
          var eventDate = moment(event.format('H-DD-MM-YYYY'), `H-DD-MM-YYYY`);
        
          var diffTodayExpired = todayDate.diff(expiredDate);
          var diffTodayEvent= todayDate.diff(eventDate);
        
          let displayedDate= event.format("dddd, DD MMMM YYYY, h.mm A") 

          return(
            <div key={index} className={diffTodayExpired >0? "none": calcss.entryBox} >

              <div className={ calcss.titleAndDate + " "+ (diffTodayEvent>0? calcss.titleAndDateLight: "")}>
                <h2 className={calcss.entryTitle}>{item.attributes.title}</h2>
                <h3 className={calcss.date}>{displayedDate}</h3>

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

                 <ReactMarkdown rehypePlugins={[rehypeRaw]}>{item.attributes.description}</ReactMarkdown>
                 {<ExternalLinks key={index} data={item.attributes.links}/>}
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

    <section className={calcss.links}>
      <h2>{data.data.attributes.linkBoxTitle}</h2>
      <div className={calcss.linkBox}>
     {<ExternalLinks data={data.data.attributes.links}/>}
      </div>
    </section>
      
    </div>
  )
}

export default Calendar