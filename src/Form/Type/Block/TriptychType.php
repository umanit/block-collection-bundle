<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Form\Type\Block;

use Artgris\Bundle\MediaBundle\Form\Type\MediaType;
use FOS\CKEditorBundle\Form\Type\CKEditorType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Umanit\BlockBundle\Form\AbstractBlockType;

class TriptychType extends AbstractBlockType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class)
            ->add('text', CKEditorType::class)
            ->add('imagePath', MediaType::class, [
                'required' => false,
                'conf'     => 'default',
            ])
            ->add('imageAlt', TextType::class, [
                'required' => false,
            ])
            ->add('imagePosition', CheckboxType::class, [
                'required' => false,
            ])
        ;
    }
}
