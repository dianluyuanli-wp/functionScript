const showStore = function() {
    
    $(document).click(function(e) { // 在页面任意位置点击而触发此事件
        let content = $(e.target).attr("id");       // e.target表示被点击的目标
        console.log(content, 'xxx');
    })
}

$(document).mousedown(function(e) { // 在页面任意位置点击而触发此事件
    let content = $(e.target).attr("id");       // e.target表示被点击的目标
    console.log(content, 'xxx', e.ctrlKey, e.button);
    $('script').each(function(key, value) {
        if ($(this).html().includes('window.__NEXT_DATA__ = {props:')) {
            console.log($(this).html())
        }
    });
    if (e.ctrlKey && e.button == 0) {
        console.log(window,window.__NEXT_DATA__, 'hahah');
    }
})

document.addEventListener('click', function(e) {
    if (e.ctrlKey) {
        e.stopPropagation();
    }
}, true);

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse)
{
    sendResponse('我收到了你的消息！');
    //showStore();
    // const ans = await allFunc();
    // alert(ans);
});