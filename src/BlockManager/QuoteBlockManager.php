<?php

namespace Umanit\BlockCollectionBundle\BlockManager;

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Umanit\BlockBundle\Block\AbstractBlockManager;
use Umanit\BlockBundle\Model\BlockInterface;
use Umanit\BlockCollectionBundle\Entity\Block\Quote;
use Umanit\BlockCollectionBundle\Form\Type\Block\QuoteType;

class QuoteBlockManager extends AbstractBlockManager
{
    /** @var Environment */
    private $twig;

    public function __construct(Environment $twig)
    {
        $this->twig = $twig;
    }

    public function getManagedBlockType(): string
    {
        return Quote::class;
    }

    public function getManagedFormType(): string
    {
        return QuoteType::class;
    }

    /**
     * {@inheritDoc}
     *
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function render(BlockInterface $block, array $parameters = []): string
    {
        return $this->twig->render('@UmanitBlockCollection/blocks/quote.html.twig', ['block' => $block]);
    }
}
