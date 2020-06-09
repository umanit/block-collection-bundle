<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\BlockManager;

use Umanit\BlockBundle\Block\AbstractBlockManager;
use Umanit\BlockCollectionBundle\Entity\Block\ImagesList;
use Umanit\BlockCollectionBundle\Form\Type\Block\ImagesListType;

class ImagesListBlockManager extends AbstractBlockManager
{
    use TwigRenderableTrait;

    /** @var string */
    protected $template = 'images_list';

    public function getManagedBlockType(): string
    {
        return ImagesList::class;
    }

    public function getManagedFormType(): string
    {
        return ImagesListType::class;
    }
}
