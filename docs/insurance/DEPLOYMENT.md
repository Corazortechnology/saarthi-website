# Shared Azure demo deployment

Target: `https://demo.saarthiin.com/insurance`.

The Azure Static Web App `saarthi-demo` in `saarthi-demo-rg` serves both `demo.saarthiin.com` and `simulation.saarthiin.com`. Its existing root, film, Flutter app, language catalogs and voice files must be included in each complete release. Deploying the website's standalone `dist/` to this app would replace those experiences.

## Build and compose

1. Confirm Azure access to subscription `95038f6f-b1d3-4c69-9e11-712f368ead6c` and compare the saved base release with the current public deployment.
2. Run `npm run build:insurance-demo`. Vite places assets under `/insurance/` in the separate ignored `dist-insurance/` directory. The normal website build retains its root asset paths.
3. Compose into a new directory:

```sh
node scripts/prepare-insurance-demo.mjs \
  --base-release '../Saarthi-simulator/dist' \
  --output /tmp/saarthi-insurance-release/dist
```

The script preserves every existing content file, adds `insurance/`, and prepends only the insurance route rules to the Azure config. Explicit page rewrites support direct profile/scenario links without rewriting asset requests. Existing routes, headers and MIME mappings stay intact. It checks file hashes and the 250 MiB content limit, and writes a composition report beside `dist/`. The output directory must not already exist.

## Publish

```sh
python3 scripts/deploy-insurance-demo.py \
  --release /tmp/saarthi-insurance-release/dist \
  --uploader '../Saarthi-simulator/scripts/deploy-azure-cloud.py' \
  --subscription 95038f6f-b1d3-4c69-9e11-712f368ead6c
```

This reuses the established official Azure Linux uploader. The wrapper checks the target custom domain, pins the subscription and creates unique temporary resource names. The uploader uses private temporary artifact storage and credentials held in memory, then removes its temporary container and storage. No deployment token is committed or printed.

After publishing, confirm HTTPS for `/insurance`, `/insurance/guide`, a direct profile link and the hashed assets. Compare the original film/simulator files with their saved hashes and inspect the dashboard in a browser. A rollback publishes the preserved base release with its original `staticwebapp.config.json` using the existing simulator deployment workflow.
