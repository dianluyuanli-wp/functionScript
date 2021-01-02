(function(modules) {
    let initedModules = {};
    function __webpack__require(moduleId) {
      if (initedModules[moduleId]) {
        return initedModules[moduleId].exports;
      }
      const dullModule = initedModules[moduleId] = {
        i: moduleId,
        exports: {}
      }
      dullModule.exports.call(dullModule.exports, dullModule, dullModule.exports, __webpack__require)
      return dullModule.exports;
      //__webpack__require(dullModule.exports)
    }
    return __webpack__require('entry/index.js');
  })({
    'index.molude': function(module, exports, __webpack__require) {
      eval('__webpack__require(“xxx.js”)')
    }
  })