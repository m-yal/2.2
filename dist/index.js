"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cross_fetch_1 = __importDefault(require("cross-fetch")); //used https://openbase.com/js/cross-fetch  instead
async function getMyIp(url) {
    try {
        await (0, cross_fetch_1.default)(url)
            .then(data => {
            return data.text();
        })
            .then(result => {
            console.log(result);
        });
    }
    catch (error) {
        console.error(error);
    }
}
const url = "https://api.ipify.org/?format=json";
getMyIp(url);
