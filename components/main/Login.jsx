import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import * as cheerio from 'cheerio';

export default function () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useState({});

  const studentInfos = () => {
    fetch('https://sctce.etlab.in/student/profile', {
      method: 'GET',
      headers: {
        'Cookie': cookie,
        'Host': 'sctce.etlab.in'
      }
    }).then(response => {
      return response.text();
    }).then(getHtml => {
      console.log(cheerio.load(getHtml).html());
    });
  };

  const userLogin = ()=>{
    fetch(`/api/login`,{
        method:'POST',
        body:JSON.stringify({
            'username':username,
            'password':password
        })
    }).then(response=>response.json())
  }
  return (
    <div className="flex-col justify-items-center m-5">
      <Input type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder="Etlab username" />
      <Input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Etlab password" />
      <Button onClick={() => { userLogin() }}>Login</Button>
    </div>
  );
}
