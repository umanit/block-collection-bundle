<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\VideoDetector;

interface VideoDetectorInterface
{
    public function getType(): string;

    public function getRegex(): string;

    public function getVideoId(string $value): string;
}
