const Encore = require('@symfony/webpack-encore');

Encore
  .setOutputPath('./src/Resources/public/')
  .setPublicPath('./')
  .setManifestKeyPrefix('bundles/umanitblockcollection')

  .cleanupOutputBeforeBuild()
  .enableSassLoader()
  .enableSourceMaps(false)
  .enableVersioning(false)
  .disableSingleRuntimeChunk()
  .configureBabel(() => {
  }, {
    useBuiltIns: 'usage',
    corejs: 3,
  })

  .autoProvidejQuery()
  .addAliases({
    'jquery-ui/ui/widget': 'blueimp-file-upload/js/vendor/jquery.ui.widget.js',
  })
  .addEntry('sylius/blocks-initialisator', './assets/sylius/js/blocks-initialisator.js')
;

module.exports = Encore.getWebpackConfig();
