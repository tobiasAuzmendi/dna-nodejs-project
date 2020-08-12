import { Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import path from 'path';
const hbs = require('nodemailer-express-handlebars');
import Validator from 'validatorjs';

interface SendEmailBody {
  email: string;
}

let smtpTransport: Mail;

initEmailTransport();

function initEmailTransport() {
    smtpTransport = nodemailer.createTransport({
        port: 465,
        debug: true,
        host: 'Gmail',
        service:'Gmail',
        auth: {
            user: 'tobias.auzmendi.dev@gmail.com',
            pass: 'Hola1234"'
        },
    });

    var handlebarsOptions = {
        defaultLayout: null,
        viewEngine: 'html',
        viewPath: path.resolve('./src/modules/email/html/'),
        // extname: '.html'
    };

    smtpTransport.use('compile', hbs(handlebarsOptions));
}

const sendEmail = (req: Request, res: Response, next: NextFunction) => {
  var requestValidation = _getSendEmailValidation(req.body);

  if (!requestValidation.passes) {
    return res.status(400).send({
        message: requestValidation.firstErrorMessage
    });
  } else {
    const email = req.body.email;
    const data = {
      to: email,
      from: 'tobias.auzmendi.dev@gmail.com',
      // template: // 'account-validation',
      subject: 'Validación de cuenta',
      text: 'test',

      // TODO : Read the email content from the HTML since it's the correct way
      // to do this. I tried to make this work in the best way but I was having errors and 
      // due to the delivery time I will leave this solution for the moment
      html: `
      <!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office">

        <head>
          <meta charset="utf-8"> <!-- utf-8 works for most cases -->
          <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
          <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
          <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->
          <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

          <link href="https://fonts.googleapis.com/css?family=Gothic+A1:400,600,700&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">

          <!-- CSS Reset : BEGIN -->
          <style>
            html,
            body {
              margin: 0 auto !important;
              padding: 0 !important;
              height: 100% !important;
              width: 100% !important;
              background: white;
            }

            .max-width-container {
              margin: auto;
              max-width: 400px;
            }

            /* What it does: Stops email clients resizing small text. */
            * {
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
            }

            /* What it does: Centers email on Android 4.4 */
            div[style*="margin: 16px 0"] {
              margin: 0 !important;
            }

            /* What it does: Stops Outlook from adding extra spacing to tables. */
            table,
            td {
              mso-table-lspace: 0pt !important;
              mso-table-rspace: 0pt !important;
            }

            /* What it does: Fixes webkit padding issue. */
            table {
              border-spacing: 0 !important;
              border-collapse: collapse !important;
              table-layout: fixed !important;
              margin: 0 auto !important;
            }

            /* What it does: Uses a better rendering method when resizing images in IE. */
            img {
              -ms-interpolation-mode: bicubic;
            }

            /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
            a {
              text-decoration: none;
            }

            /* What it does: A work-around for email clients meddling in triggered links. */
            *[x-apple-data-detectors],
            /* iOS */
            .unstyle-auto-detected-links *,
            .aBn {
              border-bottom: 0 !important;
              cursor: default !important;
              color: inherit !important;
              text-decoration: none !important;
              font-size: inherit !important;
              font-family: 'Gothic A1', sans-serif !important;
              font-weight: inherit !important;
              line-height: inherit !important;
            }

            /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
            .a6S {
              display: none !important;
              opacity: 0.01 !important;
            }

            /* What it does: Prevents Gmail from changing the text color in conversation threads. */
            .im {
              color: inherit !important;
            }

            /* If the above doesn't work, add a .g-img class to any image in question. */
            img.g-img+div {
              display: none !important;
            }

            /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
            /* Create one of these media queries for each additional viewport size you'd like to fix */

            /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
            @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
              u~div .email-container {
                min-width: 320px !important;
              }
            }

            /* iPhone 6, 6S, 7, 8, and X */
            @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
              u~div .email-container {
                min-width: 375px !important;
              }
            }

            /* iPhone 6+, 7+, and 8+ */
            @media only screen and (min-device-width: 414px) {
              u~div .email-container {
                min-width: 414px !important;
              }
            }
          </style>

          <!-- CSS Reset : END -->

          <!-- Progressive Enhancements : BEGIN -->
          <style>
            .dot-divider{
              position: relative;
            }
            .dot-divider::after{
              content: "";
              height: 2px;
              width: 2px;
              border-radius: 50%;
              position: absolute;
              right: -10px;
              top: 8px;
              background: #9B9B9B;
            }
            .email-container {
              background-color: white;
            }

            .bg_white {
              background: #ffffff;
            }

            .email-section {
              padding: 30px;
              padding-top: 0px;
              padding-bottom: 70px;
            }

            /*BUTTON*/
            .btn {
              background: #000000;
              border-radius: 2px;
              font-size: 12px;
              letter-spacing: 0;
              text-align: center;
              line-height: 12.8px;
              font-family: 'Gothic A1', sans-serif;
              padding: 10px 20px;
            }
            .btn span {
              color: #FFFFFF;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              font-family: 'Gothic A1', sans-serif;
              color: #000000;
              margin-top: 0;
              font-weight: 400;
            }

            body {
              font-family: 'Gothic A1', sans-serif;
              font-weight: 400;
              font-size: 15px;
              line-height: 1.8;
              color: rgba(0, 0, 0, .4);
            }

            /*HEADING SECTION*/
            .heading-section p {
              font-size: 12px;
              color: #3B3B3B;
              letter-spacing: 0.12px;
              line-height: 18px;
              margin: 0px;
              margin-bottom: 40px;
            }

            .heading-section h2 {
              color: #000000;
              font-size: 24px;
              margin-top: 0;
              margin-bottom: 25px;
              letter-spacing: 0.29px;
              font-weight: bold;
              line-height: 1;

            }

            /*INFO*/
            .text-services h3 {
              font-size: 15px;
              color: #000000;
              letter-spacing: 0.18px;
              line-height: 1;
              margin-bottom: 5px;
              font-weight: 600;
              font-family: 'Gothic A1', sans-serif;
            }

            .text-services p {
              font-size: 12px;
              color: #3B3B3B;
              letter-spacing: 0.14px;
              line-height: 18px;
              margin: 0px;
              font-family: 'Gothic A1', sans-serif;
            }

            /*FOOTER*/

            .footer {
              background-color: rgb(255, 255, 255);
              padding: 20px 30px;
            }


            @media screen and (max-width: 500px) {
              .full-width-responsive {
                max-width: 100% !important;
                min-width: 100% !important;
                width: 100% !important;
              }

              .full-width-responsive.text {
                max-width: 65% !important;
                min-width: 65% !important;
                width: 65% !important;
              }

              .full-width-responsive.img {
                max-width: 30% !important;
                min-width: 30% !important;
                width: 30% !important;
              }
            }
          </style>


        </head>

        <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #ffffff;">
          <center style="width: 100%; background-color: #ffffff;">
            <div
              style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: 'Gothic A1', sans-serif;">
              &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
            </div>
            <div style="max-width: 600px; margin: 0 auto;" class="email-container">
              <!-- BEGIN BODY -->
              <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                style="margin: auto;">
                <tr>
                  <td valign="top" class="bg_white" style="padding: 20px;padding-bottom: 0px">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td class="logo" style="text-align: center;">
                          <h1><a href="#" style="cursor:default;"><img src="https://tobiasauzmendi.dev/files/images/logo.png" alt=""
                                style="width: 70px; max-width: 70px; height: auto; margin: auto; display: block;cursor:pointer;"></a>
                          </h1>
                          <div
                            style="border: 0.5px solid #979797;max-width: 170px;width:100%;margin:auto;margin-top: 20px;margin-bottom:55px">
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr><!-- end tr -->
                <tr>
                  <td class="bg_white email-section">
                    <div class="heading-section max-width-container" style="text-align: left; ">
                      <h2>Valida tu registro</h2>
                      <p>Activa tu perfil para que realices tu primer login. <br>
                          Comprueba tu correo electrónico.
                      </p>
                    </div>
                    <div class="max-width-container">
                      <a href="#" class="btn"><span>Inicia sesión</span></a>
                      <p
                        style="font-size: 12px;color: #000000;text-align: left;font-family: 'Gothic A1', sans-serif;margin-top: 40px;">
                        Gracias por utilizar nuestra app.</p>
                    </div>
                  </td>
                </tr><!-- end: tr -->
                <!-- 1 Column Text + Button : END -->
              </table>
              <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                style="margin: auto;">
                <div
                            style="border: 0.5px solid rgba(0,0,0,0.1);max-width: 170px;width:100%;margin:auto">
                          </div>
                <tr>
                  <td valign="middle" class="footer email-section">
                    <table>
                      <tr>
                        <td valign="top" width="100%" style="padding-top: 20px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="text-align: left; padding-right: 10px;">
                                <div style="width: 155px;margin: auto;height: 23px;margin-bottom: 20px;">
                                  <div
                                    style="margin: 0px 5px;height:21px;width:21px;min-width: 21px;max-width: 21px;max-height: 21px;float: left;">
                                    <a href="#">
                                      <div
                                        style="border: 1px solid #9B9B9B;border-radius: 50%;text-align: center;height:21px;width:21px;min-width: 21px;max-width: 21px;max-height: 21px;">
                                        <img style="height:10px;margin-bottom: 2px;" src="https://tobiasauzmendi.dev/files/images/facebook.svg" alt="">
                                      </div>
                                    </a>
                                  </div>
                                  <div
                                    style="margin: 0px 5px;height:21px;width:21px;min-width: 21px;max-width: 21px;max-height: 21px;float: left;">
                                    <a href="#">
                                      <div
                                        style="border: 1px solid #9B9B9B;border-radius: 50%;text-align: center;height:21px;width:21px;min-width: 21px;max-width: 21px;max-height: 21px;">
                                        <img style="height:10px;margin-bottom: 2px;" src="https://tobiasauzmendi.dev/files/images/twitter.svg" alt="">
                                      </div>
                                    </a>
                                  </div>
                                  <div
                                    style="margin: 0px 5px;height:21px;width:21px;min-width: 21px;max-width: 21px;max-height: 21px;float: left;">
                                    <a href="#">
                                      <div
                                        style="border: 1px solid #9B9B9B;border-radius: 50%;text-align: center;height:21px;width:21px;min-width: 21px;max-width: 21px;max-height: 21px;">
                                        <i class="zmdi zmdi-linkedin" style="font-size:11px;color:black;position: relative;top: -3px;left: 1px;"></i>
                                      </div>
                                    </a>
                                  </div>
                                  <div
                                    style="margin: 0px 5px;height:21px;width:21px;min-width: 21px;max-width: 21px;max-height: 21px;float: left;">
                                    <a href="#">
                                      <div
                                        style="border: 1px solid #9B9B9B;border-radius: 50%;text-align: center;height:21px;width:21px;min-width: 21px;max-width: 21px;max-height: 21px;">
                                        <i class="zmdi zmdi-google" style="font-size:11px;color:black;position: relative;top: -3px;left: 1px;"></i>
                                      </div>
                                    </a>
                                  </div>
                                  <div
                                    style="margin: 0px 5px;height:21px;width:21px;min-width: 21px;max-width: 21px;max-height: 21px;float: left;">
                                    <a href="#">
                                      <div
                                        style="border: 1px solid #9B9B9B;border-radius: 50%;text-align: center;height:21px;width:21px;min-width: 21px;max-width: 21px;max-height: 21px;">
                                        <img style="height:10px;margin-bottom: 2px;" src="https://tobiasauzmendi.dev/files/images/youtube.svg" alt="">
                                      </div>
                                    </a>
                                  </div>
                                </div>
                                <div style="width: 290px;margin: auto;margin-bottom: 30px;height: 13px;">
                                  <div class="dot-divider" style="margin: 0px 9px;float: left;margin-left: 0px;line-height: 1;">
                                    <a href="#">
                                      <span style="font-size: 11px;color: #9B9B9B;letter-spacing: 0.09px;">
                                        ¿Quiénes somos?
                                      </span>
                                    </a>
                                  </div>
                                  <div class="dot-divider" style="margin: 0px 9px;float: left;line-height: 1;">
                                    <a href="#">
                                      <span style="font-size: 11px;color: #9B9B9B;letter-spacing: 0.09px;">
                                        Contacto
                                      </span>
                                    </a>
                                  </div>
                                  <div class="dot-divider" style="margin: 0px 9px;float: left;line-height: 1;">
                                    <a href="#">
                                      <span style="font-size: 11px;color: #9B9B9B;letter-spacing: 0.09px;">
                                        Precios
                                      </span>
                                    </a>
                                  </div>
                                  <div style="margin: 0px 9px;float: left;;margin-right: 0px;line-height: 1;">
                                    <a href="#">
                                      <span style="font-size: 11px;color: #9B9B9B;letter-spacing: 0.09px;">
                                        Blog
                                      </span>
                                    </a>
                                  </div>
                                </div>
                                <div style="font-size: 11px;color: #9B9B9B;text-align: center;line-height: 16px;">
                                  Si no quieres recibir notificaciones, puedes<a href="#"
                                    style="font-size: 11px;color: rgba(0,0,0,0.7);text-align: center;line-height: 13px;font-weight: bold"> desuscribirte  </a> aquí.
                                  <br>
                                  ®Apps. 1111 W El Camino Real Mountain View CA
                                </div>
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr><!-- end: tr -->
              </table>

            </div>
          </center>
        </body>
        </html>
      `
    };

    smtpTransport.sendMail(data, function(err, emailInfo) {
      if (err) {
        // I would call a LogController function here.
        console.log(err);
      }
    });

    return res.status(200).send('Correo enviado');
  }
};

const _getSendEmailValidation = (reqBody: SendEmailBody) => {
  var rules = {
    email: 'required|email'
  };

  var validation = new Validator(reqBody, rules),
      passes = validation.passes(),
      errors = validation.errors.errors;

  return {
      passes: passes,
      firstErrorMessage: passes ? '' : errors[Object.keys(errors)[0]][0]
  };
}

export default {
  sendEmail: sendEmail
}