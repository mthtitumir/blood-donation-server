"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToBoolean = void 0;
function stringToBoolean(string) {
    if (string.toLowerCase() === "true") {
        return true;
    }
    else if (string.toLowerCase() === "false") {
        return false;
    }
    throw new Error("Invalid input: not a boolean string");
}
exports.stringToBoolean = stringToBoolean;
