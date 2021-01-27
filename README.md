# Discord Webhook Debugger
Simple debug tool for Discord's webhook API built with [Vite](https://github.com/vitejs/vite) and [React](https://reactjs.org/).  It supports a custom message, username and avatar. A live demo is available at [webhooks.tom.network](https://webhooks.tom.network)

![](https://i.imgur.com/wEwLbvt.png)

## 🔧 Installation
### Standalone
The app can very easily be self hosted with zero configuration - after building the source you can simply point your web server to `dist/index.html`
```bash
git clone https://github.com/tommitchelmore/discord-webhook-debugger.git
cd discord-webhook-debugger
yarn install
yarn build
```
### Docker
To install with docker, simply clone the repository, build the image and run exposing port 8080:
```bash
git clone https://github.com/tommitchelmore/discord-webhook-debugger.git
cd discord-webhook-debugger
sudo docker build . -t discord-webhook-debugger
sudo docker run -p 8080:8080 discord-webhook-debugger
```
To update the image, simply pull the latest main branch (or clone again) and run `docker build -t discord-webhooks .` - you can then recreate your container.
## ⚖️ Licensing
This software is licensed under the [GNU GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) license, please freely use, modify, contribute or reditribute as suits you however keep in mind that absolutely no warranty is provided.
