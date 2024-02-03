import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEffect, useState, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLogged, setIsLogged] = useState("");
  const [close, setClose] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if(localToken){
      setIsLogged(localToken);
      setClose(true);
    }else{
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/token`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
  
          const data = await response.json();
  
          setIsLogged(data.token);
  
          if (data.token !== "") {
            setClose(true);
            localStorage.setItem("token", data.token);
          }
        } catch (error) {
          console.error(error);
        }
      };
      intervalRef.current = setInterval(fetchData, 5000);  
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="flex flex-col justify-items-center  m-5">
      <h1 className="text-5xl leading-[3rem] mt-10 mb-3">Sargam Thithram Thalam</h1>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="bg-red-600 text-white">Login with Etlab</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="h-[600px] w-full ">
            <DrawerHeader>
              <DrawerTitle>Login</DrawerTitle>
            </DrawerHeader>
            {close === false ? (
              <iframe src="https://etlabclient.streamlit.app/" width={"100%"} height={"100%"} />
            ) : (
              <div className="flex flex-col items-center m-10">
                <h1 className="text-2xl mb-5">Successfully registered 🎉</h1>
                <DrawerClose asChild>
                  <Button className="w-[300px]">Close</Button>
                </DrawerClose>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
