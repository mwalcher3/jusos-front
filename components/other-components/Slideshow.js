import slideshowcss from '../../styles/component-modules/slideshow.module.scss'
import {global} from '../../pages/_app'
import Carousel from "./Carousel"

const Slideshow = ({data}) => {
     const imageSource=[]
     data.data.map((item)=>{
          imageSource.push(`${global.host}${item.attributes.url}`)
     })

     let carouselSettings= {
          length: data.data.length,
          onClick: true,
          automatic: true,
          delay: 7000,
          dataSource: imageSource,
          imageAlt: "slideshow ",
          dots: true,
          buttonType: "button-a",
          boxWidth: "100vw",
          translationTime: '0.6s',
     }



     return(
          <div className={slideshowcss.maincontainer}>
             <div className={slideshowcss.imagecontainer}>
               <Carousel settings={carouselSettings}/>
             </div>
          </div>
     )
}

export default Slideshow