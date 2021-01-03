class Animal {};

function Cat() {
    Animal.call(this);
}

Cat.prototype = new Animal();

//  更加好的方法
(function() {
    let sup = function(){};
    sup.prototype = Animal.prototype;
    Cat.prototype = new sup();
}())