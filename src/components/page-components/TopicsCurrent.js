import currentcss from "@styles/page-modules/topics.current.module.scss";
//import InstagramDisplay from "@components/other-components/InstagramDisplay";

const TopicsCurrent = async ({ data }) => {
  const dataAttributes = data.data.attributes;

  // fetch data from instagram api
<<<<<<< HEAD
  // const token = process.env.INSTAGRAM_TOKEN;
  // const instagramURI = "https://graph.instagram.com/me/media" 
  // const query = `fields=id,media_type,media_url,permalink,username,timestamp,caption,children{media_url}&access_token=${token}`
  // const instagramDataFetched = await fetch(`${instagramURI}/?${query}`)
  // const instagramJson = await instagramDataFetched.json();
=======
  const token = process.env.INSTAGRAM_TOKEN;
  const instagramURI = "https://graph.instagram.com/me/media" 
  const query = `fields=id,media_type,media_url,permalink,username,timestamp,caption,children{media_url}&access_token=${token}`
  // const instagramDataFetched = await fetch(`${instagramURI}/?${query}`)
  // const instagramJson = await instagramDataFetched.json();
  const instagramJson = {error: {text: "error", code: "418"}}
>>>>>>> refs/remotes/origin/migrate

  return (
    <div className={currentcss.maincontainer}>
      <h1 className="header">{dataAttributes.title}</h1>
      <p>Instagram-Feed aktuell in Wartung</p>
    </div>
  );
  //      <InstagramDisplay dataAttributes={dataAttributes} instagramData={instagramJson} />
};

export default TopicsCurrent;
