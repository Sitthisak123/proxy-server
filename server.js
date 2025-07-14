const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const axios = require('axios');

const app = express();
const server = http.createServer(app); // Allows adding WebSocket support
const io = new Server(server); // Integrate Socket.IO with the server


// WebSocket connection handling
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });


const TEMP_VAR_AUTH = {
  __VIEWSTATE: '/wEPDwUKMjEwOTcwMDg2N2RkZfX3x16ynxIkuAu6/myBQhuMOgo=',
  __VIEWSTATEGENERATOR: 'C2EE9ABB',
  __EVENTVALIDATION: '/wEWBALX+LPxBALB2tiHDgLKw6LdBQLHyfnnAgn7xIzePhsiuCSgVq8YdaOuFJW/',
  // txtUser: '',
  // txtPass: '',
  btLogin: 'เข้าสู่ระบบ',
}
const TEMP_VAR_CHECKTABLES = {
  __VIEWSTATE: '/wEPDwUKLTUyNTE3NDk5MQ9kFgICAw9kFgYCAQ9kFhICAQ8PFgIeBFRleHQFCzY2MTIyNDIwMzIxZGQCAw8PFgIfAAVA4LiZ4Liy4Lii4Liq4Li04LiX4LiY4Li04Lio4Lix4LiB4LiU4Li04LmMIOC5gOC4l+C4nuC4reC4suC4qeC4smRkAgUPDxYGHwAFQuC5gOC4o+C4teC4ouC4meC4ouC4seC4h+C5hOC4oeC5iOC4hOC4o+C4muC4q+C4peC4seC4geC4quC4ueC4leC4ox4IQ3NzQ2xhc3MFC0RlZmF1bHRCb2xkHgRfIVNCAgJkZAIHDw8WBh8ABXjguKLguLHguIfguYTguKHguYjguYTguJTguYnguJXguKPguKfguIjguYLguITguKPguIfguKrguKPguYnguLLguIfguKvguKXguLHguIHguKrguLnguJXguKPguIjguJrguIHguLLguKPguKjguLbguIHguKnguLIfAQULRGVmYXVsdEJvbGQfAgICZGQCCQ8PFgIfAGVkZAILDw8WAh8AZWRkAg0PDxYCHwAFMOC4ouC4seC4h+C5hOC4oeC5iOC4o+C4sOC4muC4uOC4p+C4seC4meC4l+C4teC5iGRkAg8PDxYCHwBlZGQCEw8PFgIfAAUac3RkLjY2MTIyNDIwMzIxQHVicnUuYWMudGhkZAICDxBkEBUcG+C5gOC4peC4t+C4reC4geC5gOC4l+C4reC4oQYxLzI1NjYGMi8yNTY2BjMvMjU2NgYxLzI1NjcGMi8yNTY3BjMvMjU2NwYxLzI1NjgGMi8yNTY4BjMvMjU2OAYxLzI1NjkGMi8yNTY5BjMvMjU2OQYxLzI1NzAGMi8yNTcwBjMvMjU3MAYxLzI1NzEGMi8yNTcxBjMvMjU3MQYxLzI1NzIGMi8yNTcyBjMvMjU3MgYxLzI1NzMGMi8yNTczBjMvMjU3MwYxLzI1NzQGMi8yNTc0BjMvMjU3NBUcAS0EMS82NgQyLzY2BDMvNjYEMS82NwQyLzY3BDMvNjcEMS82OAQyLzY4BDMvNjgEMS82OQQyLzY5BDMvNjkEMS83MAQyLzcwBDMvNzAEMS83MQQyLzcxBDMvNzEEMS83MgQyLzcyBDMvNzIEMS83MwQyLzczBDMvNzMEMS83NAQyLzc0BDMvNzQUKwMcZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2RkAgQPPCsADQBkGAEFA2Rndg9nZKCA57cC7iCa8J4FDBxsFHXDOgrs',
  __VIEWSTATEGENERATOR: '82C0C125',
  __EVENTVALIDATION: '/wEWHgLjgtejAQLJv9qVBgKB9byYAgKA9byYAgKD9byYAgKB9cjzCgKA9cjzCgKD9cjzCgKB9ZSkCAKA9ZSkCAKD9ZSkCAKB9aB/AoD1oH8Cg/WgfwKs3pLgDQKv3pLgDQKu3pLgDQKs3r67BAKv3r67BAKu3r67BAKs3sqeDwKv3sqeDwKu3sqeDwKs3tbxBwKv3tbxBwKu3tbxBwKs3uLUDgKv3uLUDgKu3uLUDgLHsdCoDJkHc4eq2+u48ZVRzu9oSmYBab6t',
  btSearch: "ค้นหาตารางเรียน"
  //ddTerm: ''
}

