// import path from 'path';
// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import config from './webpack.config.babel';
// import Express from 'express';
//
// // create Express app & set it to port 3000
// const app = new Express();
// const port = 3000;
// // webpack compiles the config file
// const compiler = webpack(config);
// // use webpackDevMiddleware on compiler
// app.user(webpackDevMiddleware(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath,
// }));
// // define entry point html
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirName, 'index.html'));
// });
// // create server listener
// app.listen(port, error => {
//   /* eslint-disable no-console */
//   if (error) {
//     console.error(error);
//   } else {
//     console.info(
//       '🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.',
//       port,
//       port
//     );
//   }
//   /* eslint-enable no-console */
// });

/*
npm install --save-dev babel-cli babel-core babel-loader babel-plugin-transform-object-rest-spread babel-preset-es2015 babel-preset-react babel-register eslint eslint-config-airbnb eslint-plugin-impot eslint-plugin-jsx-a11y eslint-plugin-react express webpack webpack-dev-middleware
*/
