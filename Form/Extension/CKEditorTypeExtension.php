<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Form\Extension;

use FOS\CKEditorBundle\Form\Type\CKEditorType;
use Symfony\Component\Form\AbstractTypeExtension;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;

class CKEditorTypeExtension extends AbstractTypeExtension
{
    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        $view->vars['attr']['data-controller'] = 'umanit--ux-block-collection-bundle--ckeditor';
        $view->vars['attr']['data-action'] = 'umanit--ux-block-bundle--sortable:start@window->umanit--ux-block-collection-bundle--ckeditor#destroy umanit--ux-block-bundle--sortable:end@window->umanit--ux-block-collection-bundle--ckeditor#restore';
    }

    public static function getExtendedTypes(): iterable
    {
        return [CKEditorType::class];
    }
}
