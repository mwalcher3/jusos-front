
import { global } from 'jusos.config'

import Layout from '@components/layout-components/Layout'

export async function getPathsToUrls() {
    // category page types are listed in menu
    const menuData = await fetch(`${global.fetchURI}/menus/menu?nested`);
    const menuDataJson = await menuData.json();
    // extract urls of pages listed in menu
    const endpointsToFetch = [];
    JSON.stringify(menuDataJson, (key, value) => {
        if (key == "url" && value != "" && !endpointsToFetch.includes(value))
            endpointsToFetch.push(value);
        return value;
    });
    // fetch slugs of corresponding pages
    const pathsToUrls = [];
    for (let endpoint of endpointsToFetch) {
        const data = await fetch(`${global.fetchURI}${endpoint}?fields[0]=slug`);
        const json = await data.json();
        const category = global.endpointSyntax(json.data.attributes.slug);
        pathsToUrls.push({ category: category, endpoint: endpoint })
    }
    return pathsToUrls
}



export async function generateStaticParams() {
    const colors = [{ color: "light" }, { color: "dark" }]
    return colors
}

export default async function DefaultLayout({ params, children }) {

    const pathsToUrls = await getPathsToUrls()

    // fetch menu data
    const menuData = await fetch(`${global.fetchURI}/menus/menu?nested`);
    const menuJson = await menuData.json();
    // and replace url endpoint with corresponding slug
    const menuJsonFull = JSON.parse(
        JSON.stringify(menuJson, (key, value) => {
            if (key == "url" && value != "")
                return pathsToUrls.find((pathToUrl) => pathToUrl.endpoint == value)?.category
            return value
        })
    )

    return (
        <div id={"main-container"} className={`${params.color}-mode`}>
            <Layout menuData={menuJsonFull} dark={params.color == "dark"}>
                {children}
            </Layout>
        </div>
    );
}
