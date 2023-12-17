echo "extracting API surface"
yarn clean
# add new packages like this to create documentation: "@lp/{ui,types}"
lerna run ts --scope "@lp/types"
yarn lerna run api-report --scope "@lp/types"
echo "generating Markdown Docs"
GH_PAGES_CFG_EXISTS=$(test -f docs/_config.yml)
if [ $GH_PAGES_CFG_EXISTS ]
then
  echo "GitHub pages config file DETECTED"
  cp docs/_config.yml .
fi

yarn api-documenter markdown -i temp -o docs

if [ $GH_PAGES_CFG_EXISTS ]
then
  cp _config.yml docs/_config.yml
fi