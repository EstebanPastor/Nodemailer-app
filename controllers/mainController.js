const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
const { link } = require("../routes/mainRoute");
const dotenv = require("dotenv").config();

// send mail for a testing account

const signup = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let message = {
    from: '"Esteban Pastor 👨‍💻" <estebanandrespastor@gmail.com>',
    to: "theworld@example.com, theworld@example.com",
    subject: "Hello my name is Esteban ✔",
    text: "Im a web developer",
    html: "<b>¡Hi!</b>",
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "You should receive and email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

// send mail for a real gmail account

const getbill = (req, res) => {
  const { userEmail } = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };
  let transporter = nodemailer.createTransport(config);

  let mailGenerator = new mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js",
    },
  });

  let response = {
    body: {
      name: "Daily bill",
      intro: "Your bill has arrived",
      table: {
        data: [
          {
            item: "Nodemailer stack book",
            description: "A backend application",
            price: "$10",
          },
        ],
      },
      outro: "Looking forward to do more business",
    },
  };

  let mail = mailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Place order",
    html: mail,
  };

  transporter.sendMail(message).then(() => {
    return res
      .status(201)
      .json({
        msg: "You should receive an emaile",
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  });
  res.status(201).json("get bill successfully");
};

module.exports = { signup, getbill };
