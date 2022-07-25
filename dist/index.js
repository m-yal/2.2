"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cross_fetch_1 = __importDefault(require("cross-fetch")); //used https://openbase.com/js/cross-fetch  instead
const url = "https://api.ipify.org/?format=json";
async function getIP(url) {
    const res = await (0, cross_fetch_1.default)(url);
    const data = await res.text();
    console.log(data);
    return data;
}
const ip = getIP(url);
