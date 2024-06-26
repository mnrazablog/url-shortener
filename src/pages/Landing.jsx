import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideLink } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [longURL, setLongURL] = useState();
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longURL) navigate(`/auth?createNew=${longURL}`);
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-10 tex-white sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-center text-white font-extrabold">
        The only URL Shortener <br /> you &rsquo;ll ever need! 👇
      </h1>
      <form
        onSubmit={handleShorten}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-4"
      >
        <Input
          className="h-full flex-1 py-4 px-4 "
          value={longURL}
          onChange={(e) => {
            setLongURL(e.target.value);
          }}
          type="url"
          placeholder="Enter your long URL !"
        />
        <Button
          className="h-full text-base"
          type="submit"
          variant="destructive"
        >
          <LucideLink className="mr-2 h-4 w-4" /> Shorten!
        </Button>
      </form>
      {/* Banner */}
      <img
        className="mt-2 w-full rounded-sm shadow-lg"
        src="/banner.png"
        alt="banner image"
      />
      {/* Accordion */}
      <Accordion type="single" className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            {" "}
            How does the URL Shortener works?
          </AccordionTrigger>
          <AccordionContent>
            When you enter any long url to the input field, our system will
            generate a shorter version of that long url. This shortened URL
            redirects to the original long URL when accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            When you enter any long url to the input field, our system will
            generate a shorter version of that long url. This shortened URL
            redirects to the original long URL when accessed..
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Do I need an account to use this App?
          </AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s required to have an account on the system
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Landing;
