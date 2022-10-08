import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClipboard} from '@fortawesome/free-solid-svg-icons'
import clipboardcss from "../../styles/component-modules/copy-to-clipboard.module.scss"

const CopyToClipboard = ({textToCopy}) => {
  /*State for wether you just copied it */
  const [speechBubbleValue, setSpeechBubbleValue]= React.useState("kopieren")
  /*state for if it is currently hovered on */
  const [hover, setHover]= React.useState(false)

    const textRef = React.useRef();

    const copyToClipboard= (e) =>{
        textRef.current.select();
        document.execCommand('copy');
       // navigator.clipboard.writeText(emailRef.current);
        e.target.focus();

        /* set value to copied when you copied it */
        setSpeechBubbleValue("kopiert!")
      }

      /*if state is on copied add a delay when going from hover to not hovering
      update it using css variables
       */
      useEffect(()=>{
        var r = document.querySelector(':root');
        r.style.setProperty('--speech-bubble-delay',  speechBubbleValue=="kopieren"? "0s" : "2s") ;
        console.log(speechBubbleValue, hover);
      },[hover])


  return (
    <div>
    <div className={clipboardcss.clipboard}>
      <textarea  ref={textRef} value={textToCopy} readOnly></textarea>
      {/*make speech bubble visible when hovering over the clipboard icon */}
      <div 
      className={clipboardcss.svgwrapper}>
         <div className={hover? clipboardcss.speechbubble: clipboardcss.speechbubbleclosed}>{speechBubbleValue}</div>
          <FontAwesomeIcon
           onClick={copyToClipboard} 
           onMouseOver={()=>{setHover(true)}} 
           onMouseOut={()=>{
             {/*set state to copy again 2s after the user copied it */}
           setHover(false)
           setTimeout(()=> setSpeechBubbleValue("kopieren"),2000)
           }} 

           icon={faClipboard}/>
      </div>
    </div></div>
  )
}

export default CopyToClipboard

