(function(modules) {
  let initmodules = {};
  function __webpack__require(moduleId) {
    if (initmodules[moduleId]) {
      return initmodules[moduleId].exports;
    }
    const dullModule = initmodules[moduleId] = {
      export: null,
      id: moduleId
    }
    modules[moduleId].call(dullModule,dullModule, dullModule.exports, __webpack__require)
    return dullModule.exports;
  }
  return __webpack__require('entry/index.js')
})({
  'index.js': function(module, exports, __webpack__require) {
    eval('let a = __webpack__require("xxx.js")');
  }
})