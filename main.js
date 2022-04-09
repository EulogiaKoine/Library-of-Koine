//---------- Proprocessing Layer ----------
Device.acquireWakeLock(android.os.PowerManager.PARTIAL_WAKE_LOCK, '');

importClass(
    java.lang.System,
    java.lang.Thread,
    java.util.concurrent.LinkedBlockingQueue,
    java.nio.file.Paths,
    java.nio.file.Files
);

const BOT_NAME = "Library_of_Koine";
const SD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
const PATH = SD + '/' + BOT_NAME;
const Path = require(PATH + '/prep/PathManager.js')(PATH);

const File = Path.require('prep/File'), Directory = Path.require('prep/Directory');
const setTimeout2 = Path.require('prep/setTimeout2'), clearTime = setTimeout2.clearTime;
[setTimeout, setInterval, clearTimeout, clearInterval] = [setTimeout2.setTimeout, setTimeout2.setInterval, (id => clearTime(id)).bind(undefined), (id => clearTime(id)).bind(undefined)];

const config = {};
config.load = (function(){
    const file = Path.readJson('prep/config');
    if(file === null) throw new Error('check config.json');
    Object.assign(
        this,
        file,
        {path: PATH}
    );
}).bind(config);
config.save = (function(){
    Path.writeJson('prep/config', this, 4);
}).bind(config)
config.load();
//---------- Preprocessing Layer ----------


//---------- Database Layer --------
const Meta = new Directory(Path.get('meta'));
const DB = new Directory(Path.get('db'));
//---------- Database Layer --------


//---------- Application Layer --------
//---------- Application Layer --------


//---------- UI Layer --------
//---------- UI Layer --------


//---------- dummy ----------
const nanoTime = System.nanoTime, max = Math.max;
var start, result;
function response(room, msg, sender, isGroupChat, replier, imageDB){
    if(isGroupChat && room.indexOf('★') === -1) return;
    if(msg.startsWith('e') && config.admin.hash.indexOf(imageDB.getProfileHash()) !== -1){
        const rp = replier.reply.bind(replier);
        msg = msg.slice(1).trim();
        try {
            start = nanoTime();
            result = eval(msg);
            rp("\u23f1\u02da " + max((nanoTime() - start - 230000) / 1000000000, 0) + " sec.\n" + result);
        }
        catch (e) {
            rp("\u2622 " + e.name + " \xb7\xb7\xb7 " + e.lineNumber + "\n " + e.message);
        }
        return;
    }
}