import { global, collections, collectionComponents } from 'jusos.config'

import { notFound } from 'next/navigation'
import qs from "qs";

export async function getItemsToUrls() {

    // the rewrite map from paths to URL endpoints
    const itemsToUrls = [];

    for (let collection of collections) {
        const category = collection.category;

        const query = qs.stringify({
            fields: [`${collection.slugField}`],
            pagination: { pageSize: 50 }
        });
        const data = await fetch(`${global.fetchURI}${collection.collectionEndpoint}?${query}`, {
            next: { tags: [collection.model] }
        });
        const json = await data.json();
        const kids = json.data;

        for (let child of kids) {
            const item = global.endpointSyntax(child.attributes[collection.slugField]);
            const id = child.id
            const endpoint = `${collection.collectionEndpoint}/${id}`
            itemsToUrls.push({ category: category, item: item, endpoint: endpoint })
        }
    }
    return itemsToUrls
}


export async function generateStaticParams({ params: { color } }) {
    const itemsToUrlsData = await getItemsToUrls()
    const itemsToUrls = itemsToUrlsData.map((itemToUrl) => {
        return { category: itemToUrl.category, item: itemToUrl.item }
    })
    // 
    // Don't generate items at build time on Uberspace to avoid ENOMEM not enough memory
    //
    const params =
        process.env.HOST == "local" ? itemsToUrls : []
    return params
}

export default async function ItemPage({ params }) {

    const itemsToUrls = await getItemsToUrls()
    const endpoint = itemsToUrls.find((itemToUrl) =>
    (itemToUrl.category == decodeURIComponent(params.category) &&
        itemToUrl.item == decodeURIComponent(params.item)))?.endpoint

    const SubComponentName = collectionComponents[decodeURIComponent(params.category)]

    if (!endpoint) {
        notFound()
    }

    const pageData = await fetch(`${global.fetchURI}${endpoint}?populate=*`, {
        next: { tags: [endpoint] }
    });
    const pageJson = await pageData.json();

    if (!pageJson) {
        notFound()
    }

    return (
        <SubComponentName data={pageJson.data} />
    )
}