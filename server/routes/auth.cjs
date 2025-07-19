@@ .. @@
 const { body, validationResult } = require('express-validator');
 const rateLimit = require('express-rate-limit');
-const db = require('../config/database');
-const { sendEmail } = require('../services/emailService');
+const db = require('../config/database.cjs');
+const { sendEmail } = require('../services/emailService.cjs');
 const router = express.Router();