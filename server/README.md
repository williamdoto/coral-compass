# Server part of the coral reef project.

## Configurration
Copy [`config.example.json`](config.example.json) to a new file [`config.json`](config.json).
Edit settings such as connecting to the database as needed. This file will not be committed or pushed to the git repository.

In typescript files that need to access this config, include
```ts
import config from "../config.json";
```
near the top of the file. The `config` object will contain everything. Note that the typescript language server of vscode may need to be restarted if it does not recognise updates to the json file (`shift` + `ctrl` + `P` when open to a tab editing a typescript file, then search for "Typescript: Restart typescript server").