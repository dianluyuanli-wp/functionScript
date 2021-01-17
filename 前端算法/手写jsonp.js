function jsonp(url, data, callback) {
    let hasQuery = url.indexOf('?') >= 0;
    let query = '';
    for(let key in data) {
      if (data.hasOwnProperty(key)) {
        query = query + '&'+ key + '=' + data[key]
      }
    }
    let final = hasQuery ? query.slice(1) : '?' + query;
    let script = document.createElement('script');
    script.src = final + '&callback=jsonpCallback';
    window.jsonpCallback = function(value) {
      callback(value);
      document.body.removeChild(script);
    }
    document.body.appendChild(script);
  }