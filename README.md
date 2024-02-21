# financial-support-tool

Welcome to the [Financial Support Tool](https://regiosuisse.ch/projekte/finanzhilfen) repository! 
Although our issue tracker is currently disabled, we're eager to hear from you. Please don't hesitate to contact [our team](https://regiosuisse.ch/regiosuisse-team) with any questions or feedback.

## Installation

```shell
docker compose up
docker exec -it financial-support-tool_node bash -c "npm install"
docker exec -it financial-support-tool_node bash -c "npm run start"
open http://localhost:3000
```