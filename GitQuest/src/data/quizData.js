export const BADGES = [
  { id: 'first_commit', name: 'First Commit', icon: '🌱', description: 'Complete Git Basics' },
  { id: 'branch_master', name: 'Branch Master', icon: '🌿', description: 'Complete Branching' },
  { id: 'merge_warrior', name: 'Merge Warrior', icon: '⚔️', description: 'Complete Merging without conflicts' },
  { id: 'code_reviewer', name: 'Code Reviewer', icon: '🔍', description: 'Complete Pull Requests module' },
  { id: 'open_source', name: 'Open Source Hero', icon: '🤝', description: 'Complete Contribution module' },
  { id: 'actions_agent', name: 'Actions Agent', icon: '⚡', description: 'Complete GitHub Actions module' },
  { id: 'git_god', name: 'Git God', icon: '🏆', description: 'Complete all modules' },
];

export const MODULES = [
  {
    id: 'git_basics',
    title: 'Git Basics',
    description: 'Learn the foundational commands of Git.',
    rewardXP: 100,
    badgeId: 'first_commit',
    dependencies: [],
    briefing: {
      text: "Welcome to GitQuest, recruit!\n\nHere's what you need to know:\n- Git is a time machine for your code.\n- GitHub is the cloud where you store it.\n- Key workflow: init -> add -> commit -> push.\n\nReady to test your knowledge?",
      visual: "┌─────────┐   add   ┌─────────┐  commit ┌─────────┐\n│ Working │ ──────> │ Staging │ ──────> │  Repo   │\n└─────────┘         └─────────┘         └─────────┘"
    },
    challenges: [
      {
        id: 'q1',
        type: 'multiple_choice',
        question: 'What is Git?',
        options: [
          'A cloud storage provider like Google Drive',
          'A distributed version control system',
          'A programming language',
          'A social media platform for developers'
        ],
        correctAnswer: 'A distributed version control system',
        hints: ['It helps you control versions of your code', 'It starts with "distributed"']
      },
      {
        id: 'q2',
        type: 'order',
        question: 'Arrange these commands in the correct workflow order:',
        options: ['git push', 'git commit', 'git add', 'git init'],
        correctAnswer: ['git init', 'git add', 'git commit', 'git push'],
        hints: ['You must initialize before tracking.', 'Always add before you commit.']
      }
    ]
  },
  {
    id: 'branching',
    title: 'Branching',
    description: 'Master parallel universes for your code.',
    rewardXP: 150,
    badgeId: 'branch_master',
    dependencies: ['git_basics'],
    briefing: {
      text: "A branch is like a parallel universe for your code.\n\n- It lets you work on new features without breaking the main code.\n- Keep main clean and stable.\n- Commands: git branch, git checkout, git switch.",
      visual: "  (main)  o───o───o\n               \\\n  (feat)        o───o"
    },
    challenges: [
      {
        id: 'q1',
        type: 'fill_in_blank',
        question: 'To switch to a branch named "feature", what command do you use?',
        template: 'git _____ feature',
        correctAnswer: 'checkout', // or switch, we can handle both, but let's stick to checkout for simplicity
        hints: ['It starts with "check..."']
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: 'Why do we use branches?',
        options: [
          'To make the code faster',
          'To work on features independently',
          'To save disk space',
          'To compress files before pushing'
        ],
        correctAnswer: 'To work on features independently',
        hints: ['Parallel universes help you stay independent.']
      }
    ]
  },
  {
    id: 'pull_requests',
    title: 'Pull Requests',
    description: 'Collaborate and review code with peers.',
    rewardXP: 200,
    badgeId: 'code_reviewer',
    dependencies: ['branching'],
    briefing: {
      text: "Pull Requests (PRs) let you tell others about changes you've pushed.\n\n- Review code before merging.\n- Discuss potential modifications.\n- The final checkpoint before main.\n\nCode review is the backbone of team collaboration.",
      visual: "[Your Branch] ---> (Review) ---> [Main Branch]"
    },
    challenges: [
      {
        id: 'q1',
        type: 'scenario',
        question: 'Your teammate pushed a new branch to GitHub and wants your opinion. What should they open?',
        options: [
          'A new repository',
          'An issue',
          'A Pull Request',
          'A Git stash'
        ],
        correctAnswer: 'A Pull Request',
        hints: ['They want to "request" you to "pull" their changes.']
      }
    ]
  }
];
