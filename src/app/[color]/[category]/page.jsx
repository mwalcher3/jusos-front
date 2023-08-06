import { notFound } from 'next/navigation'

import { global, singleComponents } from 'jusos.config'
import { getPathsToUrls } from '../layout'


export async function generateStaticParams({ params: { color } }) {
  const pathsToUrlsData = await getPathsToUrls()
  const pathsToUrls = pathsToUrlsData.map((pathToUrl) => { return { category: pathToUrl.category } })

  const params = process.env.HOST == "local" ? pathsToUrls : []
  return params
}

export default async function CategoryPage({ params }) {

  const pathsToUrls = await getPathsToUrls()
  const endpoint = pathsToUrls.find((pathToUrl) => pathToUrl.category == decodeURI(params.category))?.endpoint

  const ComponentName = singleComponents[decodeURI(params.category)] || singleComponents["dummy"]

  if (!endpoint) {
    notFound()
  }

  const pageData = await fetch(`${global.fetchURI}${endpoint}?populate=*`);
  const pageJson = await pageData.json();

  if (!pageJson) {
    notFound()
  }

  return (
    <ComponentName data={pageJson} />
  )
}
