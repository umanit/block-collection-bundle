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
        $classes = $view->vars['attr']['class'] ?? '';
        $view->vars['attr']['class'] = trim($classes.' js-ckeditor');
    }

    public static function getExtendedTypes(): iterable
    {
        return [CKEditorType::class];
    }
}
