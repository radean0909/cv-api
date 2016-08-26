const path = require('path');
const nodeExternals = require('webpack-node-externals');

const PATHS = {
    app: path.resolve(__dirname, 'src'),
    build: path.resolve(__dirname, 'lib')
};

module.exports = {
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        app: PATHS.app + '/server.js'
    },
	  output: {
		    path: PATHS.build,
		    filename: 'bundle.js'
	  },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: PATHS.app,
                loader: 'babel'
            }
        ]
    }
};
