const fs = require('fs-extra');

try {
    // create module
    fs.removeSync('./module/');
    fs.copySync('./dist/', './module');
    fs.copySync('./package.json', './module/package.json');
    fs.copySync('./migrations', './module/migrations');
} catch (err) {
    console.log(err);
}
