import slideshowcss from '../styles/component-modules/slideshow.module.scss'
import {global} from '../pages/_app'
import Carousel from "./Carousel"

const Slideshow = ({data}) => {
    // const dataLength= 3
     const imageSource=[]
     data.data.map((item)=>{
          imageSource.push(`${global.host}${item.attributes.url}`)
     })

     let carouselData= {
          length: 3,
          onClick: true,
          automatic: true,
          delay: 5000,
          dataSource: imageSource,
          imageAlt: "slideshow ",
          dots: true,
          buttonType: "button-a"
     }



     return(
          <div className={slideshowcss.maincontainer}>
             <div className={slideshowcss.imagecontainer}>
               <Carousel carouselData={carouselData}/>
             </div>
          </div>
     )
}

export default Slideshow