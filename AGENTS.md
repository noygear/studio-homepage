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

Write the way a sharp colleague writes a note. The failure mode is press-release voice:
long sentences, decorative adjectives, and a claim of importance standing in for a fact.
Name the number, the date, the person. Cut any word whose removal would not change the
meaning. Default to paragraphs, since bullet lists belong to social posts and to
structured client deliverables.

Avoid the tells that mark prose as machine-written: em dashes, semicolons, bold-label
bullet lists, significance inflation ("pivotal", "testament to", "underscores"),
participial tails ("..., reflecting broader trends"), and mirrored "not X, but Y"
phrasing. None are banned. Reach for one only when nothing plainer carries the meaning,
which is rare, and rarer still in anything a customer reads.

Match the polish to the audience. A PR description, issue, or engineering note can be
rough and use our jargon freely. A customer email, proposal, or report gets a full editing
pass and no internal shorthand.

Start every PR description with one information-dense paragraph that explains its purpose
and impact to an intelligent non-specialist with no assumed technical background. Open any
other document longer than a few paragraphs the same way. What follows can be as technical
as the subject requires.

The full guide is `agent-standards/writing-style.md` in `noygear/automations`, and the
`noygear-writing-style` skill carries it with the document templates.

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
