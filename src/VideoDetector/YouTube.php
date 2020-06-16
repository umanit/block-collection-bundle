<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\VideoDetector;

class YouTube extends AbstractVideoDetector
{
    public function getRegex(): string
    {
        return '`.*(?:(?:youtu\.be/|v/|vi/|u/\w/|embed/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*`';
    }
}
