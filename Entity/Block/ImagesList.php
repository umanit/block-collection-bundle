<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Entity\Block;

use Doctrine\ORM\Mapping as ORM;
use Umanit\BlockBundle\Entity\Block;

/**
 * @ORM\Entity()
 * @ORM\Table(name="umanit_block_collection_images_list")
 */
class ImagesList extends Block
{
    /**
     * @var array|null
     *
     * @ORM\Column(type="simple_array", nullable=true)
     */
    protected $images;

    public function getImages(): ?array
    {
        return $this->images;
    }

    public function setImages(?array $images): void
    {
        $this->images = $images;
    }

    public function __toString()
    {
        return $this->getId() ? 'Images collection #'.$this->getId() : 'New images collection';
    }
}
