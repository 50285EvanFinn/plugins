# Changelog

All notable changes to this plugin will be documented here.

## Unreleased

- Renamed the full-pass skill to `check-agent-compatibility`.
- Renamed `deterministic-scan-review` to `compatibility-scan-review`.
- Renamed `docs-reality-review` to `docs-reliability-review`.
- Clarified the score model so `Agent Compatibility Score` is the final blended score and `Deterministic Compatibility Score` is the raw CLI score.
- Tightened the README, marketplace copy, and agent wording for public release.

## Notes (personal fork)

- Keeping a local copy of this changelog to track upstream changes I care about.
- The rename from `docs-reality-review` to `docs-reliability-review` is a nice catch — "reliability" reads much better.
- TODO: look into whether the blending weights for `Agent Compatibility Score` are configurable — I'd like to bias it more toward the deterministic score for my use case.
- Reminder: check if `compatibility-scan-review` supports custom rule sets before the next upstream merge.
- Checked 2024-06-10: `compatibility-scan-review` does NOT appear to support custom rule sets yet — will watch upstream for this feature before merging.
