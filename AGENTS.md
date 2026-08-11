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
- Commit under the identity git is already configured with. Never pass `-c user.email`,
  `-c user.name`, or `--author` to `git commit`. The email address in your session context
  belongs to the Claude account, not to this machine, and GitHub attributes commits by
  author email, so using it lands them on a different account and only a history rewrite
  undoes that.

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

Before opening a `Task` or `Bug`, add at least one testable item under
`## Acceptance Criteria`. For a `Bug`, also state the observed and expected behavior;
include reproduction steps, logs, or screenshots only when they help the implementer.
Tasks and Bugs do not require story points or parent links.

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

Use the word the customer uses, over a tidier category noun and over one of ours already
in an internal document, unless it is a term of art that has to be exact.
Coin a term only where nothing is plainer, and define it on first use.

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

## Large file storage

- Large binaries do not go in GitHub. That covers video, audio, images, PDFs, Office files,
  design files, archives, model weights, installers, and generated exports.
- Store them in the Noygear Shared Drive. When no project folder is given, the catch-all root
  is `H:\Shared drives\Noygear PR LLC Team Internal shared drive\RWA Studio Ops\10 Large File Storage`.
- Commit a Markdown sidecar in the repo where the binary would have lived, named
  `<original-file-name>.<ext>.md`. It holds the Drive path, the SHA-256, the file size, the
  technical metadata, a timestamped transcript where the file has speech, visual descriptions,
  retrieval tags, and review flags. The sidecar is what keeps the repo searchable by a person
  and by an agent.
- Each repo's `.gitignore` carries the shared extension block, between the
  `# Large file sidecar policy` and `# End large file sidecar policy` marker lines. Sidecar
  `.md` files are never ignored. The block is managed: `scripts/sync-agent-standards.py` in
  `automations` renders it from `agent-standards/large-file-extensions.txt` and opens the pull
  request that carries it, so an edit between the markers is overwritten by the next sync.
  Nothing already tracked is affected, because `.gitignore` does not untrack; to add a
  covered file on purpose, `git add -f` it, or add a `!` exception below the block and say why.
- A pre-commit guard blocks staged binaries over 1 MB. Smaller ones pass, because `.gitignore`
  already stops them being staged by accident and the ones that get through were force-added
  on purpose, so refusing a 20 kB screenshot would only cost the guard its welcome. It lives at
  `scripts/git-hooks/guards.d/large-file-guard` in `automations` and is installed into the other
  repos by running `python scripts/install-git-hooks.py --apply` from an `automations` checkout.
- A pipeline that generates a covered format into Git, such as a Quarto render committing a
  `.pdf`, stages it with `git add -f`. Without the `-f` the command exits non-zero and takes the
  hook or the workflow down with it under `set -e`. The force is the record that it is deliberate.
- Narrow, documented exceptions go in a `.large-file-sidecar-allowlist` file at the repo root.
- The `large-file-sidecar` skill in `automations` `nstack/` automates the copy, the hashing, the
  metadata capture, and the sidecar.

<!-- END NOYGEAR SHARED STANDARDS -->

<!-- Repo-specific instructions below this line are owned by this repo and are preserved across syncs. -->

# studio-homepage specifics

## Deployment

This repo backs a deployed site. `main` is published to production at
[noygear.ai](https://noygear.ai) by GitHub Pages (the `CNAME` file points there). Treat any
change to `main` as production-facing: it goes live as soon as it merges. The single-`main`-branch
flow in the shared standard above applies here. There is no separate staging branch, so review
and verify before merging to `main`.
