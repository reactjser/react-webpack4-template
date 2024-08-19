// const ora = require('ora');
const { rimraf } = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf');

// const spinner = ora('building for production...');
// spinner.start();

rimraf(path.join(__dirname, '../dist'))
  .then(() => {
    webpack(webpackConfig, (err, stats) => {
      // spinner.stop();
      if (err) throw err;
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
          chunks: false,
          chunkModules: false,
        }) + '\n\n',
      );

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'));
        process.exit(1);
      }

      console.log(chalk.cyan('  Build complete.\n'));
    });
  })
  .catch((err) => {
    throw err;
  });
