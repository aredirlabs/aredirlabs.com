# Engineering Work Repository Reference Contract

## Authority boundary

A repository reference is a read-only citation from Engineering Work to a durable, repository-authoritative artifact. The Workspace may display relationship, status, and review metadata, but does not ingest artifact bodies, edit source files, publish changes, or claim authority over the artifact.

## Supported artifact classes

The baseline supports references to an implementation/discovery/architecture/scope package, finding, verification evidence, decision/ADR, Mission, repository document, review, release record, promotion candidate, and knowledge asset source. The artifact class describes the reference; it does not instantiate an in-Workspace artifact type.

## Reference metadata

| Metadata | Status | Purpose |
| --- | --- | --- |
| Repository identifier or canonical repository URL | Required per reference | Names the source authority. |
| Source path or canonical artifact URL | Required per reference | Locates the artifact without copying its body. |
| Artifact class | Required per reference | Explains the cited artifact’s role. |
| Authority classification | Required per reference | States repository-authoritative, external read-only, or Workspace-derived context; baseline repository references use repository-authoritative. |
| Artifact identifier | Optional | Preserves a governed identifier when one exists. |
| Branch | Optional | Identifies an unpinned working context. |
| Commit hash | Optional | Pins a historical revision when known/needed. |
| Reference status | Required per reference | `expected`, `verified`, `stale`, or `missing`. |
| Last reviewed date | Optional | Records last human confirmation, not automated synchronization. |
| Note/context | Optional | Explains why the Work cites the source. |

## Read-only behavior

- Adding a reference records metadata only.
- Following a reference may navigate to a repository URL/path when available; it does not fetch, cache, index, or reproduce content in the baseline.
- Branch indicates a moving line of development. Commit hash, when supplied, is the immutable historical anchor and takes precedence for historical interpretation.
- Absence of a commit hash means the reference identifies a source location, not a version guarantee.

## Stale and missing references

`stale` means a human knows the source may have moved or changed after the last review. `missing` means the named URL/path/artifact cannot currently be located. Neither state deletes the reference or changes Engineering Work lifecycle automatically. The Work should record a next action/condition when the reference materially affects progress.

## Historical traceability

References are retained after Work completion, closure, cancellation, and supersession. A commit hash and last-reviewed date may be added for historical precision, but this contract does not require every artifact to be commit-pinned or introduce source control integration.

## Explicit exclusions

The baseline excludes repository ingestion, directory scanning, content synchronization, automatic stale detection, Git provider APIs, branch creation, pull requests, repository file editing, automated publishing, write-back, and bidirectional synchronization. It also excludes treating Workspace documents or static Knowledge Registry entries as proof of a repository artifact’s current content.
