<!-- BEGIN NOYGEAR SHARED STANDARDS (managed by automations/agent-standards - do not edit by hand) -->

# Noygear shared agent standards

These standards are shared across all noygear repositories and are managed centrally in automations/agent-standards. Do not edit them inside this repo. Repo-specific instructions live below the shared block.

## Git workflow

- Never commit or push directly to the default branch. Create a branch first. Branch
  protection is not available on these private repos, so nothing rejects the push if you
  skip this.
- Open a pull request for every change, including documentation-only updates.
- When a pull request addresses a GitHub issue, link it with `Closes #<issue>`. Use the
  fully qualified `Closes noygear/<repo>#<issue>` when the issue lives in another repo.

## Branching strategy (standard)

- This repo has one long-lived branch. Open every pull request against the default branch,
  which is `main` in most repos and `master` in `planning`, `grants`, and `function-legal`.

## GitHub issue hygiene

Every issue carries a native type, set with `gh issue create --type <Type>` or
`gh issue edit <n> --type <Type>`. The org taxonomy is `Epic` for a multi-story body of
work, `Story` for a user-facing unit of value, `Task` for most engineering and process
work, `Bug` for a real defect, and `Feature` for a capability not yet broken into stories.

`Bug` means a real defect, not "waiting on external data". An issue that only needs
information from a stakeholder is a `Task`. Typing it `Bug` pollutes defect triage.

Apply the standard label families where they fit: `priority:p{0,1,2}`, `phase:*`,
`product:*`, `customer:*`, and the relevant `persona:*` or `system:*` labels.

## Writing style

Prose you write for noygear follows the house style. The `noygear-writing-style` skill in
`automations` carries the fuller rules and a self-check pass.

- No em dashes, no semicolons, no markdown emphasis in prose, and no "X, not Y" antithesis.
  These are stated rather than assumed because the default pull runs the other way.
- Back claims with data and concrete examples.
- Write for an intelligent non-specialist. Avoid jargon and consulting speak.
- Prefer paragraphs. Reserve bullet lists for social posts and client deliverables.
- Technical documentation stays precise and keeps the detail a specialist needs. Lead it
  with a short summary a non-specialist can follow before the deep detail starts.

The closed banned-word list is suspended while the style guide is reworked into something
more flexible. It blocked ordinary words including "can", "may", "it", and "that", which
cost more in contorted prose than it bought. Do not enforce it, and do not enforce it from
the skill's `references/banned-words.md` either.

## Scope control

- When you bump a version or change dependency versions, commit the updated lock file in
  the same change. A version bump without its lock file has caused drift here before.
- Treat source directories as canonical for skills and plugins. Do not commit zip archives
  or packaged `.plugin` and `.skill` files when the source tree is present.
- Keep secrets out of Git.

<!-- END NOYGEAR SHARED STANDARDS -->

<!-- Repo-specific instructions below this line are owned by this repo and are preserved across syncs. -->

# studio-homepage specifics

## Deployment

This repo backs a deployed site. `main` is published to production at
[noygear.ai](https://noygear.ai) by GitHub Pages (the `CNAME` file points there). Treat any
change to `main` as production-facing: it goes live as soon as it merges. The single-`main`-branch
flow in the shared standard above applies here. There is no separate staging branch, so review
and verify before merging to `main`.
