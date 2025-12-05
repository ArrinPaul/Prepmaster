# Changelog Management

This file documents how to maintain the changelog for PrepPath.

## Format

We follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format with [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Categories

Changes should be grouped under one of these categories:

- **Added** - New features
- **Changed** - Changes in existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security vulnerability fixes

## Version Format

### Major Version (x.0.0)
Breaking changes that require user action or significantly change functionality.

### Minor Version (0.x.0)
New features that don't break existing functionality.

### Patch Version (0.0.x)
Bug fixes and minor improvements.

## How to Update

### 1. Before Committing Changes

Add your changes to the `[Unreleased]` section of `CHANGELOG.md`:

```markdown
## [Unreleased]

### Added
- New feature description

### Fixed
- Bug fix description
```

### 2. When Releasing

Move `[Unreleased]` items to a new version section:

```markdown
## [1.1.0] - 2025-12-05

### Added
- Feature from unreleased section

## [Unreleased]
```

### 3. Commit Message Convention

Use conventional commits format:

```
feat: add new feature
fix: resolve bug in component
docs: update README
chore: update dependencies
refactor: restructure module
test: add unit tests
style: format code
perf: improve performance
```

## Examples

### Good Changelog Entry

```markdown
## [1.2.0] - 2025-12-10

### Added
- Voice AI Interview System with OpenAI integration
  - GPT-4 powered question generation
  - Whisper audio transcription
  - TTS audio generation for questions
- Activity tracking with 365-day heatmap
- Achievement system with 26 achievements

### Changed
- Updated authentication to support refresh token rotation
- Improved error handling with detailed messages

### Fixed
- Fixed race condition in streak calculation
- Resolved memory leak in audio processing worker

### Security
- Added rate limiting to expensive OpenAI endpoints
- Implemented file validation for audio uploads
```

### Bad Changelog Entry

```markdown
## [1.2.0] - 2025-12-10

### Changed
- Updated stuff
- Fixed things
- Made improvements
```

## Automation (Future)

Consider using tools like:
- `conventional-changelog` - Generate changelog from git commits
- `semantic-release` - Automate versioning and releases
- GitHub Actions - Auto-update changelog on merge

## Review Checklist

Before releasing, ensure:
- [ ] All changes are documented under appropriate category
- [ ] Version number follows semantic versioning
- [ ] Release date is accurate
- [ ] Breaking changes are clearly marked
- [ ] Links to issues/PRs are included when relevant
- [ ] Changes are user-facing (internal refactors may be omitted)

## Templates

### Feature Template
```markdown
- **Feature Name**: Brief description
  - Sub-feature 1
  - Sub-feature 2
  - Technical details if relevant
```

### Bug Fix Template
```markdown
- Fixed [issue description] that caused [problem]
  - Impact: [who/what was affected]
  - Resolution: [how it was fixed]
```

### Breaking Change Template
```markdown
### ⚠️ BREAKING CHANGES

- **Change Description**: What changed
  - **Migration**: How to update existing code
  - **Reason**: Why this change was necessary
```

## References

- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
