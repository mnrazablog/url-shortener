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
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlsState } from "@/context/context";

const Login = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  let [searchParams]= useSearchParams();
  const longLink = searchParams.get("createNew");


//  To handle onChange for Input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
// To use custome hook - useFetch()
const {data, error, loading, fn:fnLogin} = useFetch(login,formData)
const {fetchUser} = UrlsState();

useEffect(() => {
  if(error===null && data){
    navigate(`/dashboard?${longLink ? `createNew=${longLink}`:""}`);
    fetchUser();
  }
}, [data, error])


// To handle Login function
  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      //   api Call
      await fnLogin() 
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
        <CardTitle>LOGIN</CardTitle>
        <CardDescription>
          to your account if you already have one
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
   <form >
   <CardContent className="space-y-2 ">
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
            autoComplete="true"
          />
          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>
   </form>
      <CardFooter className="flex justify-center">
        <Button onClick={handleLogin} className="text-base font-bold">
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
