import slideshowcss from '../../styles/component-modules/slideshow.module.scss'
import {global} from '../../pages/_app'
import Carousel from "./Carousel"
import { i } from 'mathjs';

const Slideshow = ({data, smallScreenData}) => {
     console.log(smallScreenData);
     const imageSource=[]
     const smallScreenImageSource=[]
     data.data.map((item)=>{
          imageSource.push(`${global.host}${item.attributes.url}`)
     })

     smallScreenData.data.map((item)=>{
          smallScreenImageSource.push(`${global.host}${item.attributes.url}`)
     })

     if(imageSource.length == 2) imageSource.push(...imageSource);
     if(smallScreenImageSource.length == 2) smallScreenImageSource.push(...smallScreenImageSource)

     var carouselSettings= {
          length: imageSource.length,
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

     var carouselSmallSettings= { ...carouselSettings,  ...{dataSource: smallScreenImageSource, length:smallScreenImageSource.length } }

     if(data.data.length == 2) {carouselSettings.dots= false}
     if(smallScreenData.data.length==2){carouselSmallSettings.dots=false}

     return(
          <div className={slideshowcss.maincontainer}>
             <div className={slideshowcss.imagecontainer}>
               <Carousel settings={carouselSettings}/>
             </div>

             <div className={slideshowcss.imagesmallcontainer}>
               <Carousel settings={carouselSmallSettings}/>
             </div>
          </div>
     )
}

export default Slideshow