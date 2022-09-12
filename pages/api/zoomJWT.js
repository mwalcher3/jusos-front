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

const generatedSignature= generateSignature(process.env.ZOOM_SDK_KEY, process.env.ZOOM_SDK_SECRET, 5011974152, 0)


export default function handler(req, res) {
  var authorization_code= req.body

  var auth = `Basic ${Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64')}`

        var header = {"Host":"zoom.us", "Authorization" :auth, "ContentType": 'application/x-www-form-urlencoded'}
        var url = `https://zoom.us/oauth/token?grant_type=authorization_code&code=${authorization_code}&redirect_uri=${process.env.ZOOM_REDIRECT_URL}`
        console.log("this is the header", header);
        
        axios.post(url, {} ,header).then(result => {
            console.log(result.response)
        }).catch(e => {
            console.log(e)
            console.log("an error has been caught!!")})

    if(authorization_code!=undefined){
      console.log("this is the code", authorization_code)
    }

    res.status(200).json({ signature: generatedSignature})
   // console.log(generateSignature(process.env.ZOOM_SDK_KEY, process.env.ZOOM_SDK_SECRET, 83248533497, 0))
  
  }
  