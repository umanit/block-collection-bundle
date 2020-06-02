<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\BlockManager;

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Umanit\BlockBundle\Model\BlockInterface;

trait TwigRenderableTrait
{
    /** @var Environment */
    private $twig;

    public function __construct(Environment $twig)
    {
        if (!isset($this->template)) {
            throw new \LogicException(
                sprintf('You should define the template used to render %s', __CLASS__)
            );
        }

        $this->twig = $twig;
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
        return $this->twig->render(
            sprintf('@UmanitBlockCollection/blocks/%s.html.twig', $this->template),
            ['block' => $block, 'parameters' => $parameters]
        );
    }
}
