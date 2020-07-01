const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({
    welcome : 'Welcome to Yearbook Server 👋🏻',
    apiDocs : 'https://documenter.getpostman.com/view/6857431/Szmb7zkd',
    author : 'https://raghavsharma.xyz',
    projectRepository : {
      frontend : 'https://github.com/raghav4/yearbook',
      backend : 'https://github.com/raghav4/yearbook-backend',
    },
    issues : 'https://github.com/raghav4/Yearbook/issues/',
  });
});

module.exports = router;
