# Checklists

Here are a series of checklists I use at various stages in a project life cycle

- [Checklists](#checklists)
  - [New Project](#new-project)
  - [Kanban](#kanban)
    - [Refinement](#refinement)
    - [New/Edit User Story](#newedit-user-story)
      - [Temporary User Story](#temporary-user-story)
      - [Finalised User Story](#finalised-user-story)
    - [New/Edit Task](#newedit-task)
      - [Temporary Task](#temporary-task)
      - [Finalised Task](#finalised-task)
    - [Move a Card/Ticket](#move-a-cardticket)
      - [Backlog[*] -> Sprint[Backlog]](#backlog---sprintbacklog)
      - [Backlog[*] -> Sprint[Repeated]](#backlog---sprintrepeated)
      - [Sprint[Backlog/Repeated] -> Sprint[In Progress]](#sprintbacklogrepeated---sprintin-progress)
      - [Sprint[In Progress] -> Sprint[In QA]](#sprintin-progress---sprintin-qa)
      - [Sprint[In QA] -> Sprint[Failed QA]](#sprintin-qa---sprintfailed-qa)
      - [Sprint[Failed QA] -> Sprint[In Progress]](#sprintfailed-qa---sprintin-progress)
      - [Sprint[In QA] -> Sprint[Done]](#sprintin-qa---sprintdone)
      - [Sprint[Done] -> Sprint[Repeated]](#sprintdone---sprintrepeated)
      - [Sprint[*] -> Backlog Board](#sprint---backlog-board)
      - [Sprint[*] -> Sprint[Rejected]](#sprint---sprintrejected)
    - [Mark as Blocked](#mark-as-blocked)
    - [Unmark as Blocked](#unmark-as-blocked)
  - [Code](#code)
    - [New Branch](#new-branch)
    - [Commit](#commit)
    - [Pre Submit PR](#pre-submit-pr)
    - [Updating a PR](#updating-a-pr)
    - [Review PR](#review-pr)
    - [Pre Merge PR](#pre-merge-pr)
    - [Deploy](#deploy)

## New Project

- [ ] Ensure you have filled out the Project Canvas and know why you're building this
- [ ] Ensure push to master deploys to live
- [ ] Ensure cannot deploy to live without all CI tests passing
- [ ] Ensure you cannot merge and push into master with the CI tests passing
- [ ] Ensure you cannot merge and push into
- [ ] Ensure you have a way of scrolling all previous releases and rolling back with 1 click and password

## Kanban

### Refinement

- [ ] Look at the state of the Sprint Board and place anything back into the Backlog Board as necessary
- [ ] On the Backlog Board

### New/Edit User Story

#### Temporary User Story

This is a story you add quickly when you have the idea for something new, it's not going to be
worked on right away and will be added to the Backlog Board to get detail added later

- [ ] The title or description must have enough info to be expanded later into a Finalised User Story

#### Finalised User Story

### New/Edit Task

#### Temporary Task

This is a task you add quickly when you have the idea for something new, it's not going to be
worked on right away and will be added to the Backlog Board to get detail added later

- [ ] The title or description must have enough info to be expanded later into a Finalised Task

#### Finalised Task

- [ ] Ensure the task links to a Finalised User Story
- [ ] Ensure the ticket has BDD style scenarios to validate it is complete, even if those scenarios
      are manual to check
- [ ] Ensure the task has a rough estimate

### Move a Card/Ticket

What to ensure when moving a task depends on where it's from and where it's going, see below:

#### Backlog[*] -> Sprint[Backlog]

- [ ] Ensure the ticket meets the criteria for a Finalised Task
- [ ] Ensure the items in Sprint[Backlog] are in priority order
- [ ] Ensure the ticket has nobody assigned to it

#### Backlog[*] -> Sprint[Repeated]

#### Sprint[Backlog/Repeated] -> Sprint[In Progress]

- [ ] Double check the backlog was ordered correctly in priority order, then pick the top most card
      that applies to you
- [ ] Ensure the ticket meets the criteria for a Finalised Task
- [ ] Assign the ticket to yourself

#### Sprint[In Progress] -> Sprint[In QA]

#### Sprint[In QA] -> Sprint[Failed QA]

#### Sprint[Failed QA] -> Sprint[In Progress]

#### Sprint[In QA] -> Sprint[Done]

#### Sprint[Done] -> Sprint[Repeated]

#### Sprint[*] -> Backlog Board

#### Sprint[*] -> Sprint[Rejected]

### Mark as Blocked

### Unmark as Blocked

## Code

### New Branch

- [ ] Does the branch follow the branch naming conventions set out in the project spec <!-- TODO: Link needed to branching when we have it -->
- [ ] Does the branch have the id of the issue being worked on?
- [ ] Does the issue being worked on have enough detail to complete it
- [ ] Will this issue be completed in under 1 days worth of work. Otherwise split the issue

### Commit

- [ ] Do you have a commit template you should be using?
- [ ] Are you only commiting changes that are related to each other
- [ ] Ensure the commit title is in the imperative mood
- [ ] Ensure the commit title is less than 80 characters in length
- [ ] Include a relevant emoji as the first character if possible
  <!-- TODO: Include my commit best practices in it -->

### Pre Submit PR

- [ ] Run the test suite (Only running new and smoke e2e tests)
- [ ] Check all changes before submitting for review
- [ ] Does any documentation need updating, on any changed files or wider README files
- [ ] Ensure no code has been temporarily commented out
- [ ] Do all var, func, class and method names etc have good semantic meaning
- [ ] Do your tests make sense (If just reading the English as a non techy does what you're doing
      make sense)
- [ ] Ensure your PR has an good description of changes and links to any issues/tickets
- [ ] Ensure version update and is semantically correct
- [ ] Ensure changelog is updated
- [ ] Do any code styling discussions from this PR need to be documented in a README?

### Updating a PR

- [ ] Follow all from Pre Submit PR
- [ ] Ensure you have replied to all comments related to your new changes to the PR

### Review PR

- [ ] Check the Pre Submit PR Checklist
- [ ] Check the PR deployed assets and test against the new/edited scenarios or manually run the
      branch to check (if no deployed assets)

### Pre Merge PR

- [ ] Ensure has the required number of commits (automate if possible)
- [ ] Ensure the latest changes from the branch you're merging into are in your branch (automate if
      possible via no fast forward merges)
- [ ] Ensure CI tests have all passed (automate if possible)

### Deploy
