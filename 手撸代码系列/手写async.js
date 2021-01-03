//  原始代码
const getData = new Promise((res) => setTimeout(() => res('data'), 1000));

async function test() {
    let a = await getData();
    console.log(a);
    let b = await getData();
    console.log(b);
    let c = await getData();
    return { data: c };
}

test().then(res => console.log(res));

function* test2() {
    let a = yield getData();
    console.log(a);
    let b = await getData();
    console.log(b);
}

test3 = autoWrapYield(test2);

function autoWrapYield(genFn) {
    const bindGen = genFn.apply(this, arguments);
    return function() {
        return new Promise((res, rej) => {
            function step(key, result) {
                let genRes;
                try {
                    genRes = bindGen[key](result);
                } catch(e) {
                    rej(e);
                }
                const { done, value } = genRes;
                if (done) {
                    res(value)
                } else {
                    return Promise.resolve(value).then(_ => step('next', _), (e) => {
                        rej(e);
                    })
                }
            }
            step('next');
        })
    }
}