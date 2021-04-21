<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Form\Type\Block;

use Artgris\Bundle\MediaBundle\Form\Type\MediaType;
use FOS\CKEditorBundle\Form\Type\CKEditorType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Umanit\BlockCollectionBundle\Entity\Block\FaqQuestion;

final class FaqQuestionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('question', TextType::class)
            ->add('answer', CKEditorType::class)
            ->add('filePath', MediaType::class, [
                'conf'     => 'default',
                'required' => false,
            ])
            ->add('fileButtonPath', TextType::class, [
                'required' => false,
            ])
            ->add('imagePath', MediaType::class, [
                'conf' => 'default',
            ])
            ->add('imageAlt', TextType::class, [
                'required' => false,
            ])
            ->add('position', HiddenType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => FaqQuestion::class,
        ]);
    }
}
