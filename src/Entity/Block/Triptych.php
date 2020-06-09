<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Entity\Block;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Umanit\BlockBundle\Entity\Block;

/**
 * @ORM\Entity()
 * @ORM\Table(name="umanit_block_collection_triptych")
 */
class Triptych extends Block
{
    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\NotBlank()
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     */
    private $text;

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    private $imagePath;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $imageAlt;

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): void
    {
        $this->title = $title;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(?string $text): void
    {
        $this->text = $text;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(?string $imagePath): void
    {
        $this->imagePath = $imagePath;
    }

    public function getImageAlt(): ?string
    {
        return $this->imageAlt;
    }

    public function setImageAlt(?string $imageAlt): void
    {
        $this->imageAlt = $imageAlt;
    }

    public function __toString()
    {
        return $this->getTitle() ? mb_substr(strip_tags($this->getTitle()), 0, 75) : 'New triptych';
    }
}
