# Contributing

To contribute to this project, follow the general [Contributing Rules](https://github.com/kyma-project/community/blob/main/docs/contributing/02-contributing.md) documented in the `community` repository.cument in the `community` repository.

Additionally, when developing new extensions in Kyma Dashboard, adhere to the following rules.

1. Add new extensions to the `extensions/$API_GROUP` directory.

2. Configure extension in `environments/dev/extensions.json`. Do the same for `stage` and `prod` environments.

3. Add test for the extension in `tests` directory

4. Make sure to add smoke tests for your extension in `tests/tests/cluster/test-check-extensions.spec.js` or `tests/tests/namespace/test-check-extensions.spec.js` files.
