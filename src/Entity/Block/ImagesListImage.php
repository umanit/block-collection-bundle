<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Entity\Block;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table(name="umanit_block_collection_images_list_image")
 */
class ImagesListImage extends Image
{
    /**
     * @var ImagesList
     *
     * @ORM\ManyToOne(targetEntity="Umanit\BlockCollectionBundle\Entity\Block\ImagesList", inversedBy="images")
     * @ORM\JoinColumn(name="faq_id", referencedColumnName="id", nullable=false)
     */
    protected $list;

    public function getList(): ?ImagesList
    {
        return $this->list;
    }

    public function setList(?ImagesList $list): void
    {
        $this->list = $list;
    }
}
