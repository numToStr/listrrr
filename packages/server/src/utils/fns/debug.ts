import { debuglog } from "util";

class Debug {
    private debugWWW = debuglog("www");

    www(message: string) {
        this.debugWWW(message);
    }
}

export default new Debug();
