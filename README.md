# Umanit Block Collection Bundle

A collection of blocks ready to use with [umanit/block-bundle](https://github.com/umanit/block-bundle).

## Prerequisites

1. Install and configure [FOSCKEditorBundle](https://symfony.com/doc/current/bundles/FOSCKEditorBundle/installation.html)
1. Install and configure [ArtgrisMediaBundle](https://github.com/artgris/MediaBundle)
    * The assets' installation is not necessary because they're all rewrite in this bundle, you only need to declare
    the bundle and his routing.
1. Install and configure [UmanitBlockBundle](https://github.com/umanit/block-bundle)

## Front requirements

* Use [Symfony UX](https://symfony.com/ux)

## Front requirements

* Use [Symfony UX](https://symfony.com/ux)

## Install

Register the bundle to your `config/bundles.php`

```php
<?php

return [
    // ...
    Umanit\BlockCollectionBundle\UmanitBlockCollectionBundle::class => ['all' => true],
];
```

Add one of the Twig's form theme

```yaml
# config/packages/twig.yaml
twig:
    form_themes:
        # When using Sylius, the only available for the moment
        - '@UmanitBlockCollection/sylius/artgris/field_media.html.twig'
```

Add `@umanit/block-collection-bundle` dev-dependency in your `package.json`

```json
{
  //...
  "devDependencies": {
    // ...
    "@umanit/block-collection-bundle": "file:vendor/umanit/block-collection-bundle/Resources/assets"
  }
}
```

Add stimulus controllers to your `assets/controllers.json`

```json
{
  "controllers": {
    // ...
    "@umanit/block-collection-bundle": {
      "collection": {
        "enabled": true,
        "fetch": "lazy"
      },
      "ckeditor": {
        "enabled": true,
        "fetch": "lazy"
      },
      "crop": {
        "enabled": true,
        "fetch": "lazy"
      },
      "media": {
        "enabled": true,
        "fetch": "lazy"
      },
      "modal": {
        "enabled": true,
        "fetch": "lazy"
      }
    }
  }
  // ...
}
```

Don't forget to install the JavaScript dependencies as well and compile

```
yarn install --force
yarn encore dev
```

## Available blocks

### FAQ

A collection of question/answer.

The answer field uses the `CKEditorType` from
[FOSCKEditorBundle](https://symfony.com/doc/current/bundles/FOSCKEditorBundle/installation.html).

### Image

An image with an `alt` field. The form type uses the `MediaType` from
[ArtgrisMediaBundle](https://github.com/artgris/MediaBundle).

### Images collection

A collection of images (without `alt` field, for the moment?). The form type uses the `MediaCollectionType` from
[ArtgrisMediaBundle](https://github.com/artgris/MediaBundle).

### Link

A simple URLs and it's associated label.

### Quote

A blockquote and an optional author.

### Triptych

A block composed of a title, a wysiwyg text, and an image with an `alt` field.

The text form type uses the `CKEditorType` from
[FOSCKEditorBundle](https://symfony.com/doc/current/bundles/FOSCKEditorBundle/installation.html).

The image form type uses the `MediaType` from
[ArtgrisMediaBundle](https://github.com/artgris/MediaBundle).

### Video

A link to YouTube or Vimeo to render a player in an iframe.

### WYSIWYG

A WYSIWYG which uses the `CKEditorType` from
[FOSCKEditorBundle](https://symfony.com/doc/current/bundles/FOSCKEditorBundle/installation.html).

## Customize blocks

### FormType

You can use [Symfony Form Type Extension](https://symfony.com/doc/current/form/create_form_type_extension.html) to
modify any of available form type.

### Rendering

You can override any of the Twig template to customize the rendering of each block. The default path will be
`templates/bundles/UmanitBlockCollectionBundle/blocks/`.

## Utils - `TwigRenderableTrait`

If you need to create your own blocks, you can use the `Umanit\BlockCollectionBundle\BlockManager\TwigRenderableTrait`
in your block manager.

It will allow you to use a Twig view to render your block. All you need to do is to define the property
`protected $template` in your manager which should be the name of a view placed in
`templates/bundles/UmanitBlockCollectionBundle/blocks/` (without the suffix `.html.twig`).

For example, using this manager:

```php
<?php

declare(strict_types=1);

namespace App\BlockManager;

use App\Entity\Block\Simple;
use App\Form\Type\Block\SimpleType;
use Umanit\BlockBundle\Block\AbstractBlockManager;

class SimpleBlockManager extends AbstractBlockManager
{
    use TwigRenderableTrait;

    /** @var string */
    protected $template = 'simple';

    public function getManagedBlockType(): string
    {
        return Simple::class;
    }

    public function getManagedFormType(): string
    {
        return SimpleType::class;
    }
}
```

Once the entity and the form type are created, we only need to create the view
`templates/bundles/UmanitBlockCollectionBundle/blocks/simple.html.twig`.
