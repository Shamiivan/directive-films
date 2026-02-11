#!/bin/bash

# Script to update typography patterns across all CSS module files
# Updates common patterns to use new font families and letter-spacing

COMPONENTS_DIR="/home/shami/workspaces/directive-films/src/components"

echo "Updating typography patterns across all section CSS files..."

# Find all .module.css files
find "$COMPONENTS_DIR" -name "*.module.css" -type f | while read -r file; do
  echo "Processing: $file"

  # Backup original file
  cp "$file" "$file.bak"

  # Update common heading patterns (h1, h2, h3 styles)
  # Pattern: font-size: XXpx; font-weight: 700; (without font-family)
  sed -i 's/font-size: \([0-9]\+px\);\s*font-weight: 700;/font-family: var(--font-display);\n  font-size: \1;\n  font-weight: 700;\n  letter-spacing: -0.01em;/g' "$file"

  # Pattern: font-size: XXpx; font-weight: 800; (without font-family)
  sed -i 's/font-size: \([0-9]\+px\);\s*font-weight: 800;/font-family: var(--font-display);\n  font-size: \1;\n  font-weight: 800;\n  letter-spacing: -0.02em;/g' "$file"

  # Update body text patterns
  # Pattern: font-size: XXpx; without font-family and not already with letter-spacing
  sed -i 's/font-size: \(1[4-9]px\|[2-9][0-9]px\);$/font-family: var(--font-body);\n  font-size: \1;\n  letter-spacing: 0.01em;/g' "$file"

done

echo "Typography update complete! Backups saved as .bak files"
echo "Review changes and remove .bak files if satisfied"
