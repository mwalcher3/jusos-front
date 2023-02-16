import sendgrid from "@sendgrid/mail";


sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

 export default async function handler(req, res) {
   const body= JSON.parse(req.body)
   var values = Object.values( body );

    try {
  
        await sendgrid.send({
          from: "kontakt@jusos-heidelberg.de", // your website email address here
          to: ["sprecherinnen-jusos@jusos-heidelberg.de"], // Your email where you'll receive emails
          subject: `${values[2]}`,
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      
      <body>
              <h3>Sie haben eine neue Nachricht von ${values[0]}, ihre email ist: ✉️${values[1]} </h3>
              <p>Nachricht:</p>
              <p>${values[3]}</p>
      </body>
      </html>`,
        
        });

      } catch (error) {
         console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
      }


    return res.status(200).json({ error: "no error" });
  }