import aboutcss from '../styles/about.module.css'

const homee = ({data}) => {
    console.log(data)
    return (
        <div>
            <img className={aboutcss.spaziergang}src="JusosSpaziergangCroped.jpg" alt="Spaziergang"></img>
            {data.data.map((item)=>{
                return(
                  <div key= {item.id} className={aboutcss.main}>
                      <div>
                      <h2>{item.attributes.Title}</h2>
                      </div>
                      <div>
                      {item.attributes.Text}
                      </div>
                  </div>
                )
            })}
           
        </div>
    )
}

export default homee