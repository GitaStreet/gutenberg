# BlockPopover and BlockPopoverInbetween

These two components allow rendering editor UI by the block (in a popover) but outside the canvas. This is important to avoid messing with the style and layout of the block list.

For example, it's used to render the contextual block toolbar and the in-between block inserter.

## BlockPopover

### Props

#### clientId

The client ID of the block representing the top position of the popover.

-   Type: `String`
-   Required: Yes

#### bottomClientId

The client ID of the block representing the bottom position of the popover.

-   Type: `String`
-   Required: No

## BlockPopoverInbetween

### Props

#### previousClientId

The client ID of the block before the popover.

-   Type: `String`
-   Required: Yes

#### nextClientId

The client ID of the block after the popover.

-   Type: `String`
-   Required: Yes