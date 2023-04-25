# CoralReefMonitor
FIT3162 Semester 1 2023

## Development team
| Author        | Student ID | Email                       |
|:--------------|:----------:|:----------------------------|
| Yufeng Zhu    |  30927382  | yzhu0091@student.monash.edu |
| Jotham Gates  |  31472397  | jgat0002@student.monash.edu |
| William Halim |  31537308  | whal0005@student.monash.edu |

## Installation
- Install nodejs, and mongodb (maybe angular cli as well?)
- `npm install`
- If installing on a linux webserver using systemd, copy or symlink the service files in the [`linux`](linux) folder to `/etc/systemd/system/`. Then run `sudo systemctl daemon-reload` followed by `sudo systemctl enable coral-reef-monitor` and `sudo systemctl start coral-reef-monitor`. These commands refresh the list of services, sets the website to start on boot and starts it now respectively.

### Configurration
See [here](./server/README.md) to set up the server config file.

## Running
### Development
```
npm run start
```
This will start both the client and server. `ng serve` will be used as a proxy server so that everything is on the same port.

Go to [localhost:4200](localhost:4200) using a web browser.

When a file is edited, the server will automatically be restarted and angular will be rebuilt.

### Production
Build the angular frontend and transpile the server typescript using:
```
npm run build-client
npm run build-server
```

Start the server using:
```
npm run production
```
