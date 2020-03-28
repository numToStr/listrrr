import { debuglog } from "util";

class Debug {
    private debugWWW = debuglog("www");

    www(message: string) {
        this.debugWWW(message);
    }
}

export const DebugUtil = new Debug();
