# Boundless Builders Open Graph artwork

## Directions for review

1. [Constellation assembly](concepts/01-constellation.png): the Boundless mark sits inside a network of connected builder nodes and floating modules. The current exports show this proposed direction.
2. [Isometric ascent](concepts/02-isometric-ascent.png): building blocks rise along a launch path. Its [editable sketch](concepts/02-isometric-ascent.svg) is included if this direction is preferred.

These directions are ready for maintainer review. The final direction has not been selected yet.

## Exports and source

- [Standard PNG](opengraph-image.png), 1200 x 630, for link previews.
- [2x PNG](opengraph-image@2x.png), 2400 x 1260, for high resolution use.
- [Text-free background PNG](opengraph-background.png) and [SVG](opengraph-background.svg) for route-specific overlays.
- [Layered SVG source](opengraph-image.svg). Groups `01` through `06` contain the artwork. Group `07` contains the editable brand mark and copy. The [font files and licenses](source/fonts/) are included for editing and export.
- [Alt text](opengraph-image.alt.txt).

The 1100 x 550 safe zone spans `x=50..1150` and `y=40..590`. Keep route titles within the open area at `x=76..640`, `y=515..575`. The title and tagline use Bebas Neue and Plus Jakarta Sans. The background uses the hero's `#0d1111` surface and the `primary-500` teal `#2eedaa`.

The SVG text remains editable. The PNG exports use the bundled Open Font License fonts to preserve the intended typography on machines where the fonts are not installed.

These files are design assets. A follow-up code change must set Open Graph metadata to `/og/opengraph-image.png` and provide the accompanying alt text; files under `public/og/` do not create metadata tags by themselves.
