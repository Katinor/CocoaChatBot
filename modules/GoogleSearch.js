/**
 * @file GoogleSearch.js
 * @author Hoto Cocoa <cocoa@hoto.us>
 * @license AGPL-3.0
 */

module.exports = class GoogleSearch {
	/**
	 * @param {Number} maxResultCount 
	 */
	constructor(maxResultCount = 10) {
		this.maxResultCount = maxResultCount;
	}

	/**
	 * @param {String} searchValue 
	 */
	async getResult(searchValue = '') {
		return new Promise(async (resolve) => {
			const $ = require('cheerio').load((await require('./AsyncRequest')(`https://www.google.com/search?hl=en&q=${encodeURI(searchValue)}&sa=N&num=${this.maxResultCount}&ie=UTF-8&oe=UTF-8&gws_rd=ssl`)).body);
			var result = [];
			$('div.g').each((i, e) => {
				$(e).find('h3.r a')[0] && result.push({
					index: i,
					title: $(e).find('h3.r a').first().text(),
					href: decodeURI($(e).find('h3.r a')[0].attribs.href.replace(/(?:\/url\?q=)?(.*?)(?:&sa=.*)/, '$1')),
					description: $(e).find('div.s').find('span.st').text()
				});
			}); 
			resolve(result);
		});
	}
}
