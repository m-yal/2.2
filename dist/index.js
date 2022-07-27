"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cross_fetch_1 = __importDefault(require("cross-fetch")); //used https://openbase.com/js/cross-fetch  instead "node-fetch"
//1
let url = "https://api.ipify.org/?format=json";
async function printMyIp(url) {
    const res = await (0, cross_fetch_1.default)(url);
    const json = await res.json();
    const ip = json["ip"];
    console.log(ip);
}
// printMyIp(url);
//2
async function getMyIp(url) {
    const res = await (0, cross_fetch_1.default)(url);
    const json = await res.json();
    const ip = json.ip;
    console.log(ip);
    return ip;
}
// getMyIp(url);
url = "https://random-data-api.com/api/name/random_name";
//3.1
async function get3Names1(url) {
    const name1 = (0, cross_fetch_1.default)(url).then(res => res.json()).then(json => json.name);
    const name2 = (0, cross_fetch_1.default)(url).then(res => res.json()).then(json => json.name);
    const name3 = (0, cross_fetch_1.default)(url).then(res => res.json()).then(json => json.name);
    const names = await Promise.all([name1, name2, name3]);
    console.log(names);
    return names;
}
get3Names1(url);
//3.2
async function get3Names2(url) {
    var e_1, _a;
    const responses = [];
    for (let i = 0; i < 3; i++) {
        responses[i] = (0, cross_fetch_1.default)(url);
    }
    const names = [];
    try {
        for (var responses_1 = __asyncValues(responses), responses_1_1; responses_1_1 = await responses_1.next(), !responses_1_1.done;) {
            const res = responses_1_1.value;
            const name = await res.json().then((json) => json.name);
            names.push(name);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (responses_1_1 && !responses_1_1.done && (_a = responses_1.return)) await _a.call(responses_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    console.log(names);
    return names;
}
get3Names2(url);
//3.3
async function get3Names3(url) {
}
// get3Names1(url);
