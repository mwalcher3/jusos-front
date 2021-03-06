import React from 'react'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const Test = ({data}) => {
  console.log(data);
  return (
    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu augue ut lectus arcu bibendum at varius vel. Nec feugiat in fermentum posuere urna nec. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Mauris augue neque gravida in fermentum. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Sed arcu non odio euismod. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Tortor consequat id porta nibh venenatis cras. Leo in vitae turpis massa sed elementum tempus. Habitant morbi tristique senectus et netus et. Enim blandit volutpat maecenas volutpat blandit aliquam etiam. Dictum at tempor commodo ullamcorper a. Quis lectus nulla at volutpat diam ut venenatis. Dignissim suspendisse in est ante in nibh mauris. Tempor orci eu lobortis elementum nibh tellus. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper.

    Enim nunc faucibus a pellentesque. Tellus in metus vulputate eu scelerisque felis. Tortor at risus viverra adipiscing at in tellus. In eu mi bibendum neque. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Lectus quam id leo in vitae turpis. Eget mauris pharetra et ultrices neque ornare aenean euismod elementum. Facilisi nullam vehicula ipsum a. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Varius duis at consectetur lorem donec massa sapien faucibus. Eleifend quam adipiscing vitae proin sagittis. Nunc eget lorem dolor sed viverra ipsum nunc. Egestas dui id ornare arcu odio ut sem nulla pharetra. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum a. Lobortis elementum nibh tellus molestie nunc non blandit. Ut sem viverra aliquet eget sit amet tellus. Justo donec enim diam vulputate ut pharetra. Vehicula ipsum a arcu cursus vitae congue. Fringilla est ullamcorper eget nulla facilisi etiam dignissim.
    
    Tortor at risus viverra adipiscing at in tellus. Scelerisque in dictum non consectetur. Consectetur a erat nam at lectus urna duis. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Ut morbi tincidunt augue interdum velit euismod in. Gravida cum sociis natoque penatibus et. Turpis in eu mi bibendum neque. Consectetur purus ut faucibus pulvinar elementum integer enim neque. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper. Lacus vestibulum sed arcu non odio euismod lacinia. Nisl vel pretium lectus quam id leo in vitae. Amet risus nullam eget felis eget nunc lobortis. Tellus id interdum velit laoreet id donec.
    
    Neque sodales ut etiam sit amet nisl. Nunc pulvinar sapien et ligula ullamcorper malesuada. Sapien nec sagittis aliquam malesuada bibendum. Tellus at urna condimentum mattis. Aliquam sem et tortor consequat id porta. Tempus iaculis urna id volutpat lacus laoreet non curabitur. Neque egestas congue quisque egestas diam in arcu. Non diam phasellus vestibulum lorem sed risus ultricies. At auctor urna nunc id cursus metus aliquam eleifend. Quam viverra orci sagittis eu volutpat odio facilisis mauris. Dictum at tempor commodo ullamcorper a lacus. Ullamcorper morbi tincidunt ornare massa eget. In aliquam sem fringilla ut morbi tincidunt. Eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Faucibus pulvinar elementum integer enim neque volutpat ac. Donec ultrices tincidunt arcu non sodales. Elit sed vulputate mi sit.
    
    Sed risus pretium quam vulputate dignissim suspendisse. Urna cursus eget nunc scelerisque. Adipiscing elit duis tristique sollicitudin. Id interdum velit laoreet id donec ultrices tincidunt arcu. Est ultricies integer quis auctor elit sed vulputate. Tortor aliquam nulla facilisi cras. Sollicitudin tempor id eu nisl nunc mi ipsum. Sit amet risus nullam eget felis eget. Pharetra convallis posuere morbi leo. Amet venenatis urna cursus eget nunc scelerisque. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Odio eu feugiat pretium nibh ipsum consequat nisl vel. Tempus quam pellentesque nec nam aliquam sem et tortor.</div>
  )
}

export default Test

export const getStaticProps= async()=>{
     const client= new ApolloClient({
       uri: "https://jusos-content.herokuapp.com/graphql",
       cache: new InMemoryCache()
     })

     const array=['articlePage', 'simplePages']
     const data =[]
     for(let pageType of array){
       const dataa=
      await client.query({
        query: gql`
        query {
         ${pageType} {
           data {
             attributes {
               slug
             }
           }
         }
       }
       `
      })

      data.push(dataa.data)

     } 

 return{
  props:{
    data: data
  
  }
 }
}