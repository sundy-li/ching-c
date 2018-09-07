
module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.resolve.alias['core/http'] = "{{ http }}"

  defaultConfig.module.rules.push({
    test: /\.less$/,
    exclude: /node_modules/,
    loaders: ["style-loader", "css-loader", "less-loader"],
  })

  defaultConfig.module.rules.push({
    test: /\.s[ac]ss$/,
    exclude: /node_modules/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
  })

  defaultConfig.resolve.extensions.push(".jsx");

  defaultConfig.externals = defaultConfig.externals || {};
  defaultConfig.externals = {
    ...defaultConfig.externals,
    'echarts': 'echarts',
    'antd': 'antd',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-addons-css-transition-group': 'React.addons.CSSTransitionGroup',
    'react-addons-shallow-compare': 'React.addons.shallowCompare',
    'react-addons-transition-group': 'React.addons.TransitionGroup',
  }

  return defaultConfig;
};
