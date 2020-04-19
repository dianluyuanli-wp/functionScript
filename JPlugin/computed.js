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
    const ansString = '总阅读数:' + compute('views') + '总评论' + compute('comments') + '总点赞' + compute('likes');
    console.log(ansString);
    return ansString;
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

const getUrl = (id, page) => `https://www.jianshu.com/u/${id}?order_by=shared_at&page=${page}`;
const getCount = (originContent, reg) => originContent.toString().match(reg).reduce((oldValue, newVaule) => {
    return oldValue + parseInt(newVaule)}, 0)

const countThroughApi = async function() {
    const exec = /[0-9a-z]{12}$/
    const userId = window.location.href.match(exec)[0];
    if (!userId) {
        return 'notFind';
    }
    let page = 1;
    let views = 0, comments = 0, likes = 0;
    let res;
    const viewReg = /(?<=<i class="iconfont ic-list-read"><\/i>\s).*(?=(\s)*<\/a>)/g;
    const commentReg = /(?<=<i class="iconfont ic-list-comments"><\/i>\s).*(?=(\s)*<\/a>)/g;
    const likesReg = /(?<=<i class="iconfont ic-list-like"><\/i>\s).*(?=(\s)*<\/span>)/g;
    while (true) {
        res = await getApiPromise(getUrl(userId, page));
        if (res.includes('<!-- 发表了文章 -->') || res.includes('<!-- 发表了评论 -->')) {
            break;
        }
        views += getCount(res, viewReg);
        comments += getCount(res, commentReg);
        likes += getCount(res, likesReg);
        page += 1;
    }
    const ansString = '总阅读数:' + views + ' 总评论：' + comments + ' 总点赞: ' + likes;
    console.log(ansString);
    return ansString;
}

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse)
{
    sendResponse('');
    if (request.cmd === 'dom') {
        alert(await allFunc());
    } else {
        alert(await countThroughApi())
    }
});