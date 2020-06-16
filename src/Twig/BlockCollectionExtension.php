<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class BlockCollectionExtension extends AbstractExtension
{
    public function getFunctions(): array
    {
        return [
            new TwigFunction(
                'umanit_block_collection_embeddable_video_type',
                [BlockCollectionRuntime::class, 'embeddableVideoType']
            ),
            new TwigFunction(
                'umanit_block_collection_embeddable_video_id',
                [BlockCollectionRuntime::class, 'embeddableVideoId']
            ),
        ];
    }
}
