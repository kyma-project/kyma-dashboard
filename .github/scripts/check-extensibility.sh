#!/bin/bash
git diff --name-only environments/dev environments/stage environments/prod extensions

OUTPUT="${GITHUB_OUTPUT:=>&1}"

environments=(dev stage prod)
(
    for environment in "${environments[@]}"; do
        modified=$(git diff --name-only environments/${environment} extensions)
        if [ -n "$modified" ]; then
            echo "Changes detected in ${environment} environment."
            echo "CHANGED_${environment}=true" >> $OUTPUT
        else
            echo "No changes in ${environment} environment."
            echo "CHANGED_${environment}=false" >> $OUTPUT
        fi
    done
)
