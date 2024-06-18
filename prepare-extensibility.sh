#!/bin/bash

# Define the path to the env folder
env_folder="/environments/dev"

# Get the current checksum of the env folder
current_checksum=$(find "$env_folder" -type f -exec md5 {} + | sort | md5 | awk '{print $1}')

# Compare the current and previous checksums
if [ "$current_checksum" != "$(cat "$env_folder/.checksum" 2>/dev/null)" ]; then
    echo "Something has changed in the env folder."
    ENV=dev npm run prepare-extensions
    ENV=dev npm run pack-extensions
else
    echo "No changes detected in the env folder."
fi

echo "$current_checksum" > "$env_folder/.checksum"
