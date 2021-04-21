<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\BlockManager;

use Umanit\BlockBundle\Block\AbstractBlockManager;
use Umanit\BlockCollectionBundle\Entity\Block\Link;
use Umanit\BlockCollectionBundle\Form\Type\Block\LinkType;

class LinkBlockManager extends AbstractBlockManager
{
    use TwigRenderableTrait;

    /** @var string */
    protected $template = 'link';

    public function getManagedBlockType(): string
    {
        return Link::class;
    }

    public function getManagedFormType(): string
    {
        return LinkType::class;
    }
}
