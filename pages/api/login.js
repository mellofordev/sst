export default async function handler(req, res) {
    try {
      let body = JSON.parse(req.body);
      const response = await fetch('https://sctce.etlab.in/user/login',{
        method:'POST',
        headers:{
            Connection: 'keep-alive',
            Host: 'sctce.etlab.in',
            Origin: 'https://sctce.etlab.in',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/x-www-form-urlencoded',
            Referer: 'https://sctce.etlab.in/user/login',
            'Upgrade-Insecure-Requests': '1',
        },
        body:`LoginForm%5Busername%5D:${body["username"]}&LoginForm%5Bpassword%5D:${body["password"]}&yt0=`,
        redirect:'manual'
      });
      const data = await response.text();

      studentInfo(response);
      res.status(response.status).json(data);
    } catch (error) {
      console.error('Proxy error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
async function studentInfo(response){
    const setCookieHeader = response.headers.get('set-cookie');
    const cookies = setCookieHeader.split(', ');

    // Extract only the desired cookies
    const desiredCookies = {};

    cookies.forEach((cookie) => {
    const [name, value] = cookie.split(';')[0].split('=').map((part) => part.trim());
    if (name === 'YII_CSRF_TOKEN' || name === 'SCTCESESSIONID') {
        desiredCookies[name] = value;
    }
    });

    
    const studentResponse =await fetch('https://sctce.etlab.in/student/profile', {
        method: 'GET',
        headers: {
          'Cookie': desiredCookies,
          'Host': 'sctce.etlab.in'
        }
    })
    const studentData = await studentResponse.text();
    console.log(studentData);
}