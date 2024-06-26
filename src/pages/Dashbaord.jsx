import CreateLink from "@/components/CreateLink";
import Error from "@/components/Error";
import LinkCard from "@/components/LinkCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UrlsState } from "@/context/context";
import { getClicksforUrls } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { Filter, Link2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Dashbaord = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlsState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksforUrls,
    urls?.map((url) => url.id)
  );
useEffect(() => {
 fnUrls();
},[]);

useEffect(() => {
  if(urls?.length) fnClicks();

 },[urls?.length]);
 
const filteredUrls = urls?.filter((url)=>
  url.title.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <div className="flex flex-col gap-4">
      {loading || loadingClicks && <BarLoader width={"100%"} color="#36d7b7" />}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="font-extrabold text-4xl">My Links</h1>
        <CreateLink/>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter links..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>

      {error && <Error message={error?.message} />}

      {(filteredUrls || []).map((url, i) => {
          return <LinkCard url={url} key={i} fetchUrls={fnUrls} />
      })}
    </div>
  );
};

export default Dashbaord;
