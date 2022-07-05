import sendgrid from "@sendgrid/mail";


sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

 export default async function handler(req, res) {
   const body= JSON.parse(req.body)
    console.log(body)

    try {
         console.log("REQ.BODY", req.body);
        await sendgrid.send({
          to: "melisande.walcher@gmail.com", // Your email where you'll receive emails
          from: "melisande.walcher@gmail.com", // your website email address here
          subject: `${body.subject}`,
          text: `${body.message}`,
        });

      } catch (error) {
         console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
      }


    return res.status(200).json({ error: "no error" });
  }