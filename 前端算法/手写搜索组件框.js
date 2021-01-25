{/* <div class="search">
<input type="text" id="txt" value="" placeholder="请输入岗位名称" /><button class="btn_search">搜索</button>
</div>
<div id="box"></div> */}

//  https://juejin.cn/post/6904151596960071687
let contentArr = ['我来啦', '什么鬼', '哈哈哈'];
let input = document.getElementById('txt');
input.addEventListener('keyup', function() {
  let pop = document.getElementById('pop');
  let box = document.getElementById('box');
  console.log(pop);
  pop && box.removeChild(pop);
  let value = input.value;
  pop = document.createElement('ul');
  pop.id = 'pop';
  contentArr.forEach(item => {
    let li = document.createElement('li');
    li.innerHTML = item;
    pop.appendChild(li);
    li.setAttribute('style', 'color: red')
    li.addEventListener('click', function() {
      input.value = item;
      box.removeChild(pop)
    })
    li.addEventListener('mouseenter', function() {
      li.setAttribute('style', 'color: blue')
    })
    li.addEventListener('mouseout', function() {
      li.setAttribute('style', 'color: red')
    })
  })

  box.appendChild(pop);
})