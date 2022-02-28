import aboutcss from '../styles/about.module.scss'

const homee = ({data}) => {

    return (
        <div className={aboutcss.main}>
            <img className={aboutcss.spaziergang}src="JusosSpaziergangCroped.jpg" alt="Spaziergang"></img>
            {data.data.map((item)=>{
                return(
                  <div key= {item.id} className={aboutcss.überuns}>
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