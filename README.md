# Krish Bothra portfolio

A Quarto website published to GitHub Pages from the committed `_site/` directory.

## Update the website

1. Install Quarto and R. The reports use the R packages `tidyverse`, `ragg`, `knitr`, and `rmarkdown`.
2. Edit the `.qmd` source files. `Projects.qmd` lists the three research reports and the pages in `projects/`.
3. Run `quarto render` from this directory, or use the Quarto installation bundled with RStudio.
4. Preview `_site/Projects.html` with a local web server and commit the source changes together with the regenerated `_site/` files.
5. Open a pull request. After it is merged into `main`, the deployment workflow publishes `_site/`.

The OKC report reads the seven summary CSVs in `analysis_results/`; rendering does not train a model or require the original shot dataset. The Mariners report generates its plots from values included in the document. The CMU report and presentation share assets in `Images/`.
