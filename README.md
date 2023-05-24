# CoralCompass
FIT3162 Semester 1 2023

## Development team
| Author        | Student ID | Email                       |
| :------------ | :--------: | :-------------------------- |
| Yufeng Zhu    |  30927382  | yzhu0091@student.monash.edu |
| Jotham Gates  |  31472397  | jgat0002@student.monash.edu |
| William Halim |  31537308  | whal0005@student.monash.edu |

See the user guides for more information.

## Installation
- Install nodejs, and mongodb (maybe angular cli as well?)
- `npm install`
- If installing on a linux webserver using systemd, run [`./linux/install_services.sh`](./linux/install_services.sh). This copies the service files in the [`linux`](linux) folder to `/etc/systemd/system/` and replaces the placeholders with relevent filepaths and users. The script also enables the services to start at boot.

### Configuration
See [here](./server/README.md) to set up the server config file.

## Running
### Development
```
npm run start
```
This will start both the client and server. `ng serve` will be used as a proxy server so that everything is on the same port.

Go to [http://localhost:4200](http://localhost:4200) using a web browser.

When a file is edited, the server will automatically be restarted and angular will be rebuilt.

#### Testing
For standard unit testing, use `npm run test`.
For unit testing that also tracks coverage, use `npm run test-coverage`.

### Production
Either run [`./linux/run.sh`](./linux/run.sh), or:
Build the angular frontend and transpile the server typescript using:
```
npm run build-client
npm run build-server
```

Start the server using:
```
npm run production
```

Go to [http://localhost:4000](http://localhost:4000) to access the page (note the different port from the development mode). Alternatively set up port forwarding to allow the use of port 80 as standard. This is accomplished using iptables on the web server.

## File structure
- The main file used by the server is [`server/server.ts`](server/server.ts).
- Requests to the server are mainly handled by files in the [`src/routers/`](src/routers/) directory.
- Files in [`src/models/`](src/models/) contain the Mongoose models used by the server and type definitions used by both the frontend and the server.
- Angular uses `index.html` in [`src/`](src/) as the base. The majority of files for each page and component are in the [`src/app`](src/app/) directory.

### File types
- Files ending in `*.ts` are typescript files that contain code the the server, frontend or both.
- Files ending in `.css` contain styles.
- Files ending in `.html` contain html.
- Files ending in `.spec.ts` contain unit tests.