<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Twig;

use Twig\Extension\RuntimeExtensionInterface;
use Umanit\BlockCollectionBundle\VideoDetector\VideoDetectorInterface;

class BlockCollectionRuntime implements RuntimeExtensionInterface
{
    /** @var VideoDetectorInterface[] */
    private $videoDetectors;

    public function __construct(iterable $videoDetectors)
    {
        $this->videoDetectors = $videoDetectors;
    }

    public function embeddableVideoType(string $value): string
    {
        foreach ($this->videoDetectors as $detector) {
            try {
                $detector->getVideoId($value);

                return $detector->getType();
            } catch (\Throwable $e) {
                // Nothing to do, let's try another detector
            }
        }

        throw new \LogicException('Unknown video type.');
    }

    public function embeddableVideoId(string $value): string
    {
        foreach ($this->videoDetectors as $detector) {
            try {
                return $detector->getVideoId($value);
            } catch (\Throwable $e) {
                // Nothing to do, let's try another detector
            }
        }

        throw new \LogicException('Unknown video ID.');
    }
}
