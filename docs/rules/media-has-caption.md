# media-has-caption

Providing captions for media is essential for deaf users to follow along. Captions should be a transcription or translation of the dialogue, sound effects, relevant musical cues, and other relevant audio information. Not only is this important for accessibility, but can also be useful for all users in the case that the media is unavailable (similar to `alt` text on an image when an image is unable to load).

The captions should contain all important and relevant information to understand the corresponding media. This may mean that the captions are not a 1:1 mapping of the dialogue in the media content.

### References

  1.[aXe](https://dequeuniversity.com/rules/axe/2.1/audio-caption)
  1.[aXe](https://dequeuniversity.com/rules/axe/2.1/video-caption)

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<audio><track kind="captions" {...props} /></audio>
<video><track kind="captions" {...props} /></video>
```

### Fail
```jsx
<audio {...props} />
<video {...props} />
```
