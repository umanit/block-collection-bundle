<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Form\Type\Block;

use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Umanit\BlockBundle\Form\AbstractBlockType;
use Umanit\BlockCollectionBundle\Entity\Block\FaqQuestion;

final class FaqType extends AbstractBlockType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add('questions', CollectionType::class, [
            'entry_type'   => FaqQuestionType::class,
            'allow_add'    => true,
            'allow_delete' => true,
        ]);
    }

    public function finishView(FormView $view, FormInterface $form, array $options): void
    {
        usort($view['questions']->children, static function (FormView $a, FormView $b) {
            /** @var FaqQuestion $objectA */
            $objectA = $a->vars['data'];

            /** @var FaqQuestion $objectB */
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
