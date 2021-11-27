const { extendDefaultPlugins } = require('svgo')
module.exports = {
    plugins: extendDefaultPlugins([
        { 
            name: 'removeAttrs',
            params: { 
                attrs: '(stroke|fill)'
            }
        },
    ])
}
