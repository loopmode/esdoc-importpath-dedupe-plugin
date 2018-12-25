const fs = require('fs');

class Plugin {
  onHandleDocs(ev) {
    let extensions = ['js'];
    if (ev.data.option && ev.data.option.extensions) {
      extensions = ev.data.option.extensions;
    }
    if (typeof extensions === 'string') {
      extensions = extensions.split(',');
    }



    for (const doc of ev.data.docs) {
      if (!doc.importPath) continue;

      const parts = doc.importPath.split('/');
      if (parts.length >= 2) {
        const secondLastPart = parts[parts.length - 2];
        const lastPart = parts[parts.length - 1];
        const isDupe = lastPart === secondLastPart || (
          extensions && extensions.some(ext => lastPart === `${secondLastPart}.${ext}`)
        ); 
        if (isDupe) {
          doc.importPath = parts.slice(0, parts.length - 1).join('/');
        }
      }
    }
  }
}

module.exports = new Plugin();
