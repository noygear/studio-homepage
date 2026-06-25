<!-- BEGIN NOYGEAR SHARED STANDARDS (managed by automations/agent-standards - do not edit by hand) -->

# Noygear shared agent standards

These standards are shared across all noygear repositories and are managed centrally in automations/agent-standards. Do not edit them inside this repo. Repo-specific instructions live below the shared block.

## Git workflow

- Never commit or push directly to the production branch. Create a branch for every
  change first.
- Open a pull request for every change, including documentation-only updates.
- Treat branch protection as the source of truth. Do not work around it.
- Keep one logical change per pull request so reviews stay small and reversible.
- When a pull request addresses a GitHub issue, link it in the description with
  `Closes #<issue>` (or `Fixes` / `Resolves`) so the issue auto-closes on merge. Use the
  fully qualified form `Closes noygear/<repo>#<issue>` when the issue lives in another repo.

## Branching strategy (standard)

This repository is not a deployed web app. It uses a single long-lived branch:

- `main` (or `master` where the repo predates the rename) is the only protected branch.

```
feature/xyz  ->  main
```

Rules:

- Open every pull request against the default branch.
- There is no `develop` branch here. Do not create one.
- Keep feature branches short-lived and delete them after merge.

## GitHub issue hygiene

Every GitHub issue must carry a native issue type. When you create an issue, or notice an
existing one without a type, set it. No issue ships untyped.

### Native types (org-level taxonomy)

| Type | Use for |
|------|---------|
| `Epic` | A multi-story body of work, such as a product MVP. |
| `Story` | A user-facing unit of value, written in story format. |
| `Task` | A specific piece of engineering or process work (most child issues). |
| `Bug` | A defect in existing behavior. Something that worked or should work is broken. |
| `Feature` | A requested capability not yet broken into stories. |

`Bug` means a real defect, not "waiting on external data." An issue that only needs
information from a stakeholder is a `Task`, not a `Bug`. Typing it `Bug` pollutes defect
triage.

These native types are distinct from `type:*` labels (such as `type:design`,
`type:interview`, `type:document`), which describe a deliverable. An issue can carry both.

### Setting the type

Recent `gh` versions set the issue type by name directly, on both `create` and `edit`:

```bash
gh issue create --repo noygear/<repo> --title "..." --body "..." --type Task
gh issue edit <number> --repo noygear/<repo> --type Bug
```

If your `gh` is too old to have `--type` (run `gh issue create --help` to check), fall back
to the GraphQL API. Issue types live on the organization:

```bash
# 1. Look up the type ids once.
gh api graphql -f query='{organization(login:"noygear"){issueTypes(first:20){nodes{id name}}}}'

# 2. Get the issue node id, then set the type.
NODE=$(gh issue view <number> --json id --jq .id)
gh api graphql \
  -f query='mutation($i:ID!,$t:ID!){updateIssue(input:{id:$i,issueTypeId:$t}){issue{number issueType{name}}}}' \
  -f i="$NODE" -f t="<issueTypeId>"
```

### Labels and hygiene

- Apply the standard label families where they fit: `priority:p{0,1,2}`, `phase:*`,
  `product:*`, `customer:*`, and the relevant `persona:*` or `system:*` labels.
- Do not hand-apply `delivery-os:needs-hygiene`. The Delivery OS hygiene checker applies and
  clears it automatically based on `automations/configs/rules.yaml`.
- Keep issues that are `In Progress` moving. The hygiene checker flags an issue that sits
  `In Progress` without an update past the configured stale window.

## Technology selection

- Prefer current, actively supported, future-proof platforms, APIs, SDKs, and integration
  patterns over legacy or compatibility-first approaches.
- Do not default to older systems just because they are more common in examples, tutorials,
  or training data. Correct for that bias and say when you are doing so.
- Before building an integration, check whether a newer or more capable first-party API
  better supports the likely next step, such as drafts, labels, metadata updates, richer
  permissions, webhooks, structured objects, or partial updates.
- Choose the path that will still be the right foundation when the project needs more
  advanced capabilities, even if it costs a little more setup now.
- Use a legacy option only when there is a clear, documented reason, such as an external
  constraint, an explicit requirement, or a missing capability in the modern platform.

### Legacy-avoidance check

When choosing a technical approach, ask one extra question: is this the most current and
future-forward implementation path? If there is meaningful risk of landing on an older
stack, do one more round of verification before you implement.

## Writing style

All human-readable prose you produce for noygear follows the company house style. This
covers chat replies longer than one sentence, commit messages, PR descriptions, issues,
reports, memos, and docs. It does not cover raw code, JSON, YAML, CSV, or log output.

Claude Code users: the `noygear-writing-style` skill carries the full rules and a
self-check pass. Invoke it for any writing or editing task. The rules in brief, for agents
that do not load the skill:

- Clear, simple language. Short sentences. Active voice. Address the reader as "you".
- Back claims with data and concrete examples.
- No em dashes. Use commas, periods, or rewrite.
- No semicolons. Split into two sentences.
- No asterisks for emphasis, no markdown emphasis in prose, no hashtags.
- No metaphors, clichés, filler adjectives, or "X, not Y" antithesis flourishes.
- No setup phrases such as "in conclusion" or "in summary".
- No banned words. The skill's `references/banned-words.md` has the full list.
- Reserve bullet lists for social posts. Prefer paragraphs in other prose. Client
  deliverables are the exception and may use headings, bold labels, bullets, and tables.
- Avoid unnecessary jargon and consulting speak. Write for an intelligent non-specialist by
  default. Respect the reader's intelligence without assuming they share your context.

Technical documentation should still be technically precise and carry the details a
specialist needs. Even there, lead with a short executive summary, an "explain it to a
smart ten-year-old" preface, that a non-specialist can follow before the deep detail starts.

If the user asks for another voice, follow the user and note in one line that the house
style was set aside on purpose.

## Scope control

- Do not commit unrelated untracked files. Stage only what the change needs.
- Ask before including generated archives, exports, or local planning notes that are not
  clearly part of the requested change.
- Treat source directories as canonical for skills and plugins. Do not commit zip archives
  or packaged `.plugin` and `.skill` files when the source tree is present. Regenerate
  packaged artifacts locally or in CI when a release step needs them.
- When you bump a project version or change dependency versions, commit the updated lock
  file in the same change (for example `uv.lock`, `package-lock.json`, `pnpm-lock.yaml`,
  `poetry.lock`). A version bump without its lock file has caused drift here before.
- Keep secrets out of Git.

<!-- END NOYGEAR SHARED STANDARDS -->

<!-- Repo-specific instructions below this line are owned by this repo and are preserved across syncs. -->

# studio-homepage specifics

## Deployment

This repo backs a deployed site. `main` is published to production at
[noygear.ai](https://noygear.ai) by GitHub Pages (the `CNAME` file points there). Treat any
change to `main` as production-facing: it goes live as soon as it merges. The shared standard
above describes the single-`main`-branch flow, which still applies here, but note that "not a
deployed web app" in that block does not match this repo. There is no separate staging branch,
so review and verify before merging to `main`.
