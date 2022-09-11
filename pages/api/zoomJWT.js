const KJUR = require('jsrsasign')
const axios = require('axios');

      


// https://www.npmjs.com/package/jsrsasign
function generateSignature(sdkKey, sdkSecret, meetingNumber, role) {

  const iat = Math.round((new Date().getTime() - 30000) / 1000)
  const exp = iat + 60 * 60 * 2
  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    sdkKey: sdkKey,
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    appKey: sdkKey,
    tokenExp: iat + 60 * 60 * 2
  }

  ///users/{userId}/meetings

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret)
  return sdkJWT
}

const generatedSignature= generateSignature(process.env.ZOOM_SDK_KEY, process.env.ZOOM_SDK_SECRET, 86374621298, 0)


export default function handler(req, res) {
  var authorization_code= req.body

  var auth = "Basic emJCQzV2S1RRajIyeU5TcXc2N0RBOnZ5aWFJeVVWTHZlU0NEbnFwTE1LQTNGc1lneXprRDVI"
        var header = {"Host":"zoom.us", "Authorization" :auth, 'Content-Type': 'application/x-www-form-urlencoded'}
        var url = `https://zoom.us/oauth/token?grant_type=authorization_code&code=${authorization_code}&redirect_uri=http://localhost:3000`
        axios.post(url,{},header).then(result => {
            console.log(result.response)
        }).catch(e => {
            console.log(e)
            console.log("an error has been catched!!")})
  if(authorization_code!=undefined){
    console.log("this is the code", authorization_code)
  }

    res.status(200).json({ signature: generatedSignature})
   // console.log(generateSignature(process.env.ZOOM_SDK_KEY, process.env.ZOOM_SDK_SECRET, 83248533497, 0))
  
  }
  