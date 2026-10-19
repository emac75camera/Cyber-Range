# Cyber-Range

A browser-based, fictional cyber range for learning network defense through safe, self-contained simulations.

## Current prototype

The initial lab is a single-page application in `index.html`. It uses plain HTML, CSS, and JavaScript, with no build step or third-party dependencies.

### Features
- Interactive network topology with selectable fictional hosts
- Scenario runner for baseline traffic, suspicious discovery, repeated login failures, and unusual outbound transfers
- In-memory simulated packet log and security-event log
- Defensive toggles for gateway firewall, intrusion detection, and login rate limiting
- Host inspection and a simulated hardening action
- Small training console with safe lab commands (`help`, `hosts`, `status`, `ping`, `inspect`, `scan`, and control toggles)
- Responsive layout for desktop and mobile
- Reset button to clear the current in-memory lab state

## Run locally

Open `index.html` in a modern browser. No server or package installation is required.

## Publish with GitHub Pages

If you want a public web demo, open the repository's **Settings → Pages** and choose **Deploy from a branch**, branch `main`, folder `/(root)`, then save. GitHub documents this process here: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

**Visibility warning:** a published GitHub Pages site is available on the internet, even when the source repository is private on plans that allow Pages for private repositories. Review repository contents and your plan's visibility options before enabling publishing.

## Safety boundary

This is a teaching prototype, not a real network scanner, terminal, firewall, or intrusion detection system. All hosts, addresses, traffic, and events are fictional and handled in the browser. Commands do not invoke operating-system processes, send packets, contact target hosts, or test real systems.

## Roadmap ideas

- Structured scenario objectives and scoring
- Guided lessons and hints
- Repeatable scenario tests and accessible event filtering
- Exportable lab reports
- More explicit defensive investigation workflows
