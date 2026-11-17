# Katha

The site title and subtitle live in `public/data/graph.js` under `meta.title` and `meta.subtitle`.

A static page: HTML, CSS and vanilla JavaScript. No build step.

## Layout

- `public/index.html`, `public/style.css`, `public/app.js`: the page
- `public/data/graph.js`: all nodes, edges, sources and story steps. Edit this to add chapters.
- `wrangler.jsonc`: Cloudflare config (serves `./public` as static assets)

## Run locally

```
cd public
python3 -m http.server 8000
```

Then open http://localhost:8000. You can also double-click `public/index.html`: the data is a plain script file, so no server is needed.

## Deploy to Cloudflare

Option A, Workers static assets (Cloudflare's current recommendation for new projects):

```
npx wrangler login
npx wrangler deploy
```

Option B, Cloudflare Pages: connect the repo in the dashboard, leave the build command empty, and set the output directory to `public`.

## Adding data

Each node has: `id`, `no` (order of first appearance), `label`, `type` (concept, deity, being, place, open), `chapter`, `x`, `y`, `sub`, `what`, `origin`, `why`, `also` (other texts), `parallel` (interpretation).
Each edge has: `from`, `to`, `label`, `page`, `chapter`, `meaning`.
Story steps refer to edges by their position in the `edges` array, so append new edges at the end.

## Writing rules for the notes

Keep every description in your own words. Do not paste sentences from the book and do not include page photos. Keep `source`, page and chapter on every claim, and keep other-text notes and interpretations in their own fields.

## Privacy

If the site should be private, put it behind Cloudflare Access or do not share the link.

## Graph model (updated)

- `nodes`: one per entity or event. `type` is concept, deity, being, place, open or event. `no` is the order of first appearance and drives the layout, so nothing is placed by hand. Optional `group` folds a node into a cluster.
- `edges`: each has a stable `id`, a `kind` (creates, form, becomes, place, conflict, acts), its own `source` and `page`, and a `meaning`.
- Events are nodes. Participants point into the event; results point out of it.
- `groups`: clusters that start folded and open on tap.
- `story`: steps list node ids and edge ids (not positions), so inserting an edge never breaks a step.
- `meta.showSources`: `false` hides book and page references on the page. They stay in the data. Set `meta.credit` to an empty string to remove the footer line.

## Tour

In the 3D view, "Start tour" flies the camera from node to node in order of appearance and shows a short caption for each. "Pause tour" stops on the current node, and you can then drag to look around. The arrows step to the previous or next node, and tapping a node moves the tour there. The time spent per node is `DWELL` at the top of `public/app.js`.
