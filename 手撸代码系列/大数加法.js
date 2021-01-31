function myAdd(n1, n2) {
    let sn1 = '0' + n1;
    let sn2 = '0' + n2;
    let lengthDiff = sn1.length - sn2.length;
    let padStr = new Array(Math.abs(lengthDiff)).fill('0').join('');
    let resList = [];
    if (lengthDiff > 0) {
      sn2 = padStr + sn2; 
    } else {
      sn1 = padStr + sn1;
    }
    let carry = 0;
    for(let i = 0; i < sn2.length; i++) {
      let res = +sn1[i] + (+sn2[i]) + carry;
      if(res >= 10) {
        resList[i] = ('' + res).slice(1);
        carry = 1
      } else {
        resList[i] = '' + res;
        carry = 0;
      }
    }
    carry && resList.unshift('' + carry);
    return resList.reduce((origin, item) => {
      return origin + item;
    }, '');
  }