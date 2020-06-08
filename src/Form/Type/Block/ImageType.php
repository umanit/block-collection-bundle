<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Form\Type\Block;

use Artgris\Bundle\MediaBundle\Form\Type\MediaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;
use Umanit\BlockBundle\Form\AbstractBlockType;

final class ImageType extends AbstractBlockType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add('path', MediaType::class, [
            'conf'        => 'default',
            'readonly'    => true,
            'constraints' => [new NotBlank()],
        ]);
    }
}
