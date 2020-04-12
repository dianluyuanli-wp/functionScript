function sendMessageToContentScript(message, callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		chrome.tabs.sendMessage(tabs[0].id, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}

chrome.contextMenus.create({
    title: "计算浏览数",
    documentUrlPatterns: ['https://www.jianshu.com/u/*'],
	onclick: function(){
        sendMessageToContentScript({cmd:'test', value:'你好，我是popup！'}, function(response)
        {
            //  console.log('来自content的回复：'+response);
        });
    }
});

chrome.runtime.onInstalled.addListener(function(){
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					// 只有打开简书才显示pageAction
					new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'www.jianshu.com/u'}})
				],
				actions: [new chrome.declarativeContent.ShowPageAction()]
			}
		]);
	});
});

