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

let shan = {
    age: 18
};
let value = shan.age;
let descriptor = {
    get() {
        console.log("获取值", value);
        return value;
    },
    set(val) {
        console.log("修改值", val);
        value = val;
    }
};
Object.defineProperty(shan, "age", descriptor);
 
shan.age;//触发get方法
 
shan.age = 15;//触发set方法
