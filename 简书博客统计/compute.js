// var script = document.createElement("script");
// script.src = "https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js";
// document.getElementsByTagName('head')[0].appendChild(script);

let allFunc = async function() {
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
}
//$(allFunc);
allFunc();