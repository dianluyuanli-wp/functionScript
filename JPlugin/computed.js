let allFunc = async function() {
    const originPositon = window.scrollY;
    let currentDocHeight = 1;
    let newHeight = 0;
    const scrollFunc = async() => {
        while(currentDocHeight !== newHeight) {
            currentDocHeight = $(document).height();
            await new Promise((resolve) => {
                $(document).scrollTop($(document).height());
                setTimeout(resolve, 800);
            })
            newHeight = $(document).height();
        }
    }
    await scrollFunc();
    //  回到初始位置
    $(window).scrollTop(originPositon);
    const targetMap = {
        views: 'read',
        comments: 'comments',
        likes: 'like'
    }
    const compute = function(type) {
        const lable = targetMap[type];
        let count = 0;
        $(`.ic-list-${lable}`).each(function(key, value) {
            const parentNodeHtmlContent = $(this).parent().html();
            count += parseInt(parentNodeHtmlContent.replace(`<i class="iconfont ic-list-${lable}"></i>`, ''));
        });
        return count;
    }
    console.log('总阅读数:' , compute('views'), '总评论', compute('comments'), '总点赞', compute('likes'));
    return '总阅读数:' + compute('views') + ' 总评论:' + compute('comments') +  ' 总点赞: ' + compute('likes')
}

const getApiPromise = function(url) {
    return new Promise((resolve, reject) => {
        try {
            $.get(url, function(data) {
                resolve(data);
            })
        } catch(e) {
            reject(e)
        }
    })
}

const countThroughApi = async function() {
    //  https://www.jianshu.com/u/ddd82379f406?order_by=shared_at&page=2
    const exec = /[0-9a-z]{12}$/
    const userId = window.location.href.match(exec)[0];
    if (!userId) {
        return 'notFind';
    }
    let page = 1
    const getUrl = `https://www.jianshu.com/u/${userId}?order_by=shared_at&page=${page}`
    let res = await getApiPromise(getUrl)
    console.log(res);
}

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse)
{
    sendResponse('我收到了你的消息！');
    const ans = await allFunc();
    alert(ans);
});