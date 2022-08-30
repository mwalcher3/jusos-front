const https = require('https');



export default function handler(req, res) {
    let data = '';

    https.get("https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=819a2134b339f9bbad2e6b8ab6bd1ab5&access_token=IGQVJXSjhDa1EyVjZAqblU3NGdPbWxKYWlBcTI1a3dnQmVlUlpQSjhhQU5sVlZARUF9qTEhScVdueWFWb0ZApaXBWMG5jZAHN2dTBYdlAxQ1VOTVNjS18zUzF3WTJlQ0lNVXRwYzlvYW9WYUpCWTd0cF9lawZDZD", (resp) => {
    

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
    console.log("chunk:", data)
  });
    

  // The whole response has been received. Print out the result.
 /* resp.on('end', () => {
    console.log("instagram response", JSON.parse(data).explanation);
  });*/

/*}).on("error", (err) => {
  console.log("Error: " + err.message);*/
});
  
res.status(200).json({ token: data })
  
  }
    



//'/access_token?grant_type=ig_exchange_token&client_secret=9633a4fd8ddd74472abf7ccbb6d4e73a&access_token=IGQVJVTWlnRVZAFUmJRQVZABakwxSzVFRk5mbE1vQ19KUkRhQ2tGLXFZAX3oxZAWxqOHRKbzlnbmdNdGwzWFAwZAlY2T01xaWNKcFZA4eS1rOTVxNUl5LU9nNXI2bDJxVXFCblZAxNUtpbTVjaWdLLXNxZAmswMwZDZD'