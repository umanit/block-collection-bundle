<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Entity\Block;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Umanit\BlockBundle\Entity\Block;

/**
 * @ORM\Entity()
 * @ORM\Table(name="umanit_block_collection_faq")
 */
class Faq extends Block
{
    /**
     * @var ArrayCollection|null
     *
     * @ORM\OneToMany(targetEntity="Umanit\BlockCollectionBundle\Entity\Block\FaqQuestion", mappedBy="faq",
     *                fetch="EXTRA_LAZY", orphanRemoval=true, cascade={"persist"})
     * @ORM\OrderBy({"position"="ASC"})
     */
    protected $questions;

    public function __construct()
    {
        $this->questions = new ArrayCollection();
    }

    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(FaqQuestion $question): void
    {
        if (!$this->questions->contains($question)) {
            $this->questions[] = $question;
            $question->setFaq($this);
        }
    }

    public function removeQuestion(FaqQuestion $question): void
    {
        if ($this->questions->contains($question)) {
            $this->questions->removeElement($question);

            if ($question->getFaq() === $this) {
                $question->setFaq(null);
            }
        }
    }

    public function __toString()
    {
        return $this->getId() ? 'FAQ #'.$this->getId() : 'New FAQ';
    }
}
