{/* <div class="search">
<input type="text" id="txt" value="" placeholder="请输入岗位名称" /><button class="btn_search">搜索</button>
</div>
<div id="box"></div> */}

//  https://juejin.cn/post/6904151596960071687
async function getInfo(value) {
    return ['xx', 'xds'];
  }
  let input = document.getElementById('txt');
  input.addEventListener('keyup', async function() {
    let pop = document.getElementById('pop');
    if (pop) {
      document.removeChild(pop);
    }
    let boxDiv = document.getElementById('box');
    let inputCon = document.getElementById('txt').value;
    if (inputCon) {
      return;
    }
    let tempArr = await getInfo(inputCon);
    let ulObj = document.createElement('ul');
    ulObj.id = 'pop';
    boxDiv.appendChild(ulObj);
    for(let i = 0; i<tempArr.length; i++) {
      let liObj = document.createElement('li');
      liObj.id = i;
      liObj.innerHTML = tempArr[i];
      ulObj.appendChild(liObj);
      liObj.addEventListener('click', function() {
        input.value = tempArr[i];
        document.removeChild(ulObj);
      })
      liObj.addEventListener('mouseenter', function() {
        liObj.setAttribute('style', 'color: red');
      })
      liObj.addEventListener('mouseout', function() {
        liObj.setAttribute('style', 'color: blue')
      })
    }
  })