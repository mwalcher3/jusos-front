import {useState} from 'react'

export default function Contact() {
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
		<form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold dark:text-gray-50">
            Send a message
          </h1>

          <label>
            Full name
          </label>
          <input
            type="text"
            value={fullname}
            required
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            name="fullname"
          />
         

          <label>E-mail</label>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          

          <label>Subject</label>
          <input
            type="text"
            name="subject"
            required
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
         
         <label>Message</label>
          <textarea
          type="text"
          required
            name="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></textarea>
          
          <div >
            <button type="submit">
              Submit
            </button>
          </div>
        </form>
	)
}