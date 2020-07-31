<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Form\Type\Block;

use Artgris\Bundle\MediaBundle\Form\Type\MediaType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Umanit\BlockBundle\Form\AbstractBlockType;

final class QuoteType extends AbstractBlockType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('quote', TextareaType::class)
            ->add('author', TextType::class, [
                'required' => false,
            ])
            ->add('image', MediaType::class, [
                'conf'     => 'default',
                'readonly' => true,
                'required' => false,
            ])
            ->add('alt', TextType::class, [
                'required' => false,
            ])
            ->add('role', TextType::class, [
                'required' => false,
            ])
        ;
    }
}
