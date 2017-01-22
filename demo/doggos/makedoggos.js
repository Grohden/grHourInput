/**
 * Created by Rohden on 22/01/2017.
 */

//TODO: make a watcher for this
const pug = require('pug');
const fs = require('fs');

// Compile template.pug, and render a set of data

try {
    let renderedHtml = pug.renderFile('index.pug', {
        pretty:true
    });
    fs.writeFileSync("../index.html", renderedHtml);
} catch (exception){
    console.error("Failed to create doggos:");
    console.error(exception);
} finally {
    console.log('Doggos created with success');
}