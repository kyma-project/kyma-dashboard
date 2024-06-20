#!/bin/bash
git diff --name-only environments/dev extensions
modified=$(git diff --name-only environments/dev extensions)
if [ -n "$modified" ]; then
  echo "Changes detected in dev environment. Rendering extensibility..."
  echo "CHANGED=true"
  else
    echo "No changes in ${environment} environment. Skipping.."
    echo "CHANGED=false"
fi
