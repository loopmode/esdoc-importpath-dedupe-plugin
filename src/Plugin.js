const fs = require('fs');

class Plugin {
  onHandleDocs(ev) {
    let extensions = ev.data.option.extensions
    for (const doc of ev.data.docs) {
      if (!doc.importPath) continue;
 
      const parts = doc.importPath.split('/');
      if (parts.length >= 2) {
        const secondLast = parts[parts.length - 2];
        const last = parts[parts.length - 1];
        let isDupe = last === secondLast;
        if (!isDupe && extensions) {
          if (typeof extensions === 'string') {
            extensions = extensions.split(',');
          }
          isDupe = extensions.some(extension => `${secondLast}.${extension}` === last);
        }
        if (isDupe) {
          doc.importPath = parts.slice(0, parts.length - 1).join('/');
        }
      }
    }
  }
}

module.exports = new Plugin();
