const rollup = require('rollup');

async function build() {

  const inputOptions = {
    input : 'src/api/index.js',
    external : ['axios', 'dotenv', '@prisma/client', 'qs', 'jsonwebtoken', 'cookies', '@metamask/eth-sig-util']
  };

  const outputOptions = {
    file: 'node_modules/@satelite/api/index.js',
    format: 'cjs',
    exports : 'auto'
  };

  const bundle = await rollup.rollup(inputOptions)

  // or write the bundle to disk
  await bundle.write(outputOptions);

  // closes the bundle
  await bundle.close();


}

build()