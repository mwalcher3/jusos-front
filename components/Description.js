import aboutcss from '../styles/about.module.scss'
import Image from 'next/image'

const Description = ({data}) => {

    return (
        <>
        <div className={aboutcss.spaziergang}>
            <Image
             src="/JusosSpaziergangCroped.jpg" 
             alt="Spaziergang"
             layout="fill"
             objectFit='cover'
            />
            </div>
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

        </>
    )
}

export default Description