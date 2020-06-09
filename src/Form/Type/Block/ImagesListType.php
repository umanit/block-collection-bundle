<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Form\Type\Block;

use Artgris\Bundle\MediaBundle\Form\Type\MediaCollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Umanit\BlockBundle\Form\AbstractBlockType;
use Umanit\BlockCollectionBundle\Entity\Block\ImagesListImage;

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

    public function finishView(FormView $view, FormInterface $form, array $options): void
    {
        usort($view['images']->children, static function (FormView $a, FormView $b) {
            /** @var ImagesListImage $objectA */
            $objectA = $a->vars['data'];

            /** @var ImagesListImage $objectB */
            $objectB = $b->vars['data'];

            $posA = $objectA->getPosition();
            $posB = $objectB->getPosition();

            if ($posA === $posB) {
                return 0;
            }

            return $posA < $posB ? -1 : 1;
        });
    }
}
