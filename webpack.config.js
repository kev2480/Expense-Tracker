module.exports = {
    entry: './js/main.js',
    output: {
        filename: './js/bundle.js'
    },
    module: {
      preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'jshint'
            }
          ],
       loaders: [
           {
               test: /\.js$/,
               exclude: /node_modules/,
               loader: 'babel',
               query: {
                   presets: ['es2015']
               }
           },
           {
              test: /\.scss$/,
              exclude: /node_modules/,
              loader: 'style!css!sass'
           },
           {
              test: /\.(jpg|png|gif)$/,
              include: /images/,
              loader: 'url'
          },
          {
            test: /\.handlebars$/,
            include: /js/,
            loader: "handlebars-loader"
          }
       ],
   },
   jshint: {
     esversion: 6
   }
};
