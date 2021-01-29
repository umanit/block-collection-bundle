<?php

namespace Umanit\BlockCollectionBundle\Entity\Block;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Umanit\BlockBundle\Entity\Block;

/**
 * @ORM\Entity()
 * @ORM\Table(name="umanit_block_collection_quote")
 */
class Quote extends Block
{
    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     */
    protected $quote;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $author;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    protected $imagePath;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $imageAlt;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $role;

    public function getQuote(): ?string
    {
        return $this->quote;
    }

    public function setQuote(string $quote): void
    {
        $this->quote = $quote;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(?string $author): void
    {
        $this->author = $author;
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

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(?string $role): void
    {
        $this->role = $role;
    }

    public function __toString()
    {
        return $this->getQuote() ? mb_substr(strip_tags($this->getQuote()), 0, 75) : 'New quote';
    }
}
