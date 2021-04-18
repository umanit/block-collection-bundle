UPGRADE FROM 1.0.x to 2.0.x
===========================

Assets
------

* Remove the `{{ asset('bundles/umanitblockcollection/xxx') }}` calls
* Declare the stimulus controller in your `assets/controllers.json` as explained in the installation part of
  the `README.md`

Twig views
----------

* If you have overrided some view in `src/Resources/views/sylius/artgris/`, you must update them to use stimulus markup
  (controllers, targets).

Translations
------------

Translations are now using a custom domain `UmanitBlockCollectionBundle`.
