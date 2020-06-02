<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\BlockManager;

use Umanit\BlockBundle\Block\AbstractBlockManager;
use Umanit\BlockCollectionBundle\Entity\Block\Video;
use Umanit\BlockCollectionBundle\Form\Type\Block\VideoType;

class VideoBlockManager extends AbstractBlockManager
{
    use TwigRenderableTrait;

    /** @var string */
    protected $template = 'video';

    public function getManagedBlockType(): string
    {
        return Video::class;
    }

    public function getManagedFormType(): string
    {
        return VideoType::class;
    }
}
