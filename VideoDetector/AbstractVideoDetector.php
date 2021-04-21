<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\VideoDetector;

abstract class AbstractVideoDetector implements VideoDetectorInterface
{
    public function getType(): string
    {
        return strtolower(substr(strrchr(static::class, '\\'), 1));
    }

    public function getVideoId(string $value): string
    {
        preg_match($this->getRegex(), $value, $matches);

        if (!isset($matches[1])) {
            throw new \LogicException(sprintf('The video ID can not be found for "%s"', $value));
        }

        return $matches[1];
    }
}
