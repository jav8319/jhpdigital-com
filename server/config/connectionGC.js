require('dotenv').config();
const { Storage }= require('@google-cloud/storage') ;

const PROJECTID = process.env.PROJECTID;
const GCTYPE = process.env.GCTYPE;
const GCPROJECTID = process.env.GCPROJECTID;
const GCPRIVATE_KEY_ID = process.env.GCPRIVATE_KEY_ID;
const GCPRIVATE_KEY = process.env.GCPRIVATE_KEY ? process.env.GCPRIVATE_KEY.replace(/\\n/g, '\n') : null;
const GCCLIENT_EMAIL = process.env.GCCLIENT_EMAIL;
const GCCLIENT_ID = process.env.GCCLIENT_ID;
const GCAUTH_URI = process.env.GCAUTH_URI;
const GCTOKEN_URI = process.env.GCTOKEN_URI;
const GCAUTH_PROVIDER = process.env.GCAUTH_PROVIDER;
const GCCLIENT_X509 = process.env.GCCLIENT_X509;
const GCUNIVERSE_DOMAIN = process.env.GCUNIVERSE_DOMAIN;
const bucketName = process.env.BUCKETNAME ? process.env.BUCKETNAME : null;

if (!PROJECTID || !GCTYPE || !GCPROJECTID || !GCPRIVATE_KEY_ID || !GCPRIVATE_KEY || !GCCLIENT_EMAIL ||
  !GCCLIENT_ID || !GCAUTH_URI || !GCTOKEN_URI || !GCAUTH_PROVIDER || !GCCLIENT_X509 || !GCUNIVERSE_DOMAIN || !bucketName) {
  console.log('*******something not right with the env variables******');
}

const storage = new Storage({
  projectId: PROJECTID,
  credentials: {
    type: GCTYPE,
    project_id: GCPROJECTID,
    private_key_id: GCPRIVATE_KEY_ID,
    private_key: GCPRIVATE_KEY,
    client_email: GCCLIENT_EMAIL,
    client_id: GCCLIENT_ID,
    auth_uri: GCAUTH_URI,
    token_uri: GCTOKEN_URI,
    auth_provider_x509_cert_url: GCAUTH_PROVIDER,
    client_x509_cert_url: GCCLIENT_X509,
    universe_domain: GCUNIVERSE_DOMAIN
  }
});

module.exports = {
  bucketName,
  storage
};