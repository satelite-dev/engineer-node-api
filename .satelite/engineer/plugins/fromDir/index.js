const fs = require('fs');
const path = require('path');

const dirContents = (folderPath) => (
    new Promise((resolve, reject) => {
        try {
            resolve(fs.readdirSync(folderPath));
        } catch (err) {
            reject(err);
        }
    })
)

const readFile = (file, encoding = 'utf8', adapter = contents => contents) => (
    new Promise((resolve, reject) => {
        fs.readFile(file, encoding, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(adapter(data));
        })
    })
)


const fromDir = async (config, options) => {
    if (!'data' in config) {
        config.data = {};
    }

    const version = await readFile(path.join(process.cwd(), options?.modelPath, 'version'));
    const entityPaths = await dirContents(path.join(process.cwd(), options?.modelPath, 'entities'));

    const entities = await Promise.all(
        entityPaths.map(
            (entity) => readFile( 
                path.join(
                    process.cwd(), options?.modelPath, 'entities', entity
                ),
                'utf8',
                (contents) => JSON.parse(contents)
            )
        )
    );

    config.data[options.key ? options.key : 'model'] = {
        version,
        entities,
    };

    return config;
}

const fromDirPlugin = (options = {}) => [fromDir, options];

module.exports = fromDirPlugin;