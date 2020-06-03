# Umanit Block Collection Bundle

## 🚧 WIP bundle

A collection of blocks ready to use with [umanit/block-bundle](https://github.com/umanit/block-bundle).

## Install

Register the bundle to your `config/bundles.php`

```php
<?php

return [
    // ...
    Umanit\BlockCollectionBundle\UmanitBlockCollectionBundle::class => ['all' => true],
];
```

## Available blocks

### FAQ

A collection of question/answer.

The answer field uses the `CKEditorType` from
[FOSCKEditorBundle](https://symfony.com/doc/current/bundles/FOSCKEditorBundle/installation.html).


### Link

A simple URLs and it's associated label.

### Quote

A blockquote and an optional author.

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
