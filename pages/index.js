import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useEffect, useState } from "react";
import Login from "@/components/main/Login";
 
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLogged,setIsLogged] = useState(false) 
  const getTokenResponse = ()=>{
    fetch('http://localhost:8000/accounts/api/signup',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
    }).then(response=>response.json())
    .then(data=>{
      setIsLogged(data.isLoggedIn);
      console.log(data);
    })
    .then(err=>{console.log(err)})
  }
  // useEffect(()=>{
  //     // here im trying to call http://localhost:8000/accounts/client/returnToken 
  //     // for the token so that i can close the iframe by a trigger here 
  //     getTokenResponse();
  // })

  return (
    <div className="flex flex-col justify-items-center  m-5">
       <h1 className="text-5xl leading-[3rem] mt-10 mb-3">Sargam Thithram Thalam</h1>
       <Button>Login with Eltab</Button>
       <Login/>
       {/* <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="h-[600px] w-full ">
          <DrawerHeader>
            <DrawerTitle>Login</DrawerTitle>
          </DrawerHeader>
          <iframe src="http://192.168.29.36:8501"
                  width={'100%'}
                  height={'100%'}
          />
        </div>
      </DrawerContent>
    </Drawer> */}
    </div>
  );
}
