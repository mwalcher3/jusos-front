import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClipboard} from '@fortawesome/free-solid-svg-icons'
import clipboardcss from "../styles/component-modules/copy-to-clipboard.module.scss"

const CopyToClipboard = ({textToCopy}) => {

    const textRef = React.useRef();

    const copyToClipboard= (e) =>{
        textRef.current.select();
        document.execCommand('copy');
       // navigator.clipboard.writeText(emailRef.current);
        e.target.focus();
      }

  return (
    <div>
    <div className={clipboardcss.clipboard}>
      <textarea  ref={textRef} value={textToCopy} readOnly></textarea>
      <FontAwesomeIcon onClick={copyToClipboard} icon={faClipboard}/>
    </div></div>
  )
}

export default CopyToClipboard

