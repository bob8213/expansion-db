
((global) => {
  let Config = (() => {
    const config = require('./config/config.json');
    return config;
  })();

  global.Config = Config;

})( this );
