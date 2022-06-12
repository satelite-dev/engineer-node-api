const fromDir = require('./.satelite/engineer/plugins/fromDir');

/* 
  This should 
*/
const computeConfig = (config)=> 
  config?.plugins?.reduce(async (prev, curr)=>{
  const accum = await curr[0](prev, curr[1]);
  return accum;
}, config)

module.exports = async () => {
  const config = {
    data: {},
    plugins: [
     fromDir({
       modelPath: '.satelite/engineer/model/'
     })
    ],
    templates: {
      prisma: [
        {
          src: '.satelite/engineer/templates/prisma/schema.hbs',
          dest: 'prisma/schema.prisma',
          key: 'model'
        }
      ],
      vercel: [
        {
          src: '.satelite/engineer/templates/vercel/endpoint.hbs',
          dest: 'api/[id]/index.js',
          key: 'model.entities'
        }
      ]
    },
  };

  return computeConfig(config);
};
