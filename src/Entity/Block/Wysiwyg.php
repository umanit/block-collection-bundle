<?php

namespace Umanit\BlockCollectionBundle\Entity\Block;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Umanit\BlockBundle\Entity\Block;

/**
 * @ORM\Entity()
 * @ORM\Table(name="umanit_block_collection_wysiwyg")
 */
class Wysiwyg extends Block
{
    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     */
    private $text;

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): void
    {
        $this->text = $text;
    }

    public function __toString()
    {
        return mb_substr(strip_tags($this->getText() ?? 'WYSIWYG'), 0, 100);
    }
}
