VERSION_FILE=constants/buildVersion.js
current_date=$(date +"%d %b %Y %H:%M")
current_version=$(git log --pretty=format:'%h' -n 1)
SED=sed
[[ -x $(which gsed 2>/dev/null) ]] && SED=gsed

if grep -q '^export const BUILD_DATE' "$VERSION_FILE"; then
  $SED -i '' "s/^export const BUILD_DATE.*/export const BUILD_DATE = \"$current_date\";/g" "$VERSION_FILE"
else
  echo "export const BUILD_DATE = \"$current_date\";" >>"$VERSION_FILE"
fi

if grep -q '^export const BUILD_VERSION' "$VERSION_FILE"; then
  $SED -i '' "s/^export const BUILD_VERSION.*/export const BUILD_VERSION = \"$current_version\";/g" "$VERSION_FILE"
else
  echo "export const BUILD_VERSION = \"$current_version\";" >>"$VERSION_FILE"
fi
