<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\BlockManager;

use Umanit\BlockBundle\Block\AbstractBlockManager;
use Umanit\BlockCollectionBundle\Entity\Block\Faq;
use Umanit\BlockCollectionBundle\Form\Type\Block\FaqType;

class FaqBlockManager extends AbstractBlockManager
{
    use TwigRenderableTrait;

    /** @var string */
    private $template = 'faq';

    public function getManagedBlockType(): string
    {
        return Faq::class;
    }

    public function getManagedFormType(): string
    {
        return FaqType::class;
    }
}
