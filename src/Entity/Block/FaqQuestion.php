<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Entity\Block;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 * @ORM\Table(name="umanit_block_collection_faq_question")
 */
class FaqQuestion
{
    /**
     * @var int|null
     *
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var Faq
     *
     * @ORM\ManyToOne(targetEntity="Umanit\BlockCollectionBundle\Entity\Block\Faq", inversedBy="questions")
     * @ORM\JoinColumn(name="faq_id", referencedColumnName="id", nullable=false)
     */
    protected $faq;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     */
    protected $question;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     */
    private $answer;

    /**
     * @var string
     * @ORM\Column(type="string", nullable=true)
     */
    private $filePath;

    /**
     * @var string
     * @ORM\Column(type="string", nullable=true)
     */
    private $fileButtonPath;

    /**
     * @var string
     * @ORM\Column(type="string", nullable=true)
     */
    private $imagePath;

    /**
     * @var string
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $imageAlt;

    /**
     * @var int
     *
     * @ORM\Column(name="position", type="integer")
     */
    protected $position;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFaq(): ?Faq
    {
        return $this->faq;
    }

    public function setFaq(?Faq $faq): void
    {
        $this->faq = $faq;
    }

    public function getQuestion(): ?string
    {
        return $this->question;
    }

    public function setQuestion(?string $question): void
    {
        $this->question = $question;
    }

    public function getAnswer(): ?string
    {
        return $this->answer;
    }

    public function setAnswer(?string $answer): void
    {
        $this->answer = $answer;
    }

    public function getPosition(): ?int
    {
        return $this->position;
    }

    public function setPosition(?int $position): void
    {
        $this->position = $position;
    }

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(?string $filePath): self
    {
        $this->filePath = $filePath;

        return $this;
    }

    public function getFileButtonPath(): ?string
    {
        return $this->fileButtonPath;
    }

    public function setFileButtonPath(?string $fileButtonPath): self
    {
        $this->fileButtonPath = $fileButtonPath;

        return $this;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(?string $imagePath): self
    {
        $this->imagePath = $imagePath;

        return $this;
    }

    public function getImageAlt(): ?string
    {
        return $this->imageAlt;
    }

    public function setImageAlt(?string $imageAlt): self
    {
        $this->imageAlt = $imageAlt;

        return $this;
    }
}
