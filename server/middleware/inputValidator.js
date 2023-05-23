import validator from "validator";


export function inputValidator (req, res, next) {

    const phoneNumber = req.body?.phone;
    const email = req.body?.email;
    const imgBase64 = req.body?.imgBase64;

    // Validate phone number
    if (phoneNumber && !validator.isMobilePhone(phoneNumber, 'any')) {
        return res.status(400).json({status : false , error: 'Invalid phone number' });
    }

    // Validate email
    if (email && !validator.isEmail(email)) {
        return res.status(400).json({status : false , error: 'Invalid email address' });
    } 

    //validate image
    if (imgBase64 && !validator.isBase64(imgBase64,{ urlSafe: false })) {
      return res.status(400).json({status : false , error: 'Invalid image data' });
    }

    // If both phone number and email are valid, proceed to the next middleware
    next();
};


export function sanitizeInputs (req, res, next)  {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = validator.escape(req.body[key]);
      }
    }
  
    // Proceed to the next middleware
    next();
};