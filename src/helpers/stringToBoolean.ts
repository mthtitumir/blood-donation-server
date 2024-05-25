export function stringToBoolean(string: string) {
    if (string.toLowerCase() === "true") {
        return true;
    } else if (string.toLowerCase() === "false") {
        return false;
    }
    throw new Error("Invalid input: not a boolean string");
}