<?php

namespace Umanit\BlockCollectionBundle\BlockManager;

use Umanit\BlockBundle\Block\AbstractBlockManager;
use Umanit\BlockCollectionBundle\Entity\Block\Wysiwyg;
use Umanit\BlockCollectionBundle\Form\Type\Block\WysiwygType;

class WysiwygBlockManager extends AbstractBlockManager
{
    use TwigRenderableTrait;

    /** @var string */
    private $template = 'wysiwyg';

    public function getManagedBlockType(): string
    {
        return Wysiwyg::class;
    }

    public function getManagedFormType(): string
    {
        return WysiwygType::class;
    }
}
