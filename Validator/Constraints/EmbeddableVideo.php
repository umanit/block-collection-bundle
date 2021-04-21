<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class EmbeddableVideo extends Constraint
{
    public $message = 'The URL "{{ string }}" is not authorized. Only YouTube, Vimeo and Youku URLs are accepted.';
}
