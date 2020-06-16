<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Entity\Block;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Umanit\BlockBundle\Entity\Block;
use Umanit\BlockCollectionBundle\Validator\Constraints as UmanitAssert;

/**
 * @ORM\Entity()
 * @ORM\Table(name="umanit_block_collection_video")
 */
class Video extends Block
{
    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     * @UmanitAssert\EmbeddableVideo()
     */
    private $url;

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): void
    {
        $this->url = $url;
    }

    public function __toString()
    {
        return $this->getId() ? 'Video #'.$this->getId() : 'New video';
    }
}
