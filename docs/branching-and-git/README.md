# Branching and Git

Strict git-flow branching and merging should be used. With specific automation and certain tests
running at specific points:

- feature or hotfix branches can only be merged through a pull request
- Only the automated release process can

## Automations

### On Pull Request into develop/master

Whenever a pull request is created or updated the following checks should be run and prevent
merging until they all pass:

- Run all e2e tests marked as "smoke" (If this is a hotfix then run all as it goes into master)
- Run all linting tests
- Run all unit tests
- Run all type checks
- Run the build and verify it successfully built
- Ensure the branch naming conforms to our practices
- Ensure the PR is going into develop if a feature or master and develop if a hotfix
- Ensure the code has a new version compared to develop
- Deploy a new temporary version of the code
  - Amend the PR with the url/details to access this temporary version

### On merge Pull Request into develop

- Ensure the deployed assets for this PR can now be located at the urls/details expected for the dev
  environment
- Deleting any redundant temporary deployed assets

### Once a day / x interval

- Run all the e2e tests on the develop branch, if there are new changes from the last time this was run
  - On success, automatically follow the git-flow release process with the following details:
    - Get the version from the latest version set in the code
    - In the release branch commit the following:
      - Amend the production CHANGELOG.md file with the combined changes from the CHANGELOG.dev.md
        since the last version on master
      - Ensure the latest version is written everywhere (although this should already be the case)
  - On failure, create a new issue detailing the tests that have failed and bump the priority of it
  - When this process is happening, prevent any PR's being merged into develop or master

### On commit to master

- Deploy to the live environment, ensuring assets still exist to rollback if necessary
