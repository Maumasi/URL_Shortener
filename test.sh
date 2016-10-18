#!/bin/bash
a="$(grep 'version' test3.txt)"

branch="$(git branch | grep \*)"
currentBranch=${branch: -6}
echo $currentBranch
currentVersion=${a: -7:5}

patch=${currentVersion: -1}
minor=${currentVersion: -3:1}
major=${currentVersion: -5:1}

echo $currentVersion

if [[ $patch -gt 8 ]] && [[ "$currentBranch" == "master" ]]; then
  newMinor=$((minor+1));
  newPatch=0;
else
  newMinor=$minor;
  newPatch=$((patch+1));
fi

newVersion=$major.$newMinor.$newPatch

sed -i -e 's/'"$currentVersion"'/'"$newVersion"'/g' ./test3.txt

echo $major.$newMinor.$newPatch
