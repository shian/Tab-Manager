/**
 * Created by shian on 12/7/15.
 */

chrome.webRequest.onBeforeRequest.addListener(
    function (detail) {
        chrome.tabs.query({url: detail.url, status:"complete"}, // query with same url
            function (result) {
                console.log(result);
                console.log(detail);
                if (result.length > 0) {
                    // remove tab that loading
                    if(detail.tabId!=-1){
                        chrome.tabs.remove(detail.tabId);
                    }
                    // focus on loaded tab
                    chrome.windows.update(result[0].windowId, {focused: true});
                    chrome.tabs.update(result[0].id, {active: true});
                    return {cancel:true};
                }
            }
        );

        return {cancel: false}
    },
    {   // filter
        urls: ["<all_urls>"],
        types: ["main_frame"]
    },
    ["blocking"]
);
