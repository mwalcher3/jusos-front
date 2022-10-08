import sendgrid from "@sendgrid/mail";


sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

 export default async function handler(req, res) {
   const body= JSON.parse(req.body)

    try {
  
        await sendgrid.send({
          to: "melisande.walcher@gmail.com", // Your email where you'll receive emails
          from: "melisande.walcher@gmail.com", // your website email address here
          subject: `${body.Beftreff}`,
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      
      <body>
              <h3>Sie haben eine neue Nachricht von ${body.Name}, ihre email ist: ✉️${body.Email} </h3>
              <p>Nachricht:</p>
              <p>${body.Nachricht}</p>
      </body>
      </html>`,
        
        });

      } catch (error) {
         console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
      }


    return res.status(200).json({ error: "no error" });
  }