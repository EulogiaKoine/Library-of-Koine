content = """
const Script = 
"""


with open('./Development_Tools/output_module.js', 'w') as module:
    module.write(f"""
'use strict';
module.exports = (function(){{

{content.strip()}
}})();
""".strip())