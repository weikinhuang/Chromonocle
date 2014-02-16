/**
 * This file is used for autocomplete and reference for HAR Request objects
 *
 * @see http://www.softwareishard.com/blog/har-12-spec/
 */
"use strict";

/**
 * Chrome Request object
 */
function Request() {
}

Request.prototype.getContent = function(callback) {
	// the callback has 2 arguments function(string content, string encoding) {...};
};

Request.prototype.startedDateTime = "2014-02-16T00:12:25.843Z";

Request.prototype.time = 215.1939868927002;

Request.prototype.request = {
	method : "GET",
	url : "http://autosug.ebay.com/autosug?kwd=c&version=1279292363&_jgr=1&sId=0&_ch=0&callback=GH_ac_callback",
	httpVersion : "HTTP/1.1",
	headers : [
		{
			name : "Pragma",
			value : "no-cache"
		},
		{
			name : "DNT",
			value : "1"
		},
		{
			name : "Accept-Encoding",
			value : "gzip,deflate,sdch"
		},
		{
			name : "Host",
			value : "autosug.ebay.com"
		},
		{
			name : "Accept-Language",
			value : "en-US,en;q=0.8"
		},
		{
			name : "User-Agent",
			value : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1840.2 Safari/537.36"
		},
		{
			name : "Accept",
			value : "*/*"
		},
		{
			name : "Referer",
			value : "http://www.ebay.com/"
		},
		{
			name : "Cookie",
			value : "s=a; nonsession=b; lucky9=c; npii=d; dp1=e; ebay=f; ds2=g"
		},
		{
			name : "Connection",
			value : "keep-alive"
		},
		{
			name : "Cache-Control",
			value : "no-cache"
		}
	],
	queryString : [
		{
			name : "kwd",
			value : "c"
		}, {
			name : "version",
			value : "1279292363"
		}, {
			name : "_jgr",
			value : "1"
		}, {
			name : "sId",
			value : "0"
		}, {
			name : "_ch",
			value : "0"
		}, {
			name : "callback",
			value : "GH_ac_callback"
		}
	],
	cookies : [
		{
			name : "s",
			value : "a*",
			expires : null,
			httpOnly : false,
			secure : false
		}, {
			name : "nonsession",
			value : "b",
			expires : null,
			httpOnly : false,
			secure : false
		}, {
			name : "lucky9",
			value : "c",
			expires : null,
			httpOnly : false,
			secure : false
		}, {
			name : "npii",
			value : "d",
			expires : null,
			httpOnly : false,
			secure : false
		}, {
			name : "dp1",
			value : "e",
			expires : null,
			httpOnly : false,
			secure : false
		}, {
			name : "ebay",
			value : "f",
			expires : null,
			httpOnly : false,
			secure : false
		}, {
			name : "ds2",
			value : "g",
			expires : null,
			httpOnly : false,
			secure : false
		}
	],
	headersSize : 925,
	bodySize : 0
};

Request.prototype.response = {
	status : 200,
	statusText : "OK",
	httpVersion : "HTTP/1.1",
	headers : [
		{
			name : "Date",
			value : "Sun, 16 Feb 2014 00:12:30 GMT"
		}, {
			name : "Content-Encoding",
			value : "gzip"
		}, {
			name : "Server",
			value : "eBay Server"
		}, {
			name : "Transfer-Encoding",
			value : "chunked"
		}, {
			name : "Content-Type",
			value : "application/json;charset=utf-8"
		}, {
			name : "Set-Cookie",
			value : "ds2=i;Domain=.ebay.com;Path=/"
		}, {
			name : "Set-Cookie",
			value : "ebay=h;Domain=.ebay.com;Path=/"
		}
	],
	cookies : [
		{
			name : "ds2",
			value : "i",
			path : "/",
			domain : ".ebay.com",
			expires : null,
			httpOnly : false,
			secure : false
		}
	],
	content : {
		size : 279,
		mimeType : "application/json",
		compression : 49
	},
	redirectURL : "",
	headersSize : 1072,
	bodySize : 230
};

Request.prototype.cache = {};

Request.prototype.timings = {
	blocked : 1.984999998967396,
	dns : 17.373000000588945,
	connect : 87.84299999933864,
	send : 0.5780000010418007,
	wait : 105.32099999909406,
	receive : 2.093986893669353,
	ssl : -1
};

Request.prototype.connection = "28890";

Request.prototype.pageref = "page_1";
