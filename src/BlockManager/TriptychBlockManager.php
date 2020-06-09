<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\BlockManager;

use Umanit\BlockBundle\Block\AbstractBlockManager;
use Umanit\BlockCollectionBundle\Entity\Block\Triptych;
use Umanit\BlockCollectionBundle\Form\Type\Block\TriptychType;

class TriptychBlockManager extends AbstractBlockManager
{
    use TwigRenderableTrait;

    /** @var string */
    protected $template = 'triptych';

    public function getManagedBlockType(): string
    {
        return Triptych::class;
    }

    public function getManagedFormType(): string
    {
        return TriptychType::class;
    }
}
