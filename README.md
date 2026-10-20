# MazeMind 🧠

**An interactive reinforcement-learning lab that teaches a neural network to navigate a maze.**

MazeMind is a self-contained browser simulation. The agent starts without a route, explores the maze, collects rewards and penalties, and updates a Deep Q-Network (DQN) as it goes. Watch its movement, learning curve, action values, and neural activations live.

## Try it

Once GitHub Pages is enabled for this repository, open the published site. You can also run it locally by opening `index.html` in a modern browser. No build step, packages, server, or API keys are needed.

## Features

- **Actual DQN training:** an 8-feature state, two 16-neuron ReLU hidden layers, and four Q-value outputs.
- **Experience replay:** learns from randomly sampled transitions instead of only the latest move.
- **Target network:** a periodically refreshed network stabilizes temporal-difference targets.
- **Reward shaping:** goal reward, step and wall penalties, plus a small signal for progress toward the goal.
- **Live maze simulation:** watch the agent explore, revisit cells, hit dead ends, and find the goal.
- **Learning visualizations:** rolling success rate, episode reward, visited-cell heatmap, recent trail, network activations, and current action values.
- **Experiment controls:** training speed, maze size, exploration strategy, learning rate, discount factor, batch size, and random seed.
- **Portable experiments:** export and import the model weights, target network, replay buffer, and training history as JSON.
- **Responsive interface:** designed to work on desktop and mobile browsers.

## How it works

1. The agent observes its normalized position, relative goal direction, and whether each neighboring cell is blocked.
2. An epsilon-greedy policy sometimes chooses a random action to explore and otherwise selects the action with the highest predicted Q-value.
3. Each move produces a reward and a transition that is stored in replay memory.
4. Mini-batches train the neural network toward the Bellman target: immediate reward plus the discounted best future Q-value.
5. A separate target network is periodically synchronized with the learning network.

Training is stochastic and not guaranteed to improve monotonically. Try different seeds and settings to compare outcomes. This is an educational implementation, not a claim that a particular model has converged or will solve every maze.

## Technology and privacy

- Vanilla HTML, CSS, and JavaScript.
- Canvas and SVG visualizations.
- No external libraries, network calls, analytics, or uploaded training data.
- All training runs locally in the browser.

## GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`. In **Settings → Pages**, choose **GitHub Actions** as the build and deployment source. Then check the **Actions** tab for the deployment result.

Because this repository is private, whether Pages can be enabled depends on the repository owner's GitHub plan and settings. If Pages is unavailable, opening `index.html` locally still runs the project.

## Safety

MazeMind is a self-contained educational simulation. It does not interact with external systems or execute downloaded model files as code.
