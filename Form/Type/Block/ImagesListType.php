<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Form\Type\Block;

use Artgris\Bundle\MediaBundle\Form\Type\MediaCollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Umanit\BlockBundle\Form\AbstractBlockType;

final class ImagesListType extends AbstractBlockType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add('images', MediaCollectionType::class, [
            'allow_add'    => true,
            'allow_delete' => true,
            'conf'         => 'default',
        ]);
    }
}
