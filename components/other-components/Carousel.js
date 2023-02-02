import React, { useEffect } from 'react'
import useCounter from '../../hooks/useCounter'
import Image from 'next/image'
import carcss from '../../styles/component-modules/carousel.module.scss'

const Carousel = ({ settings }) => {

  const [handleChange, current, next, previous, reduceBoolean] = useCounter(settings.length);

  useEffect(() => {
    if (settings.automatic !== false) {
      const timer = setTimeout(() => {
        handleChange(1);
      }, settings.delay);
      return () => clearTimeout(timer);
    }
  },
    [current, handleChange, settings.automatic, settings.delay])


  // set the distance the image will move to the right/left to the size of its container
  //to avoid spacing between the images
  useEffect(() => {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    if (settings.boxWidth) r.style.setProperty('--translation-width', `${settings.boxWidth}`)
    if(settings.translationTime) r.style.setProperty('--translation-time', `${settings.translationTime}`)
  }, [settings.boxWidth, settings.translationTime])


  return (
    <>
      <button onClick={() => { handleChange(-1 + settings.length) }}
        className={carcss.button1 + " " + settings.buttonType}>
        <span>&#60;</span>
      </button>

      
      {settings.dataSource.map((item, index) => {


        return (
          <div className={
            index == current ? carcss.current :
              index == next ? reduceBoolean ? carcss.nextreduce : carcss.next :
                index == previous ? reduceBoolean ? carcss.previousreduce : carcss.previous :
                  "none"} key={index}>

            {settings.width && settings.height ?
              <Image
                src={item}
                alt={settings.imageAlt}
                width={settings.width}
                height={settings.height}
                id={settings.firstId+index}
                quality={100}
                priority /> :
                settings.objectFit== "contain"?
                <Image
                src={item}
                alt={settings.imageAlt}
                fill
                className="imageContain"
                quality={100}
                priority
              />:
              <Image
                src={item}
                alt={settings.imageAlt}
                fill
                className="imageCover"
                quality={100}
                priority
              />}
          </div>
        )
      })}

      <button onClick={() => { handleChange(1) }}
        className={carcss.button2 + " " + settings.buttonType}>
        <span>&#60;</span>
      </button>

      <div className={carcss.dotcontainer}>
        {settings.dataSource.map((item, index) => {
          return (
            <div className={settings.dots ? carcss.dots + " " + (index == current ? carcss.dotsactive : "") : "none"}
              key={index}></div>)

        })}
      </div>
    </>
  )
}

export default Carousel