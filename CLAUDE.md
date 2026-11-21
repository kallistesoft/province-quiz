# Province quiz (`kallistesoft/province-quiz`)

French-only "quelle province canadienne est faite pour vous ?" quiz, 20 questions, one question per page (real page
loads, for ad income). Live at https://quiz.kallistesoft.ca (noindex for now). Since 2026-11-19 it is no longer the
lawyer's funnel: it becomes ad-funded (AdSense, under review; plan `~/.claude/plans/i-want-to-add-valiant-crab.md`).

## Stack
Plain HTML/CSS/JS, no framework. `js/data.js` (provinces, questions, weights), `js/score.js`, `js/config.js`
(site URL, AdSense ids), `js/track.js` (anonymous events to kallistesoft.ca/hit.php; read them with
`node tools/stats.mjs quiz` in kallistesoft-site).

## Build, check, deploy
- `index.html`, `p/<slug>/`, `credits/` are generated: run `node tools/build_pages.mjs` after ANY css/js edit
  (it stamps `?v=<hash>`; a stale cached script once blanked the result page).
- Check: `tools/check.sh` (weights via `check_scoring.mjs`, and the generated pages must be up to date). The global pre-push hook runs it.
- Deploy: every push to `main` uploads to GoDaddy (`deploy-godaddy.yml`). Branches don't deploy.

## Rules (owner)
- Ads: banners only every 5 questions (Q5/10/15/20), never on the result page; a Google-certified consent banner
  before ads go live for EU visitors. Never click our own ads; test with `data-adtest="on"`.
- The owner clicks AdSense submit/terms buttons.
- The immigration notes in `js/data.js` date from October 2026: re-check them before each campaign.

## Branches and PRs
- Feature branch → push → PR against `main` (never stacked). The owner merges; never `gh pr merge`, never `--admin`.

## Autonomy, to-dos, decisions
- Follow the AdSense plan phases; ask before new ad placements or content changes beyond it.
- To-dos: the plan file above (phases A/B/C). Non-blocking choices: `DECISIONS.md`, with the default taken.
