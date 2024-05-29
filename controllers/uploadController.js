const { v4: uuid } = require("uuid");
const upload = require("./utils/image");
const firebaseAdmin = require("firebase-admin");
const bucket = firebaseAdmin.storage().bucket();
const { isAuth } = require("../utils/auth");
