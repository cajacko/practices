# Checklists

Here are a series of checklists I use at various stages in a project life cycle.

The main point of these checklists is to give you a standardised process of verifying everything
that can't or isn't yet automated. I'd recommend including checklists like these in your project,
either in README files or find some way of enforcing devs to check everything when performing one of
the actions e.g. You can't make a PR without checking a manual list of items you should have thought
of.

- [Checklists](#checklists)
  - [New Repo Setup](#new-repo-setup)
  - [README.md files](#readmemd-files)
  - [CONTRIBUTING.md files](#contributingmd-files)
  - [Creating a New Branch](#creating-a-new-branch)
  - [Code Review (making, updating and reviewing)](#code-review-making-updating-and-reviewing)
  - [Deploying/publishing](#deployingpublishing)

## New Repo Setup

A bunch of stuff to think about when setting up a new dev project

- [ ] Do you really need to build this
- [ ] Add a .editorconfig file
- [ ] Add a .gitignore file
- [ ] Add a .gitattributes file
- [ ] Add a README.md file
- [ ] Add a CHANGELOG.md file
- [ ] Add a CONTRIBUTING.md file
- [ ] Setup linting
- [ ] Setup type checking
- [ ] Setup unit tests
- [ ] Setup func/e2e tests
- [ ] Setup smoke and full suite tests
- [ ] Setup error logging
- [ ] Setup analytics
- [ ] Setup feature toggles
- [ ] Add a/b test setup
- [ ] .env setup
- [ ] Issue/feature/user story tracker
- [ ] Business dev setup (canvas etc)
- [ ] Add support for translations
- [ ] Setup date mocking
- [ ] Offline dev setup
- [ ] Container setup
- [ ] Continuous deployment setup
- [ ] Continuous integration setup
- [ ] Ensure there is only 1 command to start the dev environment
- [ ] Setup api documentation/visual component library
- [ ] Add a LICENSE file

## README.md files

When creating or editing a README file ensure it has the following:

- [ ] Title
- [ ] Build status flags
- [ ] One line description
- [ ] Add a fun image to describe the project
- [ ] More comprehensive description
- [ ] Table of contents (If big enough)
- [ ] Motivation
- [ ] Screenshots
- [ ] Tech stack
- [ ] Installation instructions for developers (Including any global dependencies your machine may need)
- [ ] API Reference/Visual component guide
- [ ] How to build a production ready version of the project
- [ ] How to run the test suites
- [ ] How to customise environmental variables for the project
- [ ] Link to CONTRIBUTING.md file
- [ ] Link to core contributors (credits)
- [ ] License

## CONTRIBUTING.md files

- [ ] Code of conduct
- [ ] Branch organisation
- [ ] Commit message conventions
- [ ] File/folder naming conventions
- [ ] Semantic versioning
- [ ] Bugs
- [ ] Contact
- [ ] Proposing change
- [ ] Making a Pull Request (including checklist of things to remember)
- [ ] Development workflow
- [ ] Style Guide (linting, prettier, dev principles etc)

## Creating a New Branch

- [ ] Does ths issue being worked on focus on the user or reference a user story?
- [ ] Does the issue being worked on have enough detail and acceptance criteria to complete it
- [ ] Is this issue big enough to be split across multiple branches? Try to keep branches small.
- [ ] Does the branch name follow the naming conventions for your repository? If no conventions, set them out.

## Code Review (making, updating and reviewing)

A lot of these items can and should be automated, but are here for completeness.

- [ ] Is the PR too big and need splitting up?
- [ ] Do the changes conform to your linting standards?
- [ ] Do the changes pass type checks and compiles?
- [ ] Do the unit tests pass?
- [ ] Are there sufficient integration tests and do they pass?
- [ ] Are there sufficient functional/end to end tests and do they pass? (Or do the smoke tests pass if you don't run all of them at code review?)
- [ ] Does the code coverage pass?
- [ ] Does the naming of every test make sense without the code there?
- [ ] Are the functional/end to end tests written in a clear and concise way so that a non dev can read them
- [ ] Do all the build tasks finish successfully
- [ ] Have you run the code and checked the changed functionality?
- [ ] Has the changelog been updated sufficiently
- [ ] Are all version changes there and semantically correct
- [ ] Is there sufficient documentation for all changes
- [ ] Are there any changes in practices, code styling, setup etc that need to be documented as a result of the work done here?
- [ ] Ensure there are no commented out pieces of code, unless they have a good reason for being there
- [ ] Does the code make sense without any of the comments
- [ ] Do all vars, funcs, classes etc have good semantic naming
- [ ] Do all files/folders follow the naming conventions set out in the project? If no conventions, set them out.
- [ ] Ensure your PR has an good description of changes and links to any issues/tickets/deployed assets etc
- [ ] Have all comments to this PR been replied to and resolved?
- [ ] Was this code based off any templating tools that may need updating with your new practices?
- [ ] Don't abstract on top of well established apis/patterns
- [ ] If there's no breaking changes, ensure previous api requests are tested against the new api
- [ ] Check any automated documentation generated from code

## Deploying/publishing

- [ ] Has the code been deployed and tested in a pre live environment first?
- [ ] Have all function/end to end tests been run for this new code?
- [ ] Has the changelog been updated with the new changes?
- [ ] Has the version been updated correctly for semantic versioning?
- [ ] Will you be able to quickly and reliably rollback to the previous version if this deploy does not work?
