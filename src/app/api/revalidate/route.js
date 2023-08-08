export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";

import { global, collections } from "jusos.config";

import { getPathsToUrls } from "../../[color]/layout";

const revalPayloadToTags = async (payload) => {
  // revalidate menu
  if (payload.model == "menu") return ["menu"];
  // revalidate front page
  if (payload.model == "home-page") return ["home-page"];
  // revalidate all pages with menu entry
  if ("slug" in payload.entry) {
    const pathsToUrls = await getPathsToUrls();
    const endpoint = pathsToUrls.find(
      (pathToUrl) => pathToUrl.category == global.endpointSyntax(payload.entry.slug)
    )?.endpoint;
    return [endpoint];
  }
  //
  if (payload.model == "article" || payload.model == "member") {
    const id = payload.entry.id;
    const collection = collections.find((collection) => collection.model == payload.model);
    // revalidate page of the actual item
    const endpoint = `${collection.collectionEndpoint}/${id}`;
    // revalidate fetch in getItemsToUrls that maps item urls to fetch endpoints
    const model = collection.model;
    // revalidate page where items are listed
    const parentEndpoint = collection.parentEndpoint;
    return [endpoint, model, parentEndpoint];
  }
  if (payload.model == "calendar-entry") return ["/calendar-page"];
  if (payload.model == "form") return ["/contact-page"];
  if (payload.model == "motion-type") return [`/motion-types/${payload.entry.id}`];
  if (payload.model == "meeting-type") return [`/meeting-types/${payload.entry.id}`];
  if (payload.model == "topic") return [`/topics/${payload.entry.id}`];

  console.log(payload);
  return [];
};

export async function POST(request) {
  //   Check for secret to confirm this is a valid request
  if (headers().get("authorization") !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
  const payload = await request.json();
  // get the list of tags to revalidate
  const tags = await revalPayloadToTags(payload);
  //   const revalpath = "/" + lang;
  //   console.log("revalidating ", revalpath);
  for (let tag of tags) {
    console.log("revalidating tag", tag);
    revalidateTag(tag);
  }
  const stamp = new Date(Date.now()).toISOString();
  return NextResponse.json({ revalidated: true, time: stamp }, { status: 200 });
}
