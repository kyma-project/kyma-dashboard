#!/bin/bash
git diff --name-only environments/dev extensions
modified=$(git diff --name-only environments/dev extensions)
if [ -n "$modified" ]; then
  echo "Changes detected in dev environment. Rendering extensibility..."
  echo "CHANGED=true" >> $GITHUB_OUTPUT
  else
    echo "No changes in ${environment} environment. Skipping.."
    echo "CHANGED=false" >> $GITHUB_OUTPUT
fi
