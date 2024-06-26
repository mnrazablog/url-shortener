import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import * as Yup from "yup";
import useFetch from "@/hooks/useFetch";
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlsState } from "@/context/context";

const SignUp = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
    profile_pic:null
  });

  const navigate = useNavigate()
  let [searchParams]= useSearchParams();
  const longLink = searchParams.get("createNew");


//  To handle onChange for Input
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: files? files[0] : value,
    }));
  };
// To use custome hook - useFetch()
const {data, error, loading, fn:fnSignUp} = useFetch(signup,formData)
const {fetchUser} = UrlsState();

useEffect(() => {
  if(error===null && data){
    navigate(`/dashboard?${longLink ? `createNew=${longLink}`:""}`);
    fetchUser();
  }
}, [error, loading]);


// To handle Login function
  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required("Name is required"),
        email: Yup.string()
          .email("invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required")
      });
      await schema.validate(formData, { abortEarly: false });
      //   api Call
      await fnSignUp() 
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SIGN UP</CardTitle>
        <CardDescription>
        if you don't have an account
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2 ">
      <div className="space-y-1">
          <Input
            name="name"
            placeholder="Enter your Name"
            type="text"
            onChange={handleInputChange}
          />
          {errors.name && <Error message={errors.name} />}
        </div>
        <div className="space-y-1">
          <Input
            name="email"
            placeholder="Enter your Email"
            type="email"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            placeholder="Enter your Password"
            type="password"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
        <div className="space-y-1">
          <Input
            name="profile_pic"
            accept="image/*"
            type="file"
            onChange={handleInputChange}
          />
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleSignup} className="text-base font-bold">
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Create Account"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
