import {useState} from 'react'
import formcss from '../styles/form.module.scss'

export default function Contact({articlePage}) {
  console.log(articlePage)
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const formData={}
    Array.from(e.currentTarget.elements).forEach((item)=>{
      formData[item.name]= item.value
    });


    fetch('/api/contact',{
      method:"POST",
      body: JSON.stringify(formData)
    })
  }

    return (
		<form onSubmit={handleSubmit} className={formcss.container}>
          <h1 className={formcss.title}>
            Send a message
          </h1>



          <div>
          <h3>Full name</h3>
          <input
            type="text"
            value={fullname}
            required
            onChange={(e) => setFullname(e.target.value)}/>
            </div>

            <div>
          <h3>E-mail</h3>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div>
          <h3>Subject</h3>
          <input
            type="text"
            name="subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}/>
            </div>
         
         <div>
         <h3>Message</h3>
          <textarea
          type="text"
          required
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>

          
            <button type="submit" className={formcss.submit}>
              Submit
            </button>
        </form>
	)
}