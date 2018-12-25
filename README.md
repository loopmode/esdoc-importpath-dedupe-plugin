# ESDoc Import Path Dedupe Plugin
This is a plugin that converts the import path in documentation.
It removes duplicate last parts in import paths, which is useful for components that have a folder and a file with the same name, but are imported using the `index.js` file anyways.
For example, consider this structure:

```
src/
  components/
    MyComponent/
      index.js
      MyComponent.js
```

In your codebase, you will do `import MyComponent from 'components/MyComponent'`.
ESDoc will generate docs with `import MyComponent from 'components/MyComponent/MyComponent.js'`.
Using this plugin, the docs will be generated with `import MyComponent from 'components/MyComponent'` because the plugin detects that the last two segments of the path are equal when applying the `js` extension.

 
## Install
```sh
npm install esdoc-importpath-dedupe-plugin
```

## Config

In the default configuration, only paths to files with the extension `js` are handled, but you can change that using the `extensions` option. 
The extensions option can be a comma-separated string or an array of extension strings.

```json
{
  "source": "./src",
  "destination": "./doc",
  "plugins": [
    {
      "name": "esdoc-importpath-dedupe-plugin",
      "option": {
        "extensions": ["js"]
      }
    }
  ]
}
```

## LICENSE
MIT

## Author
Jovica Aleksic
