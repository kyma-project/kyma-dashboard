#!/bin/bash
>&2 git diff --name-only environments/dev extensions
modified=$(git diff --name-only environments/dev extensions)
if [ -n "$modified" ]; then
  >&2 echo "Changes detected in dev environment. Rendering extensibility..."
  echo "CHANGED=true"
else
  >&2 echo "No changes in ${environment} environment. Skipping.."
  echo "CHANGED=false"
fi
