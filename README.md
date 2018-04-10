Outworlders Website
================================================================================

This is the repo for the [Atlanta Outworlders website](http://outworlders.info).

<!-- toc -->

- [Installation](#installation)
- [CSS Style Guide](#css-style-guide)
- [Support](#support)
- [Contributing](#contributing)

<!-- tocstop -->

Installation
--------------------------------------------------------------------------------
Dependencies for this website are managed using NPM, please make sure to have
the latest copy of [NodeJS](http://nodejs.org) and [NPM](http://npmjs.com)
installed before following these installation instructions.

```sh
$ npm i
```


Migrate Databases
--------------------------------------------------------------------------------
Before doing any development, make sure to get the latest copy of the Database
from the production server. Advise Smart Vent that you'll be making some updates
and any edits they make should wait until after the code update is complete.

1. Create and download a backup of the source database from the Magento Admin
Panel.
2. Drop the destination database.
3. Re-create the destination database.
4. Run

  ```sh
  $ docker exec -i outworlders_db_1 \
    mysql -uroot -proot --database craft_outworlders \
    < $SQL_BACKUP_PATH
  ```

  Where:

  - `$CONTAINER_NAME` is the name of the container (such as `asp_db_1`)
  - `$DATABASE_NAME` is the name of the database (such as `magento_asp`); and
  - `$SQL_BACKUP_PATH` is the directory where the `.sql` back up file was
    downloaded.

CSS Style Guide
--------------------------------------------------------------------------------
This project uses a CSS style guide generator. Whenever working with components,
be sure to keep the style guide up to date.

To start the style guide, run:

```
$ npm run styleguide
```


Support
--------------------------------------------------------------------------------
Please [open an issue][support-request] for support.


Contributing
--------------------------------------------------------------------------------
Please contribute using [Github Flow](https://guides.github.com/introduction/flow/).
Create a branch, add commits, and [open a pull request][pull-request].





[pull-request]:https://github.com/CRHain88/outworlders/compare/
[support-request]:https://github.com/CRHain88/outworlders/issues/new
