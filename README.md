# spa-template

Simple single page app template containing: webpack, babel, and jest. Starting point for future single page apps (Angular, Resct, Vue etc) apps.

I have written plugins to reduce time spent on configuring the app and social media. You simply need to edit `site-config.json` to change title, description, colors, etc, in index.html, 404.html, and manifest. You need to edit `logo-square.svg` to change all the images used in the app for social sharing and icons. 

## This app might not be upto date

I update this project everytime I use it, not everytime there is a new update to a supporting library. It will work out of the box, but it might be a bit behind.

## instructions

| code               | description                                                                |
| ------------------ | -------------------------------------------------------------------------- |
| `npm install`      | install dependencies                                                       |
| `nvm use`          | Use node version specified in projects .nvmrc file. (NVM needs installing) |
| `nvm run test`     | run jest tests                                                             |
| `nvm run serve`    | serve site in development mode                                             |
| `nvm run clean`    | clean project with prettier                                                |
| `nvm run validate` | validate code with typescript compiler                                     |
| `nvm run build`    | validate with prettier and TSC && build bundled site                       |

## General Instructions

### Update libraries

How to update libraries to the latest

```bash
npx npm-check-updates -u
npm install
```

### Update node

This project has been set up to use a specific version of node via `.nvmrc` file. Run this command to update to you local version.

```bash
nvm ls-remote --lts # see latest build
nvm install node # update to the latest build
node -v > .nvmrc # this project to the latest
```
