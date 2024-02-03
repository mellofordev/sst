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
        'Host': 'sctce.etlab.in'
      }
    }).then(response => {
      return response.text();
    }).then(getHtml => {
      console.log(cheerio.load(getHtml).html());
    });
  };

  const userLogin = ()=>{
    fetch(`https://sctce.etlab.in/user/login`,{
        method:'POST',
        body:`LoginForm%5Busername%5D:${username}&LoginForm%5Bpassword%5D:${password}&yt0=`
    }).then(response=>response.text())
    .then(data=>studentInfos())
  }
  return (
    <div className="flex-col justify-items-center m-5">
      <Input type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder="Etlab username" />
      <Input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Etlab password" />
      <Button onClick={() => { userLogin() }}>Login</Button>
    </div>
  );
}
