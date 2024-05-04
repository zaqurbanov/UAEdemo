import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  mode: 'development',
  entry: ['@babel/polyfill',"./src/index.js"],
  output: {
    path: path.resolve(__dirname, 'bundles'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/src/images/',
          outputPath: (url, resourcePath, context) => {
            
            const folderName = path.basename(path.dirname(resourcePath));
            
            return `images/${folderName}/${url}`;
          }, 
        }
      }
    ]
  },
  devServer: {
    port: 3200,
    // static: {
    //   directory: path.join(__dirname, /*'public'*/),
    // }
    static:{ 
      directory: path.join(__dirname, /*'public'*/)
    }
  }
};

export default config;
