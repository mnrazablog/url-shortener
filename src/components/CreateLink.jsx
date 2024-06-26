import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { UrlsState } from "@/context/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "lucide-react";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import * as Yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/useFetch";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const CreateLink = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const { user } = UrlsState();
  const navigate = useNavigate();
  const ref = useRef();

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    longUrl: Yup.string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: Yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

 
  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValues, user_id: user.id });

 
  const createNewLink = async () => {
    setErrors();

    try {
      await schema.validate(formValues, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };
  useEffect(() => {
    if(error === null && data){
        navigate(`/link/${data[0].id}`);

    }
  }, [error, data])
  
  return (
    <div>
      <Dialog
        defaultOpen={longLink}
        onOpenChange={(res) => {
          if (!res) {
            setSearchParams({});
          }
        }}
      >
        <DialogTrigger className="flex items-center">
          <Link className="mr-2" /> Create New Link
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold ">
              Create New{" "}
            </DialogTitle>

            <div className="flex justify-center mb-20">
              {formValues?.longUrl && (
                <QRCode ref={ref} value={formValues?.longUrl} size={200} />
              )}
            </div>
            <div className="">
              <Input
                value={formValues.title}
                id="title"
                type="text"
                onChange={handleChange}
                placeholder="Short link's title"
              />
              {/* {errors.title && <Error message={errors.title} />} */}

              <Input
                id="longUrl"
                onChange={handleChange}
                value={formValues.longUrl}
                type="text"
                placeholder="Enter your Looong URLs"
              />
              {/* {errors.longUrl && <Error message={errors.longUrl} />} */}

              <div className="flex items-center gap-2">
                <Card className="p-2 ">url_shortener</Card> /
                <Input
                  onChange={handleChange}
                  value={formValues.customUrl}
                  type="text"
                  id="customUrl"
                  placeholder="Custom link - (Optional)"
                />
              </div>
              {error && <Error message={error.message} />}
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={loading}
              onClick={createNewLink}
              variant="success"
              type="submit"
            >
              {loading ? (
                <BeatLoader size={10} color="white" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;
