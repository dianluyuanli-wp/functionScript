// 类层面
@xxx
class A {

};

A = xxx(A) || A
function xxx(target) {
    target.prototype.log = () => {
        console.log('111');
    }
}

class B {
    @bbb
    getXXX() {

    }
}

function bbb(value) {
    return function (target, key, descriptor) {
        
        return descriptor;
    }
}

