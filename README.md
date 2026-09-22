# Breaking MAG — Website

The static website for **Breaking MAG: From Metagenomics Pipeline Selection to Functional Discovery**, a PhD thesis project by Jeferyd Yepes-García (University of Fribourg / SIB).

The site presents the thesis ecosystem: the open-source tools built along the thesis (**2Pipe**, **MAGFlow**, **BIgMAG**, **CAZyBERT**), the accompanying learning material (**TaxoFlow**, Nextflow in Action, Metagenomics Data Analysis, Python for Bioinformatics), the publications behind them, and a downloadable thesis briefing.

## Structure

```
website/
├── index.html          # Single-page site (all sections)
├── css/
│   └── styles.css      # Modern dark/light theme, responsive
├── js/
│   └── main.js         # Theme toggle, nav, reveal, filters, counters
└── assets/
    ├── favicon.png     # Browser tab icon
    ├── thesis_briefing.pdf
    ├── video/          # SIB 2024 "Remarkable Output" award video (MAGFlow & BIgMAG)
    ├── img/            # Framework / workflow diagrams
    └── logos/          # Tool logos
```

The site is fully static — a single `index.html` with no build step, framework or runtime dependencies.

## Pages / sections

- **Hero** — tagline, stats, calls to action
- **Overview** — the integrated framework (Decide → Benchmark → Annotate → Build) + integration diagram
- **Tools** — cards for 2Pipe, MAGFlow, BIgMAG and CAZyBERT, with filter by category and all access links (apps, GitHub, Zenodo, PyPI, papers); MAGFlow and BIgMAG include the SIB 2024 "Remarkable Output" award video (`assets/video/SIB_RO2024.mp4`)
- **Learning** — TaxoFlow tutorial, Nextflow in Action, Metagenomics Data Analysis, Python for Bioinformatics (with YouTube recordings)
- **Publications** — open-access papers and DOIs
- **Thesis** — embedded preview + download of `assets/thesis_briefing.pdf`
- **About** — authors, affiliations, funding acknowledgment

## Run locally

```bash
cd website
python3 -m http.server 8000
```

Then open http://localhost:8000/ in your browser.

## Deploy to GitHub Pages

1. Commit and push the `website/` folder contents to a GitHub repository:

   ```bash
   git add -A
   git commit -m "Add Breaking MAG website"
   git remote add origin https://github.com/jeffe107/breaking-mag.git
   git push -u origin main
   ```

2. In the repository on GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*, **Branch** to `main` and folder to `/ (root)`, then **Save**.

The site will be published at `https://<username>.github.io/<repository>/`.

## Making edits

- **Content**: edit `index.html` — each tool is one `<article class="card">`; links, tags and descriptions live inside it.
- **Colors / theme**: edit the CSS variables at the top of `css/styles.css` (`:root` for dark, `[data-theme="light"]` for light).
- **Add assets**: drop files into `assets/` and reference them with relative paths (e.g. `assets/img/my-image.png`).

## Related repositories

- [2Pipe](https://github.com/jeffe107/2pipe)
- [MAGFlow](https://github.com/jeffe107/MAGFlow)
- [BIgMAG](https://github.com/jeffe107/BIgMAG)
- [TaxoFlow tutorial](https://github.com/jeffe107/taxoflow_tutorial)
- [Python for Bioinformatics workshop](https://github.com/jeffe107/workshopBioSeryl)