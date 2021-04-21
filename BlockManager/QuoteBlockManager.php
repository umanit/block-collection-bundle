<?php

namespace Umanit\BlockCollectionBundle\BlockManager;

use Umanit\BlockBundle\Block\AbstractBlockManager;
use Umanit\BlockCollectionBundle\Entity\Block\Quote;
use Umanit\BlockCollectionBundle\Form\Type\Block\QuoteType;

class QuoteBlockManager extends AbstractBlockManager
{
    use TwigRenderableTrait;

    /** @var string */
    private $template = 'quote';

    public function getManagedBlockType(): string
    {
        return Quote::class;
    }

    public function getManagedFormType(): string
    {
        return QuoteType::class;
    }
}
