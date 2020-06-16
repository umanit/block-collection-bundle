<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\VideoDetector;

class Youku extends AbstractVideoDetector
{
    public function getRegex(): string
    {
        return '`youku\.com/(?:player\.php/sid/|v_show/id_|embed/)([a-zA-Z0-9=]+)(?:\/|\.)?`';
    }
}
