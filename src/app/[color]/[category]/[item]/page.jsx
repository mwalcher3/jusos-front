import { global, collections, collectionComponents } from 'jusos.config'

import { notFound } from 'next/navigation'
import qs from "qs";

// 
// Don't generate all items at build time to avoid ENOMEM not enough memory
// on Uberspace
//

async function getItemsToUrls() {

    // the rewrite map from paths to URL endpoints
    const itemsToUrls = [];

    for (let collection of collections) {
        const query = qs.stringify({
            fields: [`slug`],
            populate: {
                [collection.childrenField]: {
                    fields: [`${collection.slugField}`, `id`],
                },
            },
        });

        const data = await fetch(`${global.fetchURI}${collection.parentEndpoint}?${query}`);
        const json = await data.json();
        const category = global.endpointSyntax(json.data.attributes.slug);

        const kids = json.data.attributes[collection.childrenField].data;
        for (let child of kids) {
            const item = global.endpointSyntax(child.attributes[collection.slugField]);
            const id = child.id
            const endpoint = `${collection.collectionEndpoint}/${id}`
            itemsToUrls.push({ category: category, item: item, endpoint: endpoint })
        }
    }
    return itemsToUrls
}

// export async function generateStaticParams({ params: { color } }) {
//     const itemsToUrls = await getItemsToUrls()
//     const params = itemsToUrls.map((itemToUrl) => { return { category: itemToUrl.category, item: itemToUrl.item } })
//     return params
// }

export default async function ItemPage({ params }) {

    const itemsToUrls = await getItemsToUrls()
    const endpoint = itemsToUrls.find((itemToUrl) =>
        (itemToUrl.category == decodeURIComponent(params.category) && itemToUrl.item == decodeURIComponent(params.item)))?.endpoint

    const SubComponentName = collectionComponents[decodeURIComponent(params.category)]

    if (!endpoint) {
        notFound()
    }

    const pageData = await fetch(`${global.fetchURI}${endpoint}?populate=*`);
    const pageJson = await pageData.json();


    if (!pageJson) {
        notFound()
    }

    return (
        <SubComponentName data={pageJson.data} />
    )
}