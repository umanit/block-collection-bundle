<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Form\Type\Block;

use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;
use Umanit\BlockBundle\Form\AbstractBlockType;

final class VideoType extends AbstractBlockType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add('url', UrlType::class, [
            'default_protocol' => 'https',
            'constraints'      => [new NotBlank()],
        ]);
    }
}
