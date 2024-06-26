import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy,  Download, Trash } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const LinkCard = ({ url, fetchUrls }) => {

    const downloadImage =()=>{
        const imageURL = url?.qr;
        const filename = url?.title;
        const anchor = document.createElement("a");
        anchor.href= imageURL;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }

const {loading:loadingDelete, fn:fnDelete}= useFetch(deleteUrl, url.id)



  return (
    <div className="flex flex-col md:flex-row gap-4 border p-4 bg-gray-900 rounded-lg shadow-xl">
      <img
        src={url?.qr}
        className="object-contain h-36 ring ring-blue-500 self-start"
        alt="QR Code"
      />

      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>
        <span className="text-blue-400 text-2xl font-bold hover:underline cursor-pointer">
          https://url-shortener-zeta-flame.vercel.app/
          {url?.custom_url ? url?.custom_url : url?.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {url?.original_url}
        </span>
        <span className="font-extralight flex items-end text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              `https://url-shortener-zeta-flame.vercel.app/${url?.short_url}`
            );
          }}
          variant="ghost"
        >
          <Copy />
        </Button>
        <Button
          onClick={downloadImage}
          variant="ghost"
        >
          <Download />
        </Button>
        <Button onClick={() => fnDelete().then(()=> fetchUrls())} variant="ghost">
         { loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
