import articlecss from "../../styles/article.module.scss"
import Link from 'next/link'

export async function getStaticPaths(){
    const res= await fetch(`https://jusos-content.herokuapp.com/api/articles`)
    const json= await res.json()

    const paths= json.data.map((item)=>{
        return{
            params: {id: item.id.toString()},
        }
    }) 
    return{
        paths,
        fallback: false
    }
}

export async function getStaticProps(context){
    console.log(context);
    const id= context.params.id;
    const res= await fetch(`https://jusos-content.herokuapp.com/api/articles/${id}`);
    const json= await res.json();

    return{
        props:{
            data: json,
        }
    }
}



const id = ({data}) => {
  return (
    <div>
        <div className={articlecss.content}>
        <Link href='/articles'><button className={articlecss.readmorebutton}>Read other articles</button></Link>
        <h2>{data.data.attributes.Title}</h2>
        <p>{data.data.attributes.article}</p>
        </div>
    </div>
  )
}

export default id