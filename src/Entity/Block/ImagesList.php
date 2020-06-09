<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Entity\Block;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Umanit\BlockBundle\Entity\Block;

/**
 * @ORM\Entity()
 * @ORM\Table(name="umanit_block_collection_images_list")
 */
class ImagesList extends Block
{
    /**
     * @var ArrayCollection|null
     *
     * @ORM\OneToMany(targetEntity="Umanit\BlockCollectionBundle\Entity\Block\ImagesListImage", mappedBy="list",
     *                fetch="EXTRA_LAZY", orphanRemoval=true, cascade={"persist"})
     * @ORM\OrderBy({"position"="ASC"})
     */
    protected $images;

    public function __construct()
    {
        $this->images = new ArrayCollection();
    }

    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(ImagesListImage $image): void
    {
        if (!$this->images->contains($image)) {
            $this->images[] = $image;
            $image->setList($this);
        }
    }

    public function removeImage(ImagesListImage $image): void
    {
        if ($this->images->contains($image)) {
            $this->images->removeElement($image);

            if ($image->getList() === $this) {
                $image->setList(null);
            }
        }
    }

    public function __toString()
    {
        return $this->getId() ? 'Images collection #'.$this->getId() : 'New images collection';
    }
}
