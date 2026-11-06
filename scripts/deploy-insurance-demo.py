"""Publish a composed release using Saarthi's existing Azure Linux uploader.

The uploader keeps credentials in memory and removes its temporary resources.
This wrapper pins the subscription and uses distinct temporary resource names.
"""
import argparse
import importlib.util
import json
import pathlib
import uuid

parser = argparse.ArgumentParser()
parser.add_argument('--release', required=True, type=pathlib.Path)
parser.add_argument('--uploader', required=True, type=pathlib.Path)
parser.add_argument('--subscription', required=True)
args = parser.parse_args()
release = args.release.resolve()
if release.name != 'dist':
    raise SystemExit('The composed release directory must be named dist.')
report = json.loads((release.parent / 'composition.json').read_text())
if pathlib.Path(report['output']).resolve() != release or not report['baseConfigurationPreserved']:
    raise SystemExit('Prepare a composed release before deploying.')
for path in ['insurance/index.html', 'index.html', 'app/main.dart.js', 'watch/index.html']:
    if not (release / path).is_file():
        raise SystemExit(f'Missing release artifact: {path}')

spec = importlib.util.spec_from_file_location('saarthi_azure_uploader', args.uploader.resolve())
uploader = importlib.util.module_from_spec(spec)
spec.loader.exec_module(uploader)
uploader.ROOT = release.parent
suffix = uuid.uuid4().hex[:12]
uploader.STORAGE = 'saarthiins' + suffix
uploader.JOB = 'saarthi-insurance-' + suffix
original_az = uploader.az


def scoped_az(*command, **kwargs):
    return original_az(*command, '--subscription', args.subscription, **kwargs)


uploader.az = scoped_az
app = scoped_az('staticwebapp', 'show', '-n', uploader.APP, '-g', uploader.GROUP)
if 'demo.saarthiin.com' not in app.get('customDomains', []):
    raise SystemExit('The target app does not own demo.saarthiin.com.')
print(f'Publishing {report["files"]} files to demo.saarthiin.com/insurance', flush=True)
uploader.publish()
