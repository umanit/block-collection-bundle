<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\BlockManager;

use Umanit\BlockBundle\Block\AbstractBlockManager;
use Umanit\BlockCollectionBundle\Entity\Block\Image;
use Umanit\BlockCollectionBundle\Form\Type\Block\ImageType;

class ImageBlockManager extends AbstractBlockManager
{
    use TwigRenderableTrait;

    /** @var string */
    protected $template = 'image';

    public function getManagedBlockType(): string
    {
        return Image::class;
    }

    public function getManagedFormType(): string
    {
        return ImageType::class;
    }
}