//Target configs
const TARGET_POTOCOL = 'https';
const TARGET_HOST = 'reg.ubru.ac.th';
const TARGET_BASE_URL = `${TARGET_POTOCOL}://${TARGET_HOST}`;
const TEMP_HOST = {
  TARGET_POTOCOL,
  TARGET_HOST,
  TARGET_BASE_URL,
  TARGET_AUTH_URL: `${TARGET_BASE_URL}/login.aspx`,
  TARGET_DEFAULT_URL: `${TARGET_BASE_URL}/default.aspx`,
  TARGET_GRADES_URL: `${TARGET_BASE_URL}/grade.aspx`,
  TARGET_CHECKTABLES_URL: `${TARGET_BASE_URL}/checktables.aspx`,
}


// Add CORS middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// axios.defaults.headers.common[""] = "";


app.post("/auth", async (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress
    const { txtPass, txtUser } = req.body
    // console.log(req.body.txtUser)
    // console.log("auth ->: " + TEMP_HOST.TARGET_AUTH_URL);
    const response = await axios.post(TEMP_HOST.TARGET_AUTH_URL,
      { ...TEMP_VAR_AUTH, txtPass, txtUser },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // cookie: SSID,
          // "Host": TEMP_HOST.TARGET_HOST,
          // "Upgrade-Insecure-Requests": "1",
          // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.70 Safari/537.36",
          // "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          // "Sec-Fetch-Site": "",
          // "Sec-Fetch-User": "?1",
          // "Sec-Fetch-Dest": "document",
          // "Referer": TEMP_HOST.TARGET_AUTH_URL,
          // "Accept-Encoding": "gzip, deflate, br",
          // "Priority": "u=0, i",
          // "Connection": "keep-alive"
        }
      }
    );

    try {
      const SSID = response.headers['set-cookie'][0].split(';')[0];
      const responseData = response.data;
      // console.log(`send SSID: ${SSID} -> ${clientIp}`)
      // console.log(responseData);
      if (responseData.includes("alert('รหัสผ่านไม่ถูกต้อง')")) {
        console.warn("รหัสผ่านไม่ถูกต้อง");
        return res.status(401).json({ msg: "รหัสผ่านไม่ถูกต้อง" });
      } else if (responseData.includes("<meta http-equiv='refresh' content='0; url=Default.aspx'><meta http-equiv='refresh' content='0; url=Default.aspx'>")) {
        console.log("Auth Success!")
        return res.status(200).json({ msg: "Auth Success!", SSID });
      } else {
        resMsg = "Auth Failed! [*Target changed]"
        console.error("Auth Failed! [*Target changed]");
        return res.status(403).json({ msg: "Auth Failed! [*Target changed]" });
      }
    } catch (error) {
      console.error('Error details:', error);
      return res.status(500).json({ msg: "Authorize Failed [*Proxy error]" });
    }
  } catch (error) {
    console.error('Error details:', error);
    return res.status(500).json({ msg: 'Internal Proxy Server Error' });
  }
});

app.get("/grades", async (req, res) => {
  try {
    const SSID = req.headers.ssid;
    console.log("grades ->: ", SSID);
    const response = await axios.get(TEMP_HOST.TARGET_GRADES_URL, {
      headers: {
        "Cookie": SSID,
      },
      timeout: 7000,
    });
    // console.log(response.data);

    return res.status(200).send(response.data);

  } catch (error) {
    console.error('Error details:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/checktables", async (req, res) => {
  try {
    const SSID = req.headers.ssid;
    const ddTerm = req.headers.ddterm || false;

    if (!SSID) {
      return res.status(400).json({ error: 'Missing SSID header' });
    }

    console.log("checktables -> SSID:", SSID);

    const response = await axios.get(
      TEMP_HOST.TARGET_CHECKTABLES_URL,
      {
        params: {
          ...TEMP_VAR_CHECKTABLES,
          ...(ddTerm ? { ddTerm } : {})
        },
        headers: {
          "Cookie": SSID,
        },
        timeout: 7000,
      }
    );
    console.log("term:", ddTerm || "noTerm");
    const data = response.data;

    // Check for specific alert text in the HTML response
    if (data.includes("alert('ไม่พบข้อมูลตารางเรียน')")) {
      console.warn("ไม่พบข้อมูลตารางเรียน");
      return res.status(404).send("ไม่พบข้อมูลตารางเรียน");
    }

    // Send the raw HTML
    return res.status(200).send(data);
  } catch (error) {
    console.error('Error details:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});





app.post("/*", async (req, res) => {
  try {
    const data = req.body; // Assuming JSON body
    console.log(`Received POST data:`, data);

    res.status(200).json({ message: 'POST request handled successfully', data });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("*", async (req, res) => {
  try {
    res.status(200).send("It's working!");
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
// Start the server
const PORT = process.env.PORT || 10000;
const HOST = process.env.HOST || "192.168.1.103";
server.listen(PORT, HOST, () => {
  console.log(`Server listening on ->\t${HOST}:${PORT}`);
});


/*

app.get("/checktables", async (req, res) => {
  try {
    const SSID = req.headers.ssid;
    console.log("grades ->: ", SSID);
    const response = await axios.get(TEMP_HOST.TARGET_GRADES_URL, {
      headers: {
        "Cookie": SSID,
      },
      timeout: 7000,
    });
    // console.log(response.data);
  }
  catch (error) {
    console.error('Error details:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

*/