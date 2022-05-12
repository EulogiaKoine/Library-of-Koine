/**
 * @param {String} code should be evaluated
 * @return {Object} {result: final result, time: executing time, error: error, line: line number of the error}
 */
importClass(java.lang.System);
const nanoTime = System.nanoTime;

function evaluate(code){
    let result, info;

    try {
        result = eval(
            "var start = nanoTime();\n"
            + code
        );
        start = (nanoTime() - start) / 1000000000;
        info = {
            isError: false,
            result: result,
            time: start
        };
    } catch(e) {
        info = {
            isError: true,
            name: e.name,
            msg: e.message,
            line: e.lineNumber - 1
        };
    }

    Object.defineProperty(info, 'toString', {
        value: (function(){
            return this.isError
                ? "☢ " + this.name + " \xb7\xb7\xb7 " + this.line + "\n " + this.msg
                : "⏱˚ " + start + " sec.\n" + result
        }).bind(info)
    });
    
    return info;
}