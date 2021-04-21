<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\VideoDetector;

class Vimeo extends AbstractVideoDetector
{
    public function getRegex(): string
    {
        return '`(?:vimeo(?:cdn|pro)?)\.com/(?:(?:channels/[\w]+|(?:(?:album/\d+|groups/[\w]+|staff/frame)/)?videos?)\/)?(\d+)(?:_(\d+)(?:x(\d+))?)?(\.\w+)?`';
    }
}
