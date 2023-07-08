import { notFound } from 'next/navigation'

import { global, singleComponents } from 'jusos.config'
import { getPathsToUrls } from '../layout'


export async function generateStaticParams({ params: { color } }) {
  const pathsToUrls = await getPathsToUrls()
  const params = pathsToUrls.map((pathToUrl) => { return { category: pathToUrl.category } })
  return params
}

export default async function CategoryPage({ params }) {

  const pathsToUrls = await getPathsToUrls()
  const endpoint = pathsToUrls.find((pathToUrl) => pathToUrl.category == decodeURI(params.category))?.endpoint

  const ComponentName = singleComponents[decodeURI(params.category)]

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
