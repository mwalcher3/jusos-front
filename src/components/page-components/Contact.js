import { global } from "jusos.config";

import ContactForm from "@components/other-components/ContactForm";

export default async function Contact({ data }) {
  // fetch form data
  const formDataFetched = await fetch(`${global.fetchURI}/forms?populate=*`);
  const formJson = await formDataFetched.json();
  const formData = formJson.data[0].attributes;

  return <ContactForm data={data} formData={formData} />;
}
