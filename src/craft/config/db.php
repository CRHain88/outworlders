<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 *
 * To use:
 *     * copy and rename this file to `craft-db-config.php`
 *     * enter all relevant values
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *                                IMPORTANT!
 *       Do not check the renamed file into any version control system.
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

return array(
    '*' => array(
        'tablePrefix' => 'craft',
        'server' => '172.17.0.2',
        'database' => 'outwuopz_craft',
        'user' => 'root',
        'password' => 'root',
    ),
);
