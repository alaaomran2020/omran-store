# Instagram sync research

## Official Meta sources reviewed on 2026-08-21

1. IG User Media reference: https://developers.facebook.com/documentation/instagram-platform/instagram-graph-api/reference/ig-user/media
   - The endpoint represents the collection of IG Media on an IG User.
   - It supports GET graph.facebook.com/v26.0/{instagram-user-id}/media.
   - The media_url field may be omitted for video media with copyrighted/licensed audio and some reels with downloads disabled; image media normally exposes media_url.
   - Stories are not supported by this endpoint; use the stories endpoint instead.
   - Access token type is User; permissions shown include instagram_basic and pages_read_engagement or pages_show_list for the Facebook Login path.
   - The endpoint supports time-based pagination with since/until.

2. Instagram API with Instagram Login overview: https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login
   - Supports Instagram professional accounts (businesses and creators).
   - API capabilities include getting/publishing media and media insights.
   - This setup does not require a Facebook Page linked to the Instagram professional account.
   - Current scopes are instagram_business_basic and instagram_business_content_publish for the Instagram Login path; older scope names were deprecated according to the page.

## Implementation implications

- Keep the token in GitHub Actions secrets; never ship it to the browser or commit it.
- The sync job should fetch image media and write a sanitized JSON feed with id, media_type, media_url, permalink, caption, timestamp, and thumbnail_url where present.
- The website should render the checked-in feed JSON and link each item back to its Instagram permalink.
- If the API returns no media_url, the sync should skip that item or keep it without a broken image; it must not fail the whole build.
- Add a visible fallback message when the feed file is empty or stale.
