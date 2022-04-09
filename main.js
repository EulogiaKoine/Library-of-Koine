//---------- Proprocessing Layer ----------
Device.aquireWakeLock(android.os.PowerManager.PARTIAL_WAKE_LOCK, '');

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
const Path = require(PATH + '/prep/PathManager.js');

const File = Path.require('prep/File'), Directory = Path.require('prep/Directory');
const setTimeout2 = Path.require('prep/setTimeout2'), clearTime = setTimeout2.clearTime;
[setTimeout, setInterval, clearTimeout, clearInterval] = [setTimeout2.setTimeout, setTimeout2.setInterval, (id => clearTime(id)).bind(undefined), (id => clearTime(id)).bind(undefined)];

const config = {
    load: (function(){
        Object.assign(
            this,
            Path.readJson('prep/config'),
            {path: PATH}
        );
    }).bind(config),

    save: (function(){
        Path.writeJson('prep/config', this, 4);
    }).bind(config)
};
config.load();
//---------- Preprocessing Layer ----------


//---------- Database Layer --------
const Meta = new Directory(Path.get('db'));