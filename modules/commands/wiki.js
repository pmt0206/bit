module.exports.config = {
	name: "wiki",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Tìm mọi thông tin cần biêt thông qua Wikipedia",
	commandCategory: "study",
	usages: "[en] [thông tin cần tìm kiếm]",
	cooldowns: 1,
	dependencies: {
        "wikijs": ""
    }
}

module.exports.languages = {
    "vi": {
        "missingInput": "Mày Ghi Hộ Bố Cái Cần Tìm Ra!",
        "returnNotFound": "Mày Có Chắc Là Nó Có Tồn Tại Trên Wikipedia Không? (っಠ‿ಠ)っ %1"
    },
    "en": {
        "missingInput": "Enter what you need to search for.",
        "returnNotFound": "Can't find %1"
    }
}

module.exports.run = ({ event, args, api, getText }) => {
    const wiki = (global.nodemodule["wikijs"]).default;
    let content = args.join(" ");
    let url = 'https://vi.wikipedia.org/w/api.php';
    if (args[0] == "en") {
        url = 'https://en.wikipedia.org/w/api.php'; 
        content = args.slice(1, args.length);
    }
    if (!content) return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
    return wiki({ apiUrl: url }).page(content).catch(() => api.sendMessage(getText("returnNotFound", content), event.threadID, event.messageID)).then(page => (typeof page != 'undefined') ? Promise.resolve(page.summary()).then(val => api.sendMessage(val, event.threadID, event.messageID)) : '');

}