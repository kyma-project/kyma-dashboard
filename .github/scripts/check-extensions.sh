#!/bin/bash
git diff --name-only environments/dev extensions

OUTPUT="${GITHUB_OUTPUT:=>&1}"

modified=$(git diff --name-only environments/dev extensions)
if [ -n "$modified" ]; then
  echo "Changes detected in dev environment. Rendering extensibility..."
  echo "CHANGED=true" >> $OUTPUT
else
  echo "No changes in ${environment} environment. Skipping.."
  echo "CHANGED=false" >> $OUTPUT
fi
