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
    title: "点击测试",
    documentUrlPatterns: ['https://*/*', 'http://*/*'],
	onclick: function(){
        sendMessageToContentScript({cmd:'test', value:'你好，我是popup！'}, function(response)
        {
            console.log('来自content的回复：'+response);
        });
    }
});

chrome.runtime.onInstalled.addListener(function(){
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					// 只有打开简书才显示pageAction
					new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: '/'}})
				],
				actions: [new chrome.declarativeContent.ShowPageAction()]
			}
		]);
	});
});

