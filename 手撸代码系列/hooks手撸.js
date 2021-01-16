var stats;
function useState(init) {
  stats = stats || init;
  function set(value) {
    stats = value;
    render();
  }
  return [stats, set];
}

var depen;
function useEffect(fn, dep) {
  const shouldUpdate = !dep ||depen.reduce((all, item, index) => {
    return all + (dep[index] === item);
  }, 0) === depen.length;
  depen.every((item, index) => item === dep[index]);
  if (shouldUpdate) {
    fn();
    depen = dep;
  }
};

//  进阶版本

let memorizedArry = [];
let cursor = 0;
function useState(init) {
  let current = cursor;
  memorizedArry[cursor] = memorizedArry[cursor] || init;
  function set(value) {
    //stats = value;
    memorizedArry[current] = value;
    render();
    cursor = 0;
  }
  return [memorizedArry[cursor++], set];
}

var depen;
function useEffect(fn, dep) {
  const noDep = !dep;
  const shouldUpdate = memorizedArry[cursor].every((item, index) => item === dep[index]);
  if (noDep || shouldUpdate) {
    fn();
    memorizedArry[cursor] = dep;
  }
  cursor++;
};