<?php

declare(strict_types=1);

namespace Umanit\BlockCollectionBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;
use Umanit\BlockCollectionBundle\VideoDetector\VideoDetectorInterface;

class EmbeddableVideoValidator extends ConstraintValidator
{
    /** @var VideoDetectorInterface[] */
    private $videoDetectors;

    public function __construct(iterable $videoDetectors)
    {
        $this->videoDetectors = $videoDetectors;
    }

    public function validate($value, Constraint $constraint): void
    {
        if (!$constraint instanceof EmbeddableVideo) {
            throw new UnexpectedTypeException($constraint, EmbeddableVideo::class);
        }

        if (null === $value || '' === $value) {
            return;
        }

        if (!\is_string($value)) {
            throw new UnexpectedValueException($value, 'string');
        }

        foreach ($this->videoDetectors as $detector) {
            try {
                $detector->getVideoId($value);

                // No exception, we have a match!
                return;
            } catch (\Throwable $e) {
                // Nothing to do, let's try another detector
            }
        }

        // Nothing seems to match the given value
        $this
            ->context
            ->buildViolation($constraint->message)
            ->setParameter('{{ string }}', $value)
            ->addViolation()
        ;
    }
}
