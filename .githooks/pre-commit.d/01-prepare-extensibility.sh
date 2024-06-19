#!/bin/bash

environments=(dev stage prod)
echo "Running extensions pre-commit hook..."
(
  cd "$(git rev-parse --show-toplevel)" || exit 1
    for environment in "${environments[@]}"; do
      modified=$(git diff --staged --exit-code --name-only environments/${environment} extensions)
      if [ -n "$modified" ]; then
        echo "Changes detected in ${environment} environment. Rendering extensibility..."
        npm run prepare-${environment}-extensibility
        git add environments/${environment}
        else
          echo "No changes in ${environment} environment. Skipping.."
      fi
    done
)
